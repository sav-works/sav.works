'use client'

import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    letter: 'O',
    title: 'Operations',
    desc: 'Streamlined systems and automated workflows that keep everything running — no friction, no overhead. From deployment pipelines to content scheduling, we build the machinery.',
    color: '#a78bfa',
    borderColor: 'rgba(167,139,250,0.15)',
  },
  {
    letter: 'E',
    title: 'Enterprises',
    desc: 'Scalable solutions for businesses that need real leverage. Solo operators to growing teams — same architecture, different scale. Infrastructure that grows with you.',
    color: '#6366f1',
    borderColor: 'rgba(99,102,241,0.15)',
  },
  {
    letter: 'A',
    title: 'AI',
    desc: 'Intelligent automation and agent-driven systems that turn hours into seconds. Custom agents, decision engines, and pipelines that do the work so you don\'t have to.',
    color: '#34d399',
    borderColor: 'rgba(52,211,153,0.15)',
  },
  {
    letter: 'L',
    title: 'Logic',
    desc: 'Clear thinking, sound architecture, and decisions rooted in what actually works. No hype, no fluff — just engineering discipline and practical results.',
    color: '#fbbf24',
    borderColor: 'rgba(251,191,36,0.15)',
  },
]

function PillarCard({
  p,
  index,
}: {
  p: (typeof pillars)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl p-8 border bg-sav-900/40 hover:bg-sav-900/70 transition-all duration-500 cursor-default`}
      style={{
        borderColor: visible ? p.borderColor : 'rgba(255,255,255,0.04)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Letter badge */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-extrabold mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{
          backgroundColor: `${p.color}12`,
          color: p.color,
          boxShadow: visible ? `0 0 20px ${p.color}15` : 'none',
        }}
      >
        {p.letter}
      </div>

      <h3 className="text-xl font-bold mb-3 tracking-tight text-sav-200">{p.title}</h3>
      <p className="text-sm text-sav-400 leading-relaxed">{p.desc}</p>

      {/* Hover corner glow */}
      <div
        className="absolute -top-px -right-px w-40 h-40 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${p.color}12, transparent 70%)`,
        }}
      />
    </div>
  )
}

export default function Vision() {
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

  return (
    <section id="vision" className="py-32 px-6 relative">
      {/* Section background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              Our operating system
            </span>
          </h2>
          <p className="text-sav-400 max-w-xl mx-auto">
            Four pillars that define how we build, what we prioritize, and why it works.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <PillarCard key={p.letter} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
