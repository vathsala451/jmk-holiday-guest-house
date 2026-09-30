import Image from 'next/image'
import { Check, MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from '@/data/site'
import { SectionHeading } from './section-heading'

export function Rooms() {
  if (site.rooms.length === 0) return null
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        id="rooms-title"
        eyebrow="Rooms"
        title="Room to rest together"
        intro="Tariffs depend on dates and group size. Message us and we will share current rates."
      />
      <div className="mt-10 flex flex-col gap-8">
        {site.rooms.map((room) => (
          <article key={room.id} className="grid overflow-hidden rounded-[2rem] border border-border bg-card md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-80">
              <Image src={room.image.src} alt={room.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
              <h3 className="font-serif text-3xl text-moss">{room.name}</h3>
              <p className="leading-relaxed text-muted-foreground">{room.description}</p>
              <ul className="flex flex-col gap-2">
                {room.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-moss">
                    <Check className="size-4 text-lantern" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl(`Hi ${site.name}, I'd like to know the rates for the ${room.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-mist transition-colors hover:bg-moss/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Ask for rates
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
