export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              sav
            </span>
            <span className="text-zinc-500 font-normal">.works</span>
          </span>
          <span className="text-zinc-700">/</span>
          <span className="text-sm text-zinc-500 font-mono">O-E-A-L</span>
        </div>

        <div className="flex items-center gap-6">
          {['Vision', 'Services', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-sm text-zinc-600">
          Angels Company &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
