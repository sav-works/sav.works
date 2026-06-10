'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const posthog = usePostHog()

  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), message: message.trim(), _hp: honeypot,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmittedEmail(email)
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
        posthog?.capture('contact_form_submitted', {
          email_domain: email.trim().split('@')[1] ?? 'unknown',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-sav-900">
            Let&apos;s build something.
          </h2>
          <p className="text-sav-400 max-w-xl mx-auto">
            A conversation can change everything. Drop us a message and we&apos;ll get back to you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-sav-200 rounded-2xl p-8 sm:p-10 shadow-card">
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="text-center py-8" style={{ animation: 'fade-up 0.5s ease-out forwards' }}>
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sav-900">Message sent</h3>
                <p className="text-sm text-sav-400 mb-6">
                  Thanks for reaching out. We&apos;ll be in touch at{' '}
                  <span className="text-sav-900 font-medium">{submittedEmail}</span>.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ height: 0, overflow: 'hidden' }}>
                  <label htmlFor="_hp">Leave this empty</label>
                  <input id="_hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Your name" value={name}
                    onChange={(e) => setName(e.target.value)} required disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl bg-sav-50 border border-sav-200 text-sav-900 placeholder-sav-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all disabled:opacity-50"
                  />
                  <input
                    type="email" placeholder="Your email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl bg-sav-50 border border-sav-200 text-sav-900 placeholder-sav-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all disabled:opacity-50"
                  />
                </div>
                <textarea
                  placeholder="Tell us about your project, idea, or question..." value={message}
                  onChange={(e) => setMessage(e.target.value)} required disabled={status === 'sending'}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-sav-50 border border-sav-200 text-sav-900 placeholder-sav-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all resize-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'sending' || !name.trim() || !email.trim() || !message.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-brand-600 text-white hover:bg-brand-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
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

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 text-xs text-sav-400">
                  <span>Reply within 24h</span>
                  <span className="hidden sm:inline">·</span>
                  <a href="mailto:chahd@sav.works" className="hover:text-sav-600 transition-colors">chahd@sav.works</a>
                </div>

                {status === 'error' && (
                  <p role="alert" className="text-sm text-rose-500 text-center">
                    Something went wrong. Try again or email{' '}
                    <a href="mailto:chahd@sav.works" className="underline hover:text-rose-600">chahd@sav.works</a>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
