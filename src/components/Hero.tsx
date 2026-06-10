export default function Hero() {
  return (
    <section className="py-24 text-center">
      <div className="inline-block text-xs text-violet-400 border border-violet-400/20 px-4 py-1.5 rounded-full bg-violet-400/10 mb-8 tracking-widest uppercase">
        ✦ Now live
      </div>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-5">
        AI problem solving.
        <br />
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Handle more.
        </span>
      </h1>
      <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
        Automated content workflows, intelligent operations, and
        digital infrastructure — built to scale ambition.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a
          href="mailto:chahd@sav.works"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-violet-400 to-indigo-400 text-white hover:opacity-90 transition-all"
        >
          ✉️ Email me
        </a>
        <a
          href="#vision"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-zinc-900 text-zinc-100 border border-zinc-800 hover:border-violet-400/50 hover:text-violet-400 transition-all"
        >
          Our vision →
        </a>
      </div>
    </section>
  )
}
