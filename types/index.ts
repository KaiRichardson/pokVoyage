export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // In production, never store plain passwords
}

export interface ItineraryItem {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string;
  location?: string;
  category: 'flight' | 'accommodation' | 'activity' | 'food' | 'transport' | 'other';
  order: number;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string;
  imageUri?: string;
  itinerary: ItineraryItem[];
  createdAt: string;
}
