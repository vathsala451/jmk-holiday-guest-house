'use client'

import { useState } from 'react'
import { RotateCw } from 'lucide-react'
import { site, type Amenity } from '@/data/site'
import { amenityIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

function LanternCard({ amenity }: { amenity: Amenity }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = amenityIcons[amenity.icon]
  return (
    <li className="perspective">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${amenity.title}. ${flipped ? amenity.detail : 'Tap for details'}`}
        className="group relative block h-56 w-full rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern"
      >
        <div
          className={cn(
            'preserve-3d relative h-full w-full transition-transform duration-700 motion-reduce:transition-none',
            flipped && '[transform:rotateY(180deg)]',
          )}
        >
          <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl border border-mist/10 bg-mist/5 p-6 transition-shadow duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(232,163,61,0.6)]">
            <span className="flex size-14 items-center justify-center rounded-full bg-lantern/15 text-lantern transition-all duration-500 group-hover:bg-lantern group-hover:text-moss group-hover:shadow-[0_0_30px_rgba(232,163,61,0.8)]">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div className="flex items-end justify-between gap-2">
              <h3 className="font-serif text-2xl text-mist">{amenity.title}</h3>
              <RotateCw className="size-4 shrink-0 text-mist/60" aria-hidden="true" />
            </div>
          </div>
          <div className="backface-hidden absolute inset-0 flex flex-col justify-center gap-3 rounded-3xl bg-lantern p-6 text-moss [transform:rotateY(180deg)]">
            <h3 className="font-serif text-xl font-semibold">{amenity.title}</h3>
            <p className="leading-relaxed">{amenity.detail}</p>
          </div>
        </div>
      </button>
    </li>
  )
}

export function Amenities() {
  if (site.amenities.length === 0) return null
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="relative z-10 bg-moss">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <SectionHeading
          id="amenities-title"
          tone="dark"
          eyebrow="Amenities"
          title="Small comforts for cool hill days"
          intro="Tap a lantern to read more."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.amenities.map((a) => (
            <LanternCard key={a.id} amenity={a} />
          ))}
        </ul>
      </div>
    </section>
  )
}
