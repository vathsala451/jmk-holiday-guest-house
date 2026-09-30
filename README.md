# JMK Holiday Guest House

Single-page site for JMK Holiday Guest House, Sohra. Built with Next.js (App Router), Tailwind CSS, TypeScript and Framer Motion.

## Editing content

All business details live in `data/site.ts`: address, phone, amenities, rooms, gallery and reviews.

- `rating`: set to `{ value: 4.3, count: 120 }` from Google to show the lantern rating tag. Leave it `null` to hide the tag.
- `reviews`: add 3-4 real Google reviews (`{ name, quote, rating? }`). The carousel appears once the list has entries.
- `checkIn` / `checkOut`: set to strings such as `'12:00 PM'` to show them on the location card.
- Photos live in `public/images`.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Environment variables (inquiry email)

The inquiry form posts to `/api/inquiry`, which sends the enquiry by email through [Resend](https://resend.com). If these are missing, the form asks the guest to send their enquiry on WhatsApp instead.

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `INQUIRY_TO_EMAIL` | Inbox that receives enquiries |
| `INQUIRY_FROM_EMAIL` | Optional. Verified sender, e.g. `JMK <hello@yourdomain.com>` |

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add the environment variables above under Project Settings, then Environment Variables.
4. Deploy.
