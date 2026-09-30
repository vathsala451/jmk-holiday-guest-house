import Image from 'next/image'
import { site } from '@/data/site'
import { SectionHeading } from './section-heading'

export function About() {
  return (
    <section aria-labelledby="about-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/entrance.png"
            alt="Red wooden double doors open onto the guest house hallway"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="about-title"
            eyebrow="About the stay"
            title="A simple, warm base in the Khasi Hills"
          />
          <p className="leading-relaxed text-muted-foreground">
            {site.name} is in Mawsmai, Nongthymmai, close to Eco Park in Sohra. It is a straightforward, homely place to
            sleep, cook and rest between days out in the hills.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Rooms come with geysers for hot water, there is a kitchen that families and groups can use, and you can park
            right outside. Call or message us on WhatsApp to check availability for your dates.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Nearby places">
            {site.nearby.map((n) => (
              <li key={n} className="rounded-full border border-moss/20 px-3 py-1 text-sm text-moss">
                Near {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
