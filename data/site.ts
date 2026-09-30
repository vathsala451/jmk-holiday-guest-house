export type Amenity = {
  id: string
  title: string
  icon: 'flame' | 'utensils' | 'car' | 'users' | 'map-pin' | 'bed'
  detail: string
}

export type Room = {
  id: string
  name: string
  description: string
  features: string[]
  image: { src: string; alt: string }
}

export type Review = {
  name: string
  quote: string
  rating?: number
}

export type GalleryImage = {
  src: string
  alt: string
  width: number
  height: number
}

export const site = {
  name: 'JMK Holiday Guest House',
  shortName: 'JMK',
  address: {
    street: 'Mawsmai, Nongthymmai, Near Eco Park',
    locality: 'Sohra',
    region: 'Meghalaya',
    postalCode: '793108',
    country: 'IN',
    full: 'Mawsmai, Nongthymmai, Near Eco Park, Sohra, Meghalaya 793108',
  },
  phone: {
    raw: '918119010973',
    tel: '+918119010973',
    display: '+91 81190 10973',
  },
  whatsappMessage:
    "Hi JMK Holiday Guest House, I'd like to enquire about a stay.",
  // Fill these from the Google Business profile. Leave null to hide the rating tag.
  rating: null as { value: number; count: number } | null,
  checkIn: null as string | null,
  checkOut: null as string | null,
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=JMK+Holiday+Guest+House+Mawsmai+Sohra+Meghalaya',
  mapsEmbed:
    'https://maps.google.com/maps?q=JMK%20Holiday%20Guest%20House%2C%20Mawsmai%2C%20Sohra%2C%20Meghalaya%20793108&z=15&output=embed',
  nearby: ['Eco Park', 'Mawsmai Cave', 'Seven Sisters Falls'],

  amenities: [
    {
      id: 'hot-water',
      title: 'Hot water',
      icon: 'flame',
      detail: 'Geysers in the rooms, welcome after a cool, misty day in Sohra.',
    },
    {
      id: 'kitchen',
      title: 'Kitchen access',
      icon: 'utensils',
      detail: 'Kitchen facilities that families and groups can use during their stay.',
    },
    {
      id: 'parking',
      title: 'Parking',
      icon: 'car',
      detail: 'Space to park your car right in front of the guest house.',
    },
    {
      id: 'groups',
      title: 'Family & group rooms',
      icon: 'users',
      detail: 'Rooms with two double beds, so families and friends can stay together.',
    },
  ] satisfies Amenity[],

  rooms: [
    {
      id: 'family-room',
      name: 'Family Room',
      description:
        'A bright room with two double beds, warm blankets and plenty of floor space for your bags.',
      features: ['Two double beds', 'Geyser for hot water', 'Suits families & groups'],
      image: {
        src: '/images/room-twin.png',
        alt: 'Family room with two wooden double beds, floral bedsheets and pink patterned curtains',
      },
    },
  ] satisfies Room[],

  // Paste 3-4 real Google reviews here. The carousel appears once this list has entries.
  reviews: [] as Review[],

  gallery: [
    {
      src: '/images/exterior-night.png',
      alt: 'The guest house at night, its roofline lit with blue and warm fairy lights',
      width: 505,
      height: 357,
    },
    {
      src: '/images/room-twin.png',
      alt: 'Family room with two double beds and pink curtains',
      width: 503,
      height: 476,
    },
    {
      src: '/images/lake-sunset.png',
      alt: 'Sunset over a calm lake ringed by forested hills',
      width: 512,
      height: 328,
    },
    {
      src: '/images/entrance.png',
      alt: 'Red double doors opening into the guest house hallway',
      width: 503,
      height: 328,
    },
    {
      src: '/images/river-view.png',
      alt: 'View through tree branches over a wide river and sandbanks in the valley',
      width: 503,
      height: 332,
    },
    {
      src: '/images/lake-jetty.png',
      alt: 'A visitor on a lakeside jetty as the sun breaks through the clouds',
      width: 511,
      height: 326,
    },
  ] satisfies GalleryImage[],
}

export const whatsappUrl = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.phone.raw}?text=${encodeURIComponent(message)}`

export const navLinks = [
  { href: '#amenities', label: 'Amenities' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
  { href: '#enquire', label: 'Enquire' },
]
