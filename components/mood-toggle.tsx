'use client'

import { CloudFog, CloudRain, Sun } from 'lucide-react'
import { useMood, type Mood } from '@/hooks/use-mood'
import { cn } from '@/lib/utils'

const moods: { id: Mood; label: string; Icon: typeof Sun }[] = [
  { id: 'misty', label: 'Misty', Icon: CloudFog },
  { id: 'sunny', label: 'Sunny', Icon: Sun },
  { id: 'rainy', label: 'Rainy', Icon: CloudRain },
]

export function MoodToggle({ className }: { className?: string }) {
  const { mood, setMood } = useMood()
  return (
    <div role="radiogroup" aria-label="Set the mood" className={cn('flex items-center gap-2', className)}>
      <span className="text-xs font-medium text-muted-foreground">Set the mood</span>
      <div className="flex rounded-full border border-border bg-card/80 p-0.5 backdrop-blur">
        {moods.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={mood === id}
            onClick={() => setMood(id)}
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              mood === id ? 'bg-moss text-mist' : 'text-moss hover:bg-secondary',
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
