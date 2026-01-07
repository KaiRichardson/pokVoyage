import { create } from 'zustand';
import { Trip, Activity, Accommodation, Transportation } from '@types/trip';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchTrips: () => Promise<void>;
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTrip: (id: string, trip: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  setCurrentTrip: (trip: Trip | null) => void;

  // Activity actions
  addActivity: (tripId: string, activity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (tripId: string, activityId: string, activity: Partial<Activity>) => Promise<void>;
  deleteActivity: (tripId: string, activityId: string) => Promise<void>;

  // Accommodation actions
  addAccommodation: (tripId: string, accommodation: Omit<Accommodation, 'id'>) => Promise<void>;
  updateAccommodation: (tripId: string, accommodationId: string, accommodation: Partial<Accommodation>) => Promise<void>;
  deleteAccommodation: (tripId: string, accommodationId: string) => Promise<void>;

  // Transportation actions
  addTransportation: (tripId: string, transportation: Omit<Transportation, 'id'>) => Promise<void>;
  updateTransportation: (tripId: string, transportationId: string, transportation: Partial<Transportation>) => Promise<void>;
  deleteTransportation: (tripId: string, transportationId: string) => Promise<void>;
}

const STORAGE_KEY = '@travel_planner_trips';

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,

  fetchTrips: async () => {
    set({ loading: true, error: null });
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const trips = data ? JSON.parse(data) : [];
      set({ trips, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch trips', loading: false });
    }
  },

  addTrip: async (tripData) => {
    try {
      const newTrip: Trip = {
        ...tripData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const trips = [...get().trips, newTrip];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to add trip' });
    }
  },

  updateTrip: async (id, tripData) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === id
          ? { ...trip, ...tripData, updatedAt: new Date() }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });

      if (get().currentTrip?.id === id) {
        const updatedTrip = trips.find(t => t.id === id);
        set({ currentTrip: updatedTrip || null });
      }
    } catch (error) {
      set({ error: 'Failed to update trip' });
    }
  },

  deleteTrip: async (id) => {
    try {
      const trips = get().trips.filter(trip => trip.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });

      if (get().currentTrip?.id === id) {
        set({ currentTrip: null });
      }
    } catch (error) {
      set({ error: 'Failed to delete trip' });
    }
  },

  setCurrentTrip: (trip) => {
    set({ currentTrip: trip });
  },

  addActivity: async (tripId, activityData) => {
    try {
      const newActivity: Activity = {
        ...activityData,
        id: Date.now().toString(),
        tripId,
      };

      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            activities: [...trip.activities, newActivity],
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to add activity' });
    }
  },

  updateActivity: async (tripId, activityId, activityData) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            activities: trip.activities.map(activity =>
              activity.id === activityId
                ? { ...activity, ...activityData }
                : activity
            ),
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to update activity' });
    }
  },

  deleteActivity: async (tripId, activityId) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            activities: trip.activities.filter(a => a.id !== activityId),
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to delete activity' });
    }
  },

  addAccommodation: async (tripId, accommodationData) => {
    try {
      const newAccommodation: Accommodation = {
        ...accommodationData,
        id: Date.now().toString(),
        tripId,
      };

      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            accommodations: [...trip.accommodations, newAccommodation],
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to add accommodation' });
    }
  },

  updateAccommodation: async (tripId, accommodationId, accommodationData) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            accommodations: trip.accommodations.map(acc =>
              acc.id === accommodationId
                ? { ...acc, ...accommodationData }
                : acc
            ),
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to update accommodation' });
    }
  },

  deleteAccommodation: async (tripId, accommodationId) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            accommodations: trip.accommodations.filter(a => a.id !== accommodationId),
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to delete accommodation' });
    }
  },

  addTransportation: async (tripId, transportationData) => {
    try {
      const newTransportation: Transportation = {
        ...transportationData,
        id: Date.now().toString(),
        tripId,
      };

      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            transportations: [...trip.transportations, newTransportation],
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to add transportation' });
    }
  },

  updateTransportation: async (tripId, transportationId, transportationData) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            transportations: trip.transportations.map(trans =>
              trans.id === transportationId
                ? { ...trans, ...transportationData }
                : trans
            ),
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to update transportation' });
    }
  },

  deleteTransportation: async (tripId, transportationId) => {
    try {
      const trips = get().trips.map(trip =>
        trip.id === tripId
          ? {
            ...trip,
            transportations: trip.transportations.filter(t => t.id !== transportationId),
            updatedAt: new Date(),
          }
          : trip
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      set({ trips });
    } catch (error) {
      set({ error: 'Failed to delete transportation' });
    }
  },
}));