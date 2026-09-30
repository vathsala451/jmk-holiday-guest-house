import { MapPin, Navigation, Phone } from 'lucide-react'
import { site } from '@/data/site'
import { SectionHeading } from './section-heading'

export function Location() {
  return (
    <section id="location" aria-labelledby="location-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="location-title" eyebrow="Location" title="Find us near Eco Park, Sohra" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <address className="flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-8 not-italic">
          <div className="flex gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-lantern" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl text-moss">{site.name}</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{site.address.full}</p>
            </div>
          </div>
          <a href={`tel:${site.phone.tel}`} className="flex items-center gap-3 font-medium text-moss hover:underline">
            <Phone className="size-5 text-lantern" aria-hidden="true" />
            {site.phone.display}
          </a>
          {(site.checkIn || site.checkOut) && (
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {site.checkIn && (
                <div>
                  <dt className="text-muted-foreground">Check-in</dt>
                  <dd className="font-medium text-moss">{site.checkIn}</dd>
                </div>
              )}
              {site.checkOut && (
                <div>
                  <dt className="text-muted-foreground">Check-out</dt>
                  <dd className="font-medium text-moss">{site.checkOut}</dd>
                </div>
              )}
            </dl>
          )}
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-lantern px-6 py-3 font-medium text-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Get Directions
          </a>
        </address>
        <div className="overflow-hidden rounded-[2rem] border border-border">
          <iframe
            title={`Map showing ${site.name}`}
            src={site.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full lg:h-full lg:min-h-96"
          />
        </div>
      </div>
    </section>
  )
}
