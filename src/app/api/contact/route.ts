import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendContactNotification } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const supabase = await createServerSupabaseClient()

    const { error: dbError } = await supabase
      .from('contacts')
      .insert({ name, email, message } as any)

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // Send email notification via Resend
    await sendContactNotification({ name, email, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
