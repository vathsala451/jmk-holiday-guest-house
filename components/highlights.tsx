import { site } from '@/data/site'
import { amenityIcons } from '@/lib/icons'

export function Highlights() {
  const items = site.amenities.slice(0, 4)
  if (items.length === 0) return null
  return (
    <section aria-label="Highlights" className="relative z-10 bg-moss text-mist">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {items.map((a) => {
          const Icon = amenityIcons[a.icon]
          return (
            <li key={a.id} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lantern/15 text-lantern">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{a.title}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
