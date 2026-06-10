'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'Vision', href: '#vision' },
  { label: 'What we do', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            sav
          </span>
          <span className="text-zinc-500 font-normal">.works</span>
        </a>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile menu button */}
        <a
          href="#contact"
          className="sm:hidden text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
