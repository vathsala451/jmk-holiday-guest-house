export type InquiryInput = {
  name: string
  phone: string
  checkIn: string
  checkOut: string
  guests: string | number
  message?: string
}

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>

const INDIAN_MOBILE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/

export function normalizePhone(phone: string) {
  return phone.replace(/[\s-]/g, '')
}

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {}
  const name = input.name?.trim() ?? ''
  if (name.length < 2) errors.name = 'Please enter your name.'
  else if (name.length > 80) errors.name = 'Name is too long.'

  if (!INDIAN_MOBILE.test(normalizePhone(input.phone ?? ''))) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (optionally with +91).'
  }

  if (!input.checkIn) errors.checkIn = 'Choose a check-in date.'
  if (!input.checkOut) errors.checkOut = 'Choose a check-out date.'
  if (input.checkIn && input.checkOut && input.checkOut <= input.checkIn) {
    errors.checkOut = 'Check-out must be after check-in.'
  }

  const guests = Number(input.guests)
  if (!Number.isInteger(guests) || guests < 1) errors.guests = 'At least 1 guest.'
  else if (guests > 30) errors.guests = 'For more than 30 guests, please call us.'

  if ((input.message ?? '').length > 1000) errors.message = 'Please keep the message under 1000 characters.'
  return errors
}

export function inquiryToText(input: InquiryInput) {
  return [
    `Name: ${input.name.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Check-in: ${input.checkIn}`,
    `Check-out: ${input.checkOut}`,
    `Guests: ${input.guests}`,
    input.message?.trim() ? `Message: ${input.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}
