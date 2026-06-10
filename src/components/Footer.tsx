export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              sav
            </span>
            <span className="text-sav-500 font-normal">.works</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {['Vision', 'Services', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-sm text-sav-500 hover:text-sav-300 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-sm text-sav-600">
          Angels Company &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
