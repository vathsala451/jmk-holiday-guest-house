'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export function HillDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const back = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-12, 12])
  const mid = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-6, 6])

  return (
    <div ref={ref} aria-hidden="true" className={cn('relative z-10 h-20 w-full overflow-hidden sm:h-28', flip && 'rotate-180', className)}>
      <motion.svg style={{ y: back }} viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
        <path d="M0 80 C 180 30 320 60 480 45 C 660 28 800 70 980 50 C 1160 30 1300 55 1440 40 L1440 120 L0 120 Z" fill="#5b7083" fillOpacity="0.18" />
      </motion.svg>
      <motion.svg style={{ y: mid }} viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
        <path d="M0 95 C 220 60 360 90 560 70 C 760 50 900 95 1100 78 C 1260 64 1360 80 1440 72 L1440 120 L0 120 Z" fill="#1f3d2f" fillOpacity="0.28" />
      </motion.svg>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
        <path d="M0 110 C 240 88 420 112 640 98 C 860 84 1020 112 1240 100 C 1340 94 1400 100 1440 98 L1440 120 L0 120 Z" fill="#1f3d2f" />
      </svg>
    </div>
  )
}
