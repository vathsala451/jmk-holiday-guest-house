import { BedDouble, Check, Users } from 'lucide-react'
import { site } from '@/data/site'
import { SectionHeading } from './section-heading'

export function Rooms() {
  if (site.rooms.length === 0) return null
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        id="rooms-title"
        eyebrow="Rooms"
        title="Choose your stay"
        intro="Call or send a booking request for current rates and availability."
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {site.rooms.map((room) => (
          <li key={room.id} className="flex flex-col gap-5 rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-full bg-lantern/20 text-moss">
              <BedDouble className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl font-semibold text-moss">{room.name}</h3>
              <p className="leading-relaxed text-muted-foreground">{room.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-moss">
                <Users className="size-4" aria-hidden="true" />
                {room.guests}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-moss">
                <BedDouble className="size-4" aria-hidden="true" />
                {room.beds}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {room.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-moss/90">
                  <Check className="size-4 text-moss/70" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-moss px-6 py-3.5 font-semibold text-mist transition-colors hover:bg-moss/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Book this room
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
