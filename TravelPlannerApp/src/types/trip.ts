export interface Trip {
  id: string;
  title: string;
  description: string;
  destination: Destination;
  startDate: Date;
  endDate: Date;
  budget: number;
  currency: string;
  imageUrl?: string;
  activities: Activity[];
  accommodations: Accommodation[];
  transportations: Transportation[];
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  imageUrl?: string;
}

export interface Activity {
  id: string;
  tripId: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  location: string;
  cost?: number;
  category: ActivityCategory;
  notes?: string;
}

export enum ActivityCategory {
  SIGHTSEEING = 'Sightseeing',
  FOOD = 'Food & Dining',
  ADVENTURE = 'Adventure',
  RELAXATION = 'Relaxation',
  CULTURE = 'Culture',
  SHOPPING = 'Shopping',
  OTHER = 'Other'
}

export interface Accommodation {
  id: string;
  tripId: string;
  name: string;
  type: AccommodationType;
  address: string;
  checkIn: Date;
  checkOut: Date;
  cost: number;
  confirmationNumber?: string;
  notes?: string;
}

export enum AccommodationType {
  HOTEL = 'Hotel',
  HOSTEL = 'Hostel',
  AIRBNB = 'Airbnb',
  RESORT = 'Resort',
  OTHER = 'Other'
}

export interface Transportation {
  id: string;
  tripId: string;
  type: TransportationType;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: Date;
  arrivalTime: Date;
  cost: number;
  confirmationNumber?: string;
  notes?: string;
}

export enum TransportationType {
  FLIGHT = 'Flight',
  TRAIN = 'Train',
  BUS = 'Bus',
  CAR = 'Car',
  FERRY = 'Ferry',
  OTHER = 'Other'
}