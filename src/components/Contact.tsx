'use client'

import { useState, FormEvent } from 'react'
import { usePostHog } from 'posthog-js/react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // hidden — bots fill this, humans don't
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const posthog = usePostHog()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _hp: honeypot, // bots fill this
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        posthog?.capture('contact_form_submitted', { name, email })
        // Keep the submitted email for the success message
        const submittedEmail = email
        setName('')
        setEmail('')
        setMessage('')
        // Overwrite email state with the submitted value for success display
        setEmail(submittedEmail)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Let&apos;s build something.
          </h2>
          <p className="text-zinc-400">
            One conversation can change the direction of everything. Drop us a message
            and we&apos;ll get back to you.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {status === 'success' ? (
            <div className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Message sent</h3>
              <p className="text-sm text-zinc-400 mb-6">
                Thanks for reaching out. We&apos;ll be in touch at{' '}
                <span className="text-zinc-100">{email}</span>.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — invisible to humans, bots fill it */}
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ height: 0, overflow: 'hidden' }}>
                <label htmlFor="_hp">Leave this empty</label>
                <input
                  id="_hp"
                  name="_hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all disabled:opacity-50"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all disabled:opacity-50"
                />
              </div>
              <textarea
                placeholder="Tell us about your project, idea, or question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'sending'}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'sending' || !name.trim() || !email.trim() || !message.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/10"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-sm text-rose-400 text-center">
                  Something went wrong. Try again or email us directly at{' '}
                  <a href="mailto:chahd@sav.works" className="underline hover:text-rose-300">
                    chahd@sav.works
                  </a>
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
