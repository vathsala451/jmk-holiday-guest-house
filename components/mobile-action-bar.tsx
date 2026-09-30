import { CalendarDays, MessageCircle, Phone } from 'lucide-react'
import { site, whatsappUrl } from '@/data/site'

export function MobileActionBar() {
  const base = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-lantern'
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-3 bottom-3 z-50 flex overflow-hidden rounded-2xl bg-moss text-mist shadow-2xl md:hidden">
      <a href={`tel:${site.phone.tel}`} className={base}>
        <Phone className="size-5" aria-hidden="true" />
        Call
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${base} border-x border-mist/15`}>
        <MessageCircle className="size-5" aria-hidden="true" />
        WhatsApp
      </a>
      <a href="#enquire" className={`${base} bg-lantern text-moss`}>
        <CalendarDays className="size-5" aria-hidden="true" />
        Enquire
      </a>
    </nav>
  )
}
