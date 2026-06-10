export default function Footer() {
  return (
    <footer className="border-t border-sav-200 bg-sav-50/50 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-gradient-brand">
            sav
          </span>
          <span className="text-sav-300 font-normal">.works</span>
        </div>

        <div className="flex items-center gap-6">
          {['Services', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-sm text-sav-400 hover:text-brand-600 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-sm text-sav-400">
          Angels Company &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
