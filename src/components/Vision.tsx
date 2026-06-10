const pillars = [
  {
    letter: 'O',
    title: 'Operations',
    desc: 'Streamlined systems and automated workflows that keep everything running — no friction, no overhead. From deployment pipelines to content scheduling, we build the machinery.',
    color: '#a78bfa',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    letter: 'E',
    title: 'Enterprises',
    desc: 'Scalable solutions for businesses that need real leverage. Solo operators to growing teams — same architecture, different scale. Infrastructure that grows with you.',
    color: '#6366f1',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    letter: 'A',
    title: 'AI',
    desc: 'Intelligent automation and agent-driven systems that turn hours into seconds. Custom agents, decision engines, and pipelines that do the work so you don\'t have to.',
    color: '#34d399',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    letter: 'L',
    title: 'Logic',
    desc: 'Clear thinking, sound architecture, and decisions rooted in what actually works. No hype, no fluff — just engineering discipline and practical results.',
    color: '#fbbf24',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
]

export default function Vision() {
  return (
    <section id="vision" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              O-E-A-L
            </span>{' '}
            — our operating system
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Four pillars that define how we build, what we prioritize, and why it works.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.letter}
              className={`group relative rounded-2xl p-8 border ${p.border} ${p.bg} hover:brightness-110 transition-all`}
            >
              {/* Letter badge */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold mb-5"
                style={{
                  backgroundColor: `${p.color}15`,
                  color: p.color,
                }}
              >
                {p.letter}
              </div>

              <h3 className="text-xl font-bold mb-3 tracking-tight">{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>

              {/* Decorative corner gradient */}
              <div
                className="absolute -top-px -right-px w-32 h-32 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${p.color}15, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
