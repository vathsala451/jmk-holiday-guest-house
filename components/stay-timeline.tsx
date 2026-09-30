'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Compass, DoorOpen, Moon, Sofa } from 'lucide-react'
import { SectionHeading } from './section-heading'

const steps = [
  { title: 'Arrive', Icon: DoorOpen, text: 'Head to Mawsmai, Nongthymmai in Sohra. We are near Eco Park, and you can call us for directions.' },
  { title: 'Settle in', Icon: Sofa, text: 'Drop your bags, take a hot shower and make yourself something warm in the kitchen.' },
  { title: 'Explore nearby', Icon: Compass, text: 'Eco Park is close by. Spend the day out in the hills and valleys around Sohra.' },
  { title: 'Rest', Icon: Moon, text: 'Come back to a quiet room and let the mist roll in for the night.' },
]

export function StayTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section aria-labelledby="timeline-title" className="relative z-10 mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHeading id="timeline-title" eyebrow="Your stay" title="Your stay, step by step" />
      <ol ref={ref} className="relative mt-12 flex flex-col gap-10 pl-14">
        <span className="absolute bottom-2 left-5 top-2 w-px bg-border" aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : scaleY }}
          className="absolute bottom-2 left-5 top-2 w-px origin-top bg-lantern"
        />
        {steps.map(({ title, Icon, text }, i) => (
          <li key={title} className="relative">
            <span className="absolute -left-14 flex size-10 items-center justify-center rounded-full border border-border bg-card text-moss">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">Step {i + 1}</p>
            <h3 className="mt-1 font-serif text-2xl text-moss">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
