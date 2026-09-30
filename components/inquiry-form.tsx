'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, MessageCircle, AlertCircle, Send } from 'lucide-react'
import { inquiryToText, validateInquiry, type InquiryErrors, type InquiryInput } from '@/lib/inquiry'
import { site, whatsappUrl } from '@/data/site'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

type Status = 'idle' | 'loading' | 'success' | 'error'

const empty: InquiryInput = { name: '', phone: '', checkIn: '', checkOut: '', guests: '2', room: site.rooms[0]?.name ?? '', message: '' }
const today = () => new Date().toISOString().slice(0, 10)

export function InquiryForm() {
  const [values, setValues] = useState<InquiryInput>(empty)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [sent, setSent] = useState<InquiryInput | null>(null)

  const update = (key: keyof InquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const whatsappText = (v: InquiryInput) => `Hi ${site.name}, I'd like to enquire about a stay.\n\n${inquiryToText(v)}`

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateInquiry(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`inq-${first}`)?.focus()
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (data.errors) setErrors(data.errors)
        setServerMessage(data.error ?? 'Something went wrong. Please try WhatsApp.')
        setStatus('error')
        return
      }
      setSent(data.delivered ? null : values)
      setValues(empty)
      setStatus('success')
    } catch {
      setServerMessage('Network error. Please check your connection or use WhatsApp.')
      setStatus('error')
    }
  }

  return (
    <section id="book" aria-labelledby="book-title" className="relative z-10 mx-auto max-w-3xl scroll-mt-28 px-4 py-20 sm:px-6">
      <SectionHeading
        id="book-title"
        eyebrow="Book / Stay"
        title="Book your stay"
        intro="Share your dates and we will get back to you with availability."
      />

      {(
        <form noValidate onSubmit={onSubmit} className="mt-10 grid gap-5 rounded-[2rem] border border-border bg-card p-6 sm:grid-cols-2 sm:p-8">
          <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
            <input id="inq-name" name="name" autoComplete="name" value={values.name} onChange={update('name')} {...a11y('name', errors)} className={inputCls(errors.name)} />
          </Field>
          <Field id="phone" label="Mobile number" hint="10 digits, +91 optional" error={errors.phone} className="sm:col-span-2">
            <input id="inq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={values.phone} onChange={update('phone')} {...a11y('phone', errors)} className={inputCls(errors.phone)} />
          </Field>
          <Field id="checkIn" label="Check-in" error={errors.checkIn}>
            <input id="inq-checkIn" name="checkIn" type="date" min={today()} value={values.checkIn} onChange={update('checkIn')} {...a11y('checkIn', errors)} className={inputCls(errors.checkIn)} />
          </Field>
          <Field id="checkOut" label="Check-out" error={errors.checkOut}>
            <input id="inq-checkOut" name="checkOut" type="date" min={values.checkIn || today()} value={values.checkOut} onChange={update('checkOut')} {...a11y('checkOut', errors)} className={inputCls(errors.checkOut)} />
          </Field>
          <Field id="guests" label="Guests" error={errors.guests}>
            <input id="inq-guests" name="guests" type="number" min={1} max={30} inputMode="numeric" value={values.guests} onChange={update('guests')} {...a11y('guests', errors)} className={inputCls(errors.guests)} />
          </Field>
          <Field id="room" label="Room type" error={errors.room}>
            <select id="inq-room" name="room" value={values.room} onChange={update('room')} className={inputCls(errors.room)}>
              {site.rooms.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id="message" label="Message (optional)" error={errors.message} className="sm:col-span-2">
            <textarea id="inq-message" name="message" rows={4} value={values.message} onChange={update('message')} {...a11y('message', errors)} className={cn(inputCls(errors.message), 'resize-y')} />
          </Field>

          {status === 'error' && (
            <div role="alert" className="flex flex-col gap-3 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive sm:col-span-2">
              <p className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {serverMessage}
              </p>
              <a
                href={whatsappUrl(whatsappText(values))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-moss px-4 py-2 font-medium text-mist"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Send on WhatsApp
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-moss px-6 py-3.5 font-medium text-mist transition-colors hover:bg-moss/90 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:col-span-2"
          >
            {status === 'loading' ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : null}
            {status === 'loading' ? 'Sending…' : 'Send Booking Request'}
            {status !== 'loading' && <Send className="size-4" aria-hidden="true" />}
          </button>

          <div role="status" aria-live="polite" className="sm:col-span-2 empty:hidden">
            {status === 'success' && (
              <div className="flex flex-col gap-3">
                <p className="flex items-start gap-2 font-medium text-emerald-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  Thank you! Your booking request has been sent. We will contact you soon.
                </p>
                {sent && (
                  <a
                    href={whatsappUrl(whatsappText(sent))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-lantern px-4 py-2 text-sm font-medium text-moss"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Confirm faster on WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
        </form>
      )}
    </section>
  )
}

function a11y(key: keyof InquiryInput, errors: InquiryErrors) {
  return {
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `inq-${key}-error` : undefined,
    required: key !== 'message',
  }
}

const inputCls = (error?: string) =>
  cn(
    'w-full rounded-xl border bg-mist px-4 py-3 text-moss placeholder:text-muted-foreground/70 focus:outline-2 focus:outline-offset-1 focus:outline-lantern',
    error ? 'border-destructive' : 'border-input',
  )

function Field({ id, label, hint, error, className, children }: { id: string; label: string; hint?: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={`inq-${id}`} className="text-sm font-medium text-moss">
        {label} {hint && <span className="font-normal text-muted-foreground">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`inq-${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
