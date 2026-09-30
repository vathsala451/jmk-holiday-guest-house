'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Mood = 'misty' | 'sunny' | 'rainy'

const MoodContext = createContext<{ mood: Mood; setMood: (m: Mood) => void }>({
  mood: 'misty',
  setMood: () => {},
})

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood>('misty')
  useEffect(() => {
    document.body.dataset.mood = mood
  }, [mood])
  return <MoodContext.Provider value={{ mood, setMood }}>{children}</MoodContext.Provider>
}

export const useMood = () => useContext(MoodContext)
