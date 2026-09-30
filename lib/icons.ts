import { BedDouble, Car, Flame, MapPin, Users, UtensilsCrossed } from 'lucide-react'
import type { Amenity } from '@/data/site'

export const amenityIcons: Record<Amenity['icon'], typeof Flame> = {
  flame: Flame,
  utensils: UtensilsCrossed,
  car: Car,
  users: Users,
  'map-pin': MapPin,
  bed: BedDouble,
}
