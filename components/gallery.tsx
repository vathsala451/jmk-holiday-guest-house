'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { site } from '@/data/site'
import { SectionHeading } from './section-heading'

export function Gallery() {
  const images = site.gallery
  const [open, setOpen] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const trackRef = useRef<HTMLUListElement>(null)

  const scrollTrack = (dir: number) => {
    const track = trackRef.current
    if (!track) return
    const item = track.querySelector('li')
    const amount = item ? item.getBoundingClientRect().width + 20 : track.clientWidth
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    const atStart = track.scrollLeft <= 4
    if (dir > 0 && atEnd) track.scrollTo({ left: 0 })
    else if (dir < 0 && atStart) track.scrollTo({ left: track.scrollWidth })
    else track.scrollBy({ left: dir * amount })
  }

  const close = useCallback(() => {
    setOpen((current) => {
      if (current !== null) triggerRefs.current[current]?.focus()
      return null
    })
  }, [])
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open !== null && !d.open) d.showModal()
    if (open === null && d.open) d.close()
  }, [open])

  if (images.length === 0) return null
  const current = open !== null ? images[open] : null

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="gallery-title" eyebrow="Gallery" title="The house and the hills around it" />
      <div className="relative mt-10">
        <ul
          ref={trackRef}
          aria-label="Photo carousel"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <li key={img.src} className="w-[80%] shrink-0 snap-center sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el
                }}
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern"
              >
                <span className="sr-only">Open photo: </span>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => scrollTrack(-1)}
          aria-label="Scroll photos left"
          className="absolute left-0 top-1/2 z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card text-moss shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-lantern"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollTrack(1)}
          aria-label="Scroll photos right"
          className="absolute right-0 top-1/2 z-10 grid size-11 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-card text-moss shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-lantern"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-moss/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="flex flex-col items-center gap-4">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="h-auto max-h-[75vh] w-auto max-w-[90vw] rounded-xl"
            />
            <figcaption className="max-w-xl text-center text-sm text-mist">
              {current.alt} <span className="text-mist/70">({(open ?? 0) + 1} / {images.length})</span>
            </figcaption>
            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="rounded-full bg-mist p-3 text-moss focus-visible:outline-2 focus-visible:outline-lantern">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={close} aria-label="Close photo viewer" className="rounded-full bg-lantern p-3 text-moss focus-visible:outline-2 focus-visible:outline-mist">
                <X className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="rounded-full bg-mist p-3 text-moss focus-visible:outline-2 focus-visible:outline-lantern">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  )
}
