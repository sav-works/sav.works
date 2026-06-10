const pillars = [
  {
    icon: '⚙️',
    title: 'Operations',
    desc: 'Streamlined systems and automated workflows that keep everything running — no friction, no overhead.',
  },
  {
    icon: '🏢',
    title: 'Enterprises',
    desc: 'Scalable solutions for businesses that need real leverage — from solo operators to growing teams.',
  },
  {
    icon: '🤖',
    title: 'AI',
    desc: 'Intelligent automation and agent-driven systems that turn hours into seconds. Smarter, not harder.',
  },
  {
    icon: '🧠',
    title: 'Logic',
    desc: 'Clear thinking, sound architecture, and decisions rooted in what actually works — no fluff.',
  },
]

export default function Vision() {
  return (
    <section id="vision" className="py-20">
      <h2 className="text-2xl font-bold tracking-tight mb-2">Our vision</h2>
      <p className="text-zinc-400 mb-12">Four pillars that drive everything we build.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-7 hover:border-violet-400/30 transition-colors"
          >
            <span className="text-3xl block mb-4">{p.icon}</span>
            <h3 className="text-lg font-bold mb-2 tracking-tight">{p.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
