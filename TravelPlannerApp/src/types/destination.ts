export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  coordinates: Coordinates;
  description?: string;
  imageUrl?: string;
  thumbnail?: string;
  popularityScore?: number;
  averageTemperature?: TemperatureRange;
  bestMonthsToVisit?: string[];
  currency?: string;
  language?: string[];
  timezone?: string;
  attractions?: Attraction[];
  activities?: string[];
  tags?: string[];
  budget?: BudgetLevel;
  safetyRating?: number;
  touristRating?: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TemperatureRange {
  min: number;
  max: number;
  unit: 'celsius' | 'fahrenheit';
}

export interface Attraction {
  id: string;
  name: string;
  type: AttractionType;
  description?: string;
  imageUrl?: string;
  rating?: number;
  entryFee?: number;
  openingHours?: OpeningHours;
}

export enum AttractionType {
  MUSEUM = 'Museum',
  MONUMENT = 'Monument',
  PARK = 'Park',
  BEACH = 'Beach',
  RESTAURANT = 'Restaurant',
  SHOPPING = 'Shopping',
  NIGHTLIFE = 'Nightlife',
  NATURE = 'Nature',
  HISTORICAL = 'Historical',
  RELIGIOUS = 'Religious',
  OTHER = 'Other',
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export enum BudgetLevel {
  BUDGET = 'Budget',
  MODERATE = 'Moderate',
  LUXURY = 'Luxury',
}

export interface DestinationFilter {
  continent?: string[];
  budgetLevel?: BudgetLevel[];
  activities?: string[];
  minRating?: number;
  searchQuery?: string;
}