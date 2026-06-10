'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
      {/* Animated ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.06) 30%, transparent 60%)',
            animation: mounted ? 'glow-rotate 12s ease-in-out infinite' : 'none',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(52,211,153,0.08) 0%, rgba(251,191,36,0.04) 40%, transparent 60%)',
            animation: mounted ? 'glow-rotate 16s ease-in-out infinite reverse' : 'none',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs text-sav-400 border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 rounded-full mb-10"
          style={{
            animation: mounted ? 'fade-up 0.5s ease-out forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-a-emerald animate-pulse-soft" />
          Angels Company — now live
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.92] mb-6"
          style={{
            animation: mounted ? 'fade-up 0.6s ease-out 0.1s forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          Build systems that
          <br />
          <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-brand-400 bg-clip-text text-transparent">
            handle more.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-sav-400 max-w-2xl mx-auto mb-14 leading-relaxed"
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
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-brand-500/15"
          >
            <span className="relative z-10">Start the conversation</span>
            <svg
              className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-brand-500/40 to-brand-400/20 blur-xl" />
          </a>
          <a
            href="#vision"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-sav-900 text-sav-200 border border-white/[0.08] hover:border-brand-500/30 hover:text-brand-400 hover:bg-sav-800/80 transition-all duration-200"
          >
            Our vision
          </a>
        </div>
      </div>
    </section>
  )
}
