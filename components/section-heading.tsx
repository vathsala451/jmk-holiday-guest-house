import { cn } from '@/lib/utils'

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = 'light',
  className,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className={cn('flex max-w-2xl flex-col gap-3', className)}>
      <p className={cn('text-xs font-semibold uppercase tracking-[0.2em]', dark ? 'text-lantern' : 'text-slate')}>{eyebrow}</p>
      <h2 id={id} className={cn('text-balance font-serif text-4xl font-medium leading-tight sm:text-5xl', dark ? 'text-mist' : 'text-moss')}>
        {title}
      </h2>
      {intro && <p className={cn('text-pretty leading-relaxed', dark ? 'text-mist/80' : 'text-muted-foreground')}>{intro}</p>}
    </div>
  )
}
