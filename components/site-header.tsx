import { BedDouble, CalendarCheck, Images, MapPin, Phone, Sparkles, Star } from 'lucide-react'
import { navLinks, site } from '@/data/site'

const navIcons: Record<string, typeof Phone> = {
  '#amenities': Sparkles,
  '#rooms': BedDouble,
  '#gallery': Images,
  '#reviews': Star,
  '#location': MapPin,
  '#book': CalendarCheck,
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-mist/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="font-serif text-lg font-semibold leading-tight text-moss">
          JMK <span className="font-normal italic">Holiday Guest House</span>
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-medium text-moss/80">
            {navLinks.map((l) => {
              const Icon = navIcons[l.href]
              return (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-moss focus-visible:underline">
                    {Icon && <Icon className="size-4" aria-hidden="true" />}
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <a
          href={`tel:${site.phone.tel}`}
          className="inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2 text-sm font-medium text-mist transition-colors hover:bg-moss/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call
        </a>
      </div>
      <nav aria-label="Sections" className="border-t border-border/60 lg:hidden">
        <ul className="flex gap-2 overflow-x-auto px-4 py-2 text-sm font-medium text-moss/80 [scrollbar-width:none]">
          {navLinks.map((l) => {
            const Icon = navIcons[l.href]
            return (
              <li key={l.href} className="shrink-0">
                <a href={l.href} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5">
                  {Icon && <Icon className="size-4" aria-hidden="true" />}
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
