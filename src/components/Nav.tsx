export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6 border-b border-zinc-800">
      <a href="/" className="text-xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          sav
        </span>
        <span className="text-zinc-400 font-normal">.works</span>
      </a>
      <span className="text-xs text-violet-400 border border-violet-400/25 px-3 py-1.5 rounded-full bg-violet-400/10">
        Angels Company
      </span>
    </nav>
  )
}
