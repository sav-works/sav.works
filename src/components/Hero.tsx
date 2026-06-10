export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-16">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-xs text-zinc-400 border border-zinc-800 px-4 py-1.5 rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Angels Company — now live
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6">
          Operations
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
            handle more.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          AI-powered systems, automated content pipelines, and digital infrastructure
          — built so you can scale without the overhead.
        </p>

        {/* CTA */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-violet-500/20"
          >
            Start the conversation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#vision"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-zinc-900 text-zinc-100 border border-zinc-800 hover:border-violet-500/50 hover:text-violet-400 transition-all"
          >
            Our vision
          </a>
        </div>

        {/* O-E-A-L letters */}
        <div className="mt-20 flex justify-center gap-6 sm:gap-10">
          {['O', 'E', 'A', 'L'].map((letter, i) => (
            <div
              key={letter}
              className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-2xl sm:text-3xl font-bold tracking-tight"
              style={{
                color: ['#a78bfa', '#6366f1', '#34d399', '#fbbf24'][i],
                borderColor: ['#a78bfa/20', '#6366f1/20', '#34d399/20', '#fbbf24/20'][i],
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
