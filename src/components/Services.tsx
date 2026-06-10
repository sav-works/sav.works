const services = [
  {
    label: 'AI agents & automation',
    desc: 'Custom agent systems, content pipelines, and decision engines',
  },
  {
    label: 'Digital operations',
    desc: 'Infrastructure, deployment, monitoring, and workflow orchestration',
  },
  {
    label: 'Content at scale',
    desc: 'Automated Instagram, media pipelines, and brand systems that post while you build',
  },
  {
    label: 'Strategy & consulting',
    desc: 'AI investment models, business logic, and tech stack decisions',
  },
]

export default function Services() {
  return (
    <section className="py-20">
      <h2 className="text-2xl font-bold tracking-tight mb-2">What we do</h2>
      <p className="text-zinc-400 mb-12">Practical capability, delivered.</p>
      <div className="flex flex-col gap-3">
        {services.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
            <span className="text-sm text-zinc-400">
              <strong className="text-zinc-100 font-semibold">{s.label}</strong> — {s.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
