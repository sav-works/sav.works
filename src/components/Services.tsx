'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    label: 'AI agents & automation',
    desc: 'Custom agent systems, content pipelines, and decision engines that work 24/7.',
    points: ['Custom GPT & agent pipelines', 'Automated content generation', 'Decision engines & routing'],
    color: '#7c3aed',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
    label: 'Digital operations',
    desc: 'Infrastructure, deployment, monitoring, and workflow orchestration — the backbone.',
    points: ['Cloud infrastructure & DevOps', 'Monitoring & observability', 'Workflow orchestration'],
    color: '#6366f1',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Content at scale',
    desc: 'Automated Instagram workflows, media pipelines, and brand systems that post while you build.',
    points: ['Instagram automation workflows', 'Media pipeline management', 'Brand system templates'],
    color: '#10b981',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    label: 'Strategy & consulting',
    desc: 'AI investment models, business logic, and tech stack decisions that actually move the needle.',
    points: ['AI investment strategy', 'Tech stack architecture', 'Process optimization'],
    color: '#f59e0b',
  },
]

function ServiceCard({ s, index }: { s: (typeof services)[0]; index: number }) {
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl p-7 bg-white border border-sav-200 hover:border-brand-200 hover:shadow-card-hover transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: s.color }}
      >
        {s.icon}
      </div>

      <h3 className="text-lg font-bold mb-2 tracking-tight text-sav-900">{s.label}</h3>
      <p className="text-sm text-sav-500 leading-relaxed mb-4">{s.desc}</p>

      {/* Bullet points */}
      <ul className="space-y-1.5">
        {s.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-xs text-sav-400">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Services() {
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
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
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
            What we do
          </h2>
          <p className="text-sav-400 max-w-xl mx-auto">
            Capability delivered — not PowerPoint decks, not vaporware.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.label} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
