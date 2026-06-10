'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Light ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-brand-100/60 via-brand-50/40 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-brand-200/30 via-brand-50/20 to-transparent blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs text-sav-500 bg-white/80 border border-sav-200 px-4 py-1.5 rounded-full mb-8 shadow-sm"
          style={{
            animation: mounted ? 'fade-up 0.5s ease-out forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft" />
          Angels Company
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-sav-950"
          style={{
            animation: mounted ? 'fade-up 0.6s ease-out 0.1s forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          Build systems that
          <br />
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
            handle more.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg text-sav-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            animation: mounted ? 'fade-up 0.6s ease-out 0.2s forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          AI-powered operations, content automation, and digital infrastructure
          — built so you can scale without the overhead.
        </p>

        {/* CTAs */}
        <div
          className="flex gap-4 justify-center flex-wrap"
          style={{
            animation: mounted ? 'fade-up 0.6s ease-out 0.3s forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-200"
          >
            Start the conversation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-sav-600 bg-white border border-sav-200 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 shadow-sm"
          >
            Our services
          </a>
        </div>
      </div>
    </section>
  )
}
