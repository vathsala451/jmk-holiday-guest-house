'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useMood } from '@/hooks/use-mood'

type Particle = { x: number; y: number; r: number; vx: number; vy: number; a: number }

export function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { mood } = useMood()
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const small = w < 640
    const count = mood === 'rainy' ? (small ? 40 : 70) : mood === 'sunny' ? 6 : small ? 8 : 14
    const particles: Particle[] = Array.from({ length: count }, () => {
      if (mood === 'rainy') {
        return { x: Math.random() * w, y: Math.random() * h, r: 10 + Math.random() * 14, vx: -0.6, vy: 6 + Math.random() * 4, a: 0.12 + Math.random() * 0.15 }
      }
      if (mood === 'sunny') {
        return { x: Math.random() * w, y: 0, r: 60 + Math.random() * 120, vx: 0.05, vy: 0, a: 0.035 + Math.random() * 0.04 }
      }
      return { x: Math.random() * w, y: Math.random() * h, r: 80 + Math.random() * 140, vx: 0.15 + Math.random() * 0.25, vy: (Math.random() - 0.5) * 0.08, a: 0.1 + Math.random() * 0.12 }
    })

    let raf = 0
    let running = true
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (mood === 'rainy') {
          if (p.y > h) { p.y = -20; p.x = Math.random() * w }
          ctx.strokeStyle = `rgba(91,112,131,${p.a})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + p.vx * 3, p.y + p.r)
          ctx.stroke()
        } else if (mood === 'sunny') {
          if (p.x > w + 200) p.x = -200
          ctx.save()
          ctx.translate(p.x, 0)
          ctx.rotate(0.35)
          const g = ctx.createLinearGradient(0, 0, 0, h)
          g.addColorStop(0, `rgba(232,163,61,${p.a})`)
          g.addColorStop(1, 'rgba(232,163,61,0)')
          ctx.fillStyle = g
          ctx.fillRect(-p.r / 2, -50, p.r, h * 1.2)
          ctx.restore()
        } else {
          if (p.x - p.r > w) p.x = -p.r
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
          g.addColorStop(0, `rgba(255,255,255,${p.a})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2)
        }
      }
      if (running) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onVisibility = () => {
      running = !document.hidden
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [mood, reduced])

  if (reduced) return null
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
