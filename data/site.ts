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
  guests: string
  beds: string
  features: string[]
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
      id: 'double-room',
      name: 'Double Room',
      description: 'A cosy, clean room for couples or solo travellers after a day of waterfalls and caves.',
      guests: '2 guests',
      beds: '1 double bed',
      features: ['Attached bathroom', 'Hot water', 'Fresh linen'],
    },
    {
      id: 'family-room',
      name: 'Family Room',
      description: 'More space for families or friends, with room to spread out and rest.',
      guests: 'Up to 4 guests',
      beds: '2 double beds',
      features: ['Attached bathroom', 'Hot water', 'Extra blankets'],
    },
    {
      id: 'group-stay',
      name: 'Group Stay',
      description: 'Travelling as a larger group? Book several rooms together and we will arrange it.',
      guests: '5+ guests',
      beds: 'Multiple rooms',
      features: ['Parking for vehicles', 'Meals on request', 'Local tips from hosts'],
    },
  ] satisfies Room[],

  // Replace these with real reviews copied from the Google Business profile.
  reviews: [
    {
      name: 'Rahul S., Guwahati',
      rating: 5,
      quote:
        'Simple, clean rooms and the hot water worked well even on a cold, rainy evening. The hosts were friendly and gave us good tips for Mawsmai Cave and Seven Sisters Falls.',
    },
    {
      name: 'Priya & family, Kolkata',
      rating: 4,
      quote:
        'We stayed in the family room with two beds, which was perfect for the four of us. Being able to use the kitchen helped a lot. Nothing fancy, but very homely and good value.',
    },
    {
      name: 'Ankit M., Delhi',
      rating: 4,
      quote:
        'Great location close to Eco Park and parking right outside. The road gets foggy at night so arrive before dark. Would happily stay again.',
    },
    {
      name: 'Lalremruati, Aizawl',
      rating: 5,
      quote:
        'Warm welcome, fresh bedsheets and plenty of blankets. The place is quiet and peaceful, exactly what we wanted after a long day of sightseeing.',
    },
  ] as Review[],

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
  { href: '#book', label: 'Book Stay' },
]
