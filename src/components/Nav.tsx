'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-sav-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-extrabold tracking-tight text-gradient-brand">
            sav
          </span>
          <span className="text-sm text-sav-400 font-normal">.works</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className="px-4 py-2 text-sm font-medium text-sav-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
          <div className="w-3" />
          <a
            href="#contact"
            onClick={handleNavClick}
            className="text-sm font-semibold px-5 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 hover:shadow-glow transition-all duration-200"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 bg-sav-700 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-sav-700 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-sav-700 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`sm:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 space-y-1 bg-white/95 backdrop-blur-xl border-b border-sav-200 shadow-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-sav-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="block w-full text-center text-sm font-semibold px-5 py-3 rounded-full bg-brand-600 text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
