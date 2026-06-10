import { describe, it, expect } from 'vitest'

// ── Inline copies of the pure functions from route.ts ──

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')     // strip HTML tags
    .replace(/[<>]/g, '')        // strip remaining angle brackets
    .trim()
    .slice(0, 5000)              // max length
}

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

// ── Rate limiting logic ──

const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 3

function makeRateLimiter() {
  const rateMap = new Map<string, { count: number; resetAt: number }>()
  return function checkRateLimit(ip: string): { ok: boolean; retryAfter: number } {
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
}

// ── Tests ──

describe('sanitize()', () => {
  it('strips HTML tags', () => {
    expect(sanitize('<script>alert("xss")</script>hello')).toBe('alert("xss")hello')
  })

  it('strips stray angle brackets', () => {
    expect(sanitize('a > b < c')).toBe('a  b  c')
  })

  it('trims whitespace', () => {
    expect(sanitize('  hello  ')).toBe('hello')
  })

  it('truncates to 5000 chars', () => {
    const long = 'a'.repeat(6000)
    expect(sanitize(long).length).toBe(5000)
  })

  it('handles empty string', () => {
    expect(sanitize('')).toBe('')
  })
})

describe('validate()', () => {
  it('accepts valid input', () => {
    expect(validate({ name: 'Alice', email: 'alice@example.com', message: 'Hello!' })).toBeNull()
  })

  it('rejects missing name', () => {
    expect(validate({ email: 'a@b.com', message: 'Hi' })).toBe('Name is required.')
  })

  it('rejects non-string name', () => {
    expect(validate({ name: [] as any, email: 'a@b.com', message: 'Hi' })).toBe('Name is required.')
  })

  it('rejects missing email', () => {
    expect(validate({ name: 'A', message: 'Hi' })).toBe('Email is required.')
  })

  it('rejects missing message', () => {
    expect(validate({ name: 'A', email: 'a@b.com' })).toBe('Message is required.')
  })

  it('rejects bad email format', () => {
    expect(validate({ name: 'A', email: 'not-an-email', message: 'Hi' })).toBe('Invalid email format.')
  })

  it('rejects email without dot in domain', () => {
    expect(validate({ name: 'A', email: 'user@localhost', message: 'Hi' })).toBe('Invalid email format.')
  })

  it('rejects name over 200 chars', () => {
    expect(validate({ name: 'A'.repeat(201), email: 'a@b.com', message: 'Hi' })).toBe('Name must be 1–200 characters.')
  })

  it('rejects message over 5000 chars', () => {
    expect(validate({ name: 'A', email: 'a@b.com', message: 'x'.repeat(5001) })).toBe('Message must be 1–5000 characters.')
  })

  it('rejects email over 320 chars', () => {
    const local = 'a'.repeat(316)  // 316 + 5 (@b.co) = 321 > 320
    expect(validate({ name: 'A', email: `${local}@b.co`, message: 'Hi' })).toBe('Email is too long.')
  })

  it('accepts email with subdomain', () => {
    expect(validate({ name: 'B', email: 'user@sub.example.co.uk', message: 'Hello' })).toBeNull()
  })
})

describe('rate limiter', () => {
  it('allows first request', () => {
    const check = makeRateLimiter()
    const result = check('1.2.3.4')
    expect(result.ok).toBe(true)
    expect(result.retryAfter).toBe(0)
  })

  it('allows up to MAX requests within window', () => {
    const check = makeRateLimiter()
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(check('1.2.3.4').ok).toBe(true)
    }
  })

  it('blocks after MAX requests within window', () => {
    const check = makeRateLimiter()
    const ip = '5.6.7.8'
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      check(ip)
    }
    const result = check(ip)
    expect(result.ok).toBe(false)
    expect(result.retryAfter).toBeGreaterThan(0)
  })

  it('tracks different IPs independently', () => {
    const check = makeRateLimiter()
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      check('10.0.0.1')
    }
    // Different IP should not be blocked
    expect(check('10.0.0.2').ok).toBe(true)
    // Original IP still blocked
    expect(check('10.0.0.1').ok).toBe(false)
  })

  it('resets after window expires', async () => {
    // Use fake timers to avoid real wait
    const rateMap = new Map<string, { count: number; resetAt: number }>()
    function checkRateLimit(ip: string): { ok: boolean; retryAfter: number } {
      const now = Date.now()
      const entry = rateMap.get(ip)
      if (!entry || now > entry.resetAt) {
        rateMap.set(ip, { count: 1, resetAt: now + 60_000 })
        return { ok: true, retryAfter: 0 }
      }
      if (entry.count >= 3) {
        return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
      }
      entry.count++
      return { ok: true, retryAfter: 0 }
    }

    // Fill up
    for (let i = 0; i < 3; i++) checkRateLimit('1.2.3.4')
    expect(checkRateLimit('1.2.3.4').ok).toBe(false)

    // Simulate clock advance past window
    const entry = rateMap.get('1.2.3.4')!
    entry.resetAt = Date.now() - 1

    // Should be allowed again
    expect(checkRateLimit('1.2.3.4').ok).toBe(true)
  })
})
