import { Star } from 'lucide-react'

export function LanternTag({ value, count }: { value: number; count: number }) {
  return (
    <div className="absolute -top-6 right-6 flex flex-col items-center motion-safe:animate-[sway_4s_ease-in-out_infinite] origin-top">
      <span className="h-8 w-px bg-moss/40" aria-hidden="true" />
      <div className="flex flex-col items-center rounded-b-2xl rounded-t-md bg-lantern px-4 py-3 text-moss shadow-lg">
        <span className="flex items-center gap-1 font-serif text-2xl font-semibold">
          {value.toFixed(1)}
          <Star className="size-4 fill-moss" aria-hidden="true" />
        </span>
        <span className="text-[11px] font-medium">{count} Google reviews</span>
      </div>
      <style>{`@keyframes sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}`}</style>
    </div>
  )
}
