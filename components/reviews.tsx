'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from 'lucide-react'
import { site } from '@/data/site'
import { SectionHeading } from './section-heading'

export function Reviews() {
  const reviews = site.reviews
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const go = (dir: number) => setIndex((i) => (i + dir + reviews.length) % reviews.length)
  const review = reviews[index]

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative z-10 bg-moss">
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 text-center sm:px-6">
        <SectionHeading
          id="reviews-title"
          tone="dark"
          eyebrow="Guest reviews"
          title="What guests say"
          className="mx-auto items-center"
        />

        {review ? (
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Guest reviews"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') go(1)
              if (e.key === 'ArrowLeft') go(-1)
            }}
            className="mt-10"
          >
            <div aria-live="polite" className="relative min-h-56">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${reviews.length}`}
                  className="flex flex-col items-center gap-5"
                >
                  <Quote className="size-8 text-lantern" aria-hidden="true" />
                  <blockquote className="text-balance font-serif text-2xl leading-snug text-mist sm:text-3xl">
                    {review.quote}
                  </blockquote>
                  {review.rating && (
                    <p className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`size-4 ${i < review.rating! ? 'fill-lantern text-lantern' : 'text-mist/30'}`} aria-hidden="true" />
                      ))}
                    </p>
                  )}
                  <figcaption className="text-sm font-medium text-mist/80">{review.name}</figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            {reviews.length > 1 && (
              <div className="mt-6 flex justify-center gap-3">
                <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="rounded-full border border-mist/30 p-3 text-mist hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-lantern">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next review" className="rounded-full border border-mist/30 p-3 text-mist hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-lantern">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="mx-auto mt-6 max-w-lg text-pretty leading-relaxed text-mist/80">
            Read honest reviews from past guests on our Google listing, and if you have stayed with us, we would love to
            hear how it went.
          </p>
        )}

        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-lantern px-6 py-3 font-medium text-moss transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mist"
        >
          View all on Google
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
