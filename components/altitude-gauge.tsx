'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function AltitudeGauge() {
  const { scrollYProgress } = useScroll()
  const top = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])
  return (
    <div aria-hidden="true" className="pointer-events-none fixed right-4 top-1/2 z-30 hidden h-64 -translate-y-1/2 flex-col items-center gap-2 xl:flex">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate [writing-mode:vertical-rl]">Cloud line</span>
      <div className="relative w-px flex-1 bg-moss/20">
        {[0, 25, 50, 75, 100].map((t) => (
          <span key={t} className="absolute -left-1 h-px w-2.5 bg-moss/30" style={{ top: `${t}%` }} />
        ))}
        <motion.span style={{ top }} className="absolute -left-[5px] -mt-[5px] size-[11px] rounded-full bg-lantern shadow-[0_0_12px_rgba(232,163,61,0.8)]" />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate [writing-mode:vertical-rl]">Valley</span>
    </div>
  )
}
