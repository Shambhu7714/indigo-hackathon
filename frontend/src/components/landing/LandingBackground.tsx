import { useEffect, useState } from 'react'

/** 
 * IndiGo 6E Dynamic Background
 * - Navy to Midnight gradient
 * - Animated mesh "clouds"
 * - Glowing orbs in brand orange
 * - Moving plane silhouettes
 */
export function LandingBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020e4a]" aria-hidden>
      {/* Primary Gradient Mesh */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, #041C94 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #0629c2 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #020e4a 0%, transparent 100%)
          `,
        }}
      />

      {/* Brand Orange Glows (Orbs) */}
      <div className="absolute -left-20 top-1/4 h-[500px] w-[500px] animate-float-slow rounded-full bg-[#FF6B00]/[0.08] blur-[120px]" />
      <div className="absolute -right-20 bottom-1/4 h-[600px] w-[600px] animate-float rounded-full bg-sky-500/[0.06] blur-[120px] delay-500" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        }}
      />

      {/* Moving Plane Silhouette (Micro-animation) */}
      <div className="absolute top-[15%] left-0 w-full opacity-[0.1]">
        <div className="animate-plane flex items-center gap-1">
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent to-white" />
          <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-90 fill-white">
            <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z" />
          </svg>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 h-[40vh] w-full bg-gradient-to-t from-[#041C94]/20 to-transparent blur-3xl" />
      
      {/* Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
