import { site } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-moss pb-28 text-mist md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="max-w-sm text-sm leading-relaxed text-mist/75">{site.address.full}</p>
          <a href={`tel:${site.phone.tel}`} className="w-fit text-sm font-medium text-lantern hover:underline">
            {site.phone.display}
          </a>
        </div>
        <p className="text-xs text-mist/60">
          {'© '}
          {new Date().getFullYear()} {site.name} · Made with care in Sohra
        </p>
      </div>
    </footer>
  )
}
