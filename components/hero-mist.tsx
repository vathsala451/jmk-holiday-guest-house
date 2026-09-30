'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Hand, MessageCircle, Phone } from 'lucide-react'
import { site, whatsappUrl } from '@/data/site'
import { LanternTag } from './lantern-tag'
import { MoodToggle } from './mood-toggle'

const IDLE_MS = 3000

export function HeroMist() {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [cleared, setCleared] = useState(false)
  const reduced = useReducedMotion()

  const scheduleFade = useCallback(() => {
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setCleared(true), IDLE_MS)
  }, [])

  useEffect(() => {
    if (reduced) {
      setCleared(true)
      return
    }
    const canvas = canvasRef.current
    const frame = frameRef.current
    if (!canvas || !frame) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const { width, height } = frame.getBoundingClientRect()
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    ctx.fillStyle = 'rgba(236,241,238,0.94)'
    ctx.fillRect(0, 0, width, height)
    for (let i = 0; i < 18; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const r = 60 + Math.random() * 120
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(255,255,255,0.7)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }
    scheduleFade()
    return () => clearTimeout(idleTimer.current)
  }, [reduced, scheduleFade])

  const wipe = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || cleared) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const r = rect.width < 500 ? 40 : 55
    ctx.globalCompositeOperation = 'destination-out'
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(0,0,0,1)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
    scheduleFade()
  }

  return (
    <section id="top" aria-labelledby="hero-title" className="relative z-10 overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate">Mawsmai, Sohra · Meghalaya</p>
          <h1 id="hero-title" className="text-balance font-serif text-5xl font-medium leading-[1.02] text-moss sm:text-6xl lg:text-7xl">
            Wake up <em className="font-normal">above</em> the clouds
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            A family-run guest house near Eco Park in Sohra, with warm rooms, hot water and a kitchen for groups.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex items-center gap-2 rounded-full bg-lantern px-6 py-3 font-medium text-moss shadow-[0_8px_30px_-8px_rgba(232,163,61,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-moss/25 bg-card px-6 py-3 font-medium text-moss transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
          <MoodToggle className="pt-2" />
        </div>

        <div className="relative">
          <div ref={frameRef} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-moss/20">
            <Image
              src="/images/hero-sohra.png"
              alt="Green Khasi hills and waterfalls in Sohra at sunrise, with mist drifting through the valley"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            {!reduced && (
              <motion.canvas
                ref={canvasRef}
                aria-hidden="true"
                onPointerMove={wipe}
                onPointerDown={wipe}
                animate={{ opacity: cleared ? 0 : 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="absolute inset-0 h-full w-full touch-none"
                style={{ pointerEvents: cleared ? 'none' : 'auto' }}
              />
            )}
            {!cleared && (
              <p className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 text-sm font-medium text-moss">
                <Hand className="size-4" aria-hidden="true" />
                Swipe to clear the mist
              </p>
            )}
          </div>
          {site.rating && <LanternTag value={site.rating.value} count={site.rating.count} />}
        </div>
      </div>
    </section>
  )
}
