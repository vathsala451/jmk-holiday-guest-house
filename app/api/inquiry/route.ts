import { NextResponse } from 'next/server'
import { inquiryToText, validateInquiry, type InquiryInput } from '@/lib/inquiry'
import { site } from '@/data/site'

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(request: Request) {
  let body: InquiryInput
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const errors = validateInquiry(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Please fix the highlighted fields.', errors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.INQUIRY_TO_EMAIL
  if (!apiKey || !to) {
    return NextResponse.json({ ok: true, delivered: false })
  }

  const text = inquiryToText(body)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
      to: [to],
      subject: `New stay enquiry from ${body.name.trim()}`,
      text,
      html: `<pre style="font-family:system-ui,sans-serif;font-size:14px">${escapeHtml(text)}</pre>`,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'We could not send your enquiry right now. Please try WhatsApp.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true, delivered: true })
}
