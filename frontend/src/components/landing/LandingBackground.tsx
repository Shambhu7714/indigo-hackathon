/** Full-viewport canvas: mesh, grid, soft blooms, micro-noise — reads as one surface. */
export function LandingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/60"
        style={{
          backgroundImage: `
            radial-gradient(1000px 520px at 90% 0%, rgba(56, 189, 248, 0.2) 0%, transparent 50%),
            radial-gradient(720px 440px at 5% 20%, rgba(12, 35, 64, 0.12) 0%, transparent 52%),
            radial-gradient(640px 400px at 45% 100%, rgba(14, 165, 233, 0.09) 0%, transparent 55%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute -left-40 top-[15%] h-[560px] w-[560px] rounded-full bg-[#0C2340]/[0.07] blur-3xl" />
      <div className="absolute -right-48 bottom-[5%] h-[480px] w-[480px] rounded-full bg-sky-400/12 blur-3xl" />
      {/* Film grain — ties the whole page together */}
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute bottom-0 left-1/2 h-[45vh] w-[min(100%,1400px)] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-sky-100/50 to-transparent blur-3xl" />
    </div>
  )
}
