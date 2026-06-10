const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    label: 'AI agents & automation',
    desc: 'Custom agent systems, content pipelines, and decision engines that work 24/7.',
    gradient: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
    label: 'Digital operations',
    desc: 'Infrastructure, deployment, monitoring, and workflow orchestration — the backbone.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Content at scale',
    desc: 'Automated Instagram workflows, media pipelines, and brand systems that post while you build.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    label: 'Strategy & consulting',
    desc: 'AI investment models, business logic, and tech stack decisions that actually move the needle.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-zinc-925/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">What we do</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Capability delivered — not PowerPoint decks, not vaporware.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.label}
              className="group relative rounded-2xl p-6 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${s.gradient} mb-4 text-zinc-100`}>
                {s.icon}
              </div>

              <h3 className="text-lg font-bold mb-2 tracking-tight">{s.label}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
