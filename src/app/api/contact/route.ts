import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-server'
import { sendContactNotification } from '@/lib/email'
import * as Sentry from '@sentry/nextjs'

// ── Rate limiting ──────────────────────────────────────────────
const RATE_LIMIT_WINDOW = 60_000        // 1 minute
const RATE_LIMIT_MAX = 3                // 3 requests per window per IP

const rateMap = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return '127.0.0.1'
}

function checkRateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { ok: true, retryAfter: 0 }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { ok: true, retryAfter: 0 }
}

// ── Origin check ───────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://sav.works',
  'https://www.sav.works',
  /^https:\/\/sav-works\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
]

function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return false

  return ALLOWED_ORIGINS.some((allowed) =>
    typeof allowed === 'string' ? origin === allowed : allowed.test(origin),
  )
}

// ── Input validation ───────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')     // strip HTML tags
    .replace(/[<>]/g, '')        // strip remaining angle brackets
    .trim()
    .slice(0, 5000)              // max length
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface ContactBody {
  name?: string
  email?: string
  message?: string
}

function validate(body: ContactBody): string | null {
  if (!body.name || typeof body.name !== 'string') return 'Name is required.'
  if (!body.email || typeof body.email !== 'string') return 'Email is required.'
  if (!body.message || typeof body.message !== 'string') return 'Message is required.'

  if (body.name.length < 1 || body.name.length > 200) return 'Name must be 1–200 characters.'
  if (body.message.length < 1 || body.message.length > 5000) return 'Message must be 1–5000 characters.'

  if (!EMAIL_RE.test(body.email)) return 'Invalid email format.'
  if (body.email.length > 320) return 'Email is too long.'

  return null
}

// ── Handler ────────────────────────────────────────────────────
export async function POST(req: Request) {
  // 1. Origin check
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 2. Rate limit
  const ip = getClientIp(req)
  const { ok, retryAfter } = checkRateLimit(ip)
  if (!ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body: ContactBody = await req.json()
    const { name, email, message } = body

    // Honeypot check — if filled, silently accept (bots think they won)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((body as any)._hp) {
      return NextResponse.json({ success: true })
    }

    // 3. Validate + sanitize
    const validationError = validate(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const clean = {
      name: sanitize(name!),
      email: sanitize(email!),
      message: sanitize(message!),
    }

    // 4. Save to Supabase (service role bypasses RLS)
    const supabase = createServiceRoleClient()
    const { error: dbError } = await supabase
      .from('contacts')
      .insert({ name: clean.name, email: clean.email, message: clean.message })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      Sentry.captureException(dbError, {
        tags: { source: 'contact-form', operation: 'supabase-insert' },
      })
      // Still send email even if DB fails (degraded mode)
    }

    // 5. Send email notification
    try {
      await sendContactNotification({
        name: clean.name,
        email: clean.email,
        message: clean.message,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      Sentry.captureException(emailError, {
        tags: { source: 'contact-form', operation: 'email-notification' },
      })
      // Don't fail the request — user gets success but we get notified
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    Sentry.captureException(error, {
      tags: { source: 'contact-form', operation: 'api-route' },
    })
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
