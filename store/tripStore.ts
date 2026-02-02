import { getStoredTrips, saveTrips } from '@/lib/storage';
import type { ItineraryItem, Trip } from '@/types';
import { create } from 'zustand';

interface TripState {
  trips: Record<string, Trip>;
  loaded: boolean;
  loadTrips: (userId: string) => Promise<void>;
  addTrip: (trip: Trip) => Promise<void>;
  updateTrip: (trip: Trip) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  reorderItinerary: (tripId: string, items: ItineraryItem[]) => Promise<void>;
  addItineraryItem: (tripId: string, item: Omit<ItineraryItem, 'id' | 'order'>) => Promise<void>;
  updateItineraryItem: (tripId: string, item: ItineraryItem) => Promise<void>;
  removeItineraryItem: (tripId: string, itemId: string) => Promise<void>;
}

function persistTrips(trips: Record<string, Trip>) {
  saveTrips(JSON.stringify(trips));
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: {},
  loaded: false,

  loadTrips: async (userId: string) => {
    const json = await getStoredTrips();
    const all: Record<string, Trip> = JSON.parse(json) || {};
    const userTrips: Record<string, Trip> = {};
    for (const [id, trip] of Object.entries(all)) {
      if (trip.userId === userId) userTrips[id] = trip;
    }
    set({ trips: userTrips, loaded: true });
  },

  addTrip: async (trip: Trip) => {
    const json = await getStoredTrips();
    const all: Record<string, Trip> = JSON.parse(json) || {};
    all[trip.id] = trip;
    persistTrips(all);
    set((s) => ({ trips: { ...s.trips, [trip.id]: trip } }));
  },

  updateTrip: async (trip: Trip) => {
    const json = await getStoredTrips();
    const all: Record<string, Trip> = JSON.parse(json) || {};
    all[trip.id] = trip;
    persistTrips(all);
    set((s) => ({ trips: { ...s.trips, [trip.id]: trip } }));
  },

  deleteTrip: async (tripId: string) => {
    const { trips } = get();
    const trip = trips[tripId];
    if (!trip) return;
    const json = await getStoredTrips();
    const all: Record<string, Trip> = JSON.parse(json) || {};
    delete all[tripId];
    persistTrips(all);
    const next = { ...trips };
    delete next[tripId];
    set({ trips: next });
  },

  reorderItinerary: async (tripId: string, items: ItineraryItem[]) => {
    const { trips } = get();
    const trip = trips[tripId];
    if (!trip) return;
    const updated = { ...trip, itinerary: items.map((i, idx) => ({ ...i, order: idx })) };
    await get().updateTrip(updated);
  },

  addItineraryItem: async (tripId: string, item: Omit<ItineraryItem, 'id' | 'order'>) => {
    const { trips } = get();
    const trip = trips[tripId];
    if (!trip) return;
    const order = trip.itinerary?.length ?? 0;
    const newItem: ItineraryItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      order,
    };
    const itinerary = [...(trip.itinerary || []), newItem];
    const updated = { ...trip, itinerary };
    await get().updateTrip(updated);
  },

  updateItineraryItem: async (tripId: string, item: ItineraryItem) => {
    const { trips } = get();
    const trip = trips[tripId];
    if (!trip) return;
    const itinerary = (trip.itinerary || []).map((i) => (i.id === item.id ? item : i));
    const updated = { ...trip, itinerary };
    await get().updateTrip(updated);
  },

  removeItineraryItem: async (tripId: string, itemId: string) => {
    const { trips } = get();
    const trip = trips[tripId];
    if (!trip) return;
    const itinerary = (trip.itinerary || [])
      .filter((i) => i.id !== itemId)
      .map((i, idx) => ({ ...i, order: idx }));
    const updated = { ...trip, itinerary };
    await get().updateTrip(updated);
  },
}));
