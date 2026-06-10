'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'Vision', href: '#vision' },
  { label: 'What we do', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Detect active section
      const sections = ['vision', 'services', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 300) {
          setActiveSection(`#${id}`)
          return
        }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on link click
  const handleNavClick = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sav-950/70 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_1px_12px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 group">
          <span className="text-xl font-extrabold tracking-tight text-gradient-brand">
            sav
          </span>
          <span className="text-sm text-sav-500 font-normal">.works</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === l.href
                  ? 'text-sav-100 bg-white/[0.06]'
                  : 'text-sav-400 hover:text-sav-200 hover:bg-white/[0.04]'
              }`}
            >
              {l.label}
            </a>
          ))}
          <div className="w-3" />
          <a
            href="#contact"
            onClick={handleNavClick}
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:opacity-90 hover:scale-[1.02] hover:shadow-glow-sm transition-all duration-200"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-5 h-px bg-sav-300 transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-sav-300 transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-sav-300 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 space-y-1 bg-sav-950/95 backdrop-blur-xl border-b border-white/[0.04]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeSection === l.href
                  ? 'text-sav-100 bg-white/[0.06]'
                  : 'text-sav-400 hover:text-sav-200 hover:bg-white/[0.04]'
              }`}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="block w-full text-center text-sm font-semibold px-5 py-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
