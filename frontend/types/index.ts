export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  isVerified: boolean;
  isHost: boolean;
  reputationScore: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Listing {
  id: string;
  hostId: string;
  title: string;
  description: string;
  accommodationType: 'couch' | 'shared' | 'private' | 'entire';
  pricePerNight: number;
  maxGuests: number;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  host?: Partial<User>;
  distanceToVenue?: number;
}

export interface Event {
  id: string;
  name: string;
  eventType: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  venueLatitude: number;
  venueLogitude: number;
  venueName: string;
  description?: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  listingId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  listing?: Partial<Listing>;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
