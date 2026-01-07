import { useEffect } from 'react';
import { useTripStore } from '@store/tripStore';

export const useTrips = () => {
  const {
    trips,
    currentTrip,
    loading,
    error,
    fetchTrips,
    addTrip,
    updateTrip,
    deleteTrip,
    setCurrentTrip,
  } = useTripStore();

  useEffect(() => {
    fetchTrips();
  }, []);

  const upcomingTrips = trips.filter(trip => trip.startDate > new Date());
  const pastTrips = trips.filter(trip => trip.endDate < new Date());
  const currentTrips = trips.filter(
    trip => trip.startDate <= new Date() && trip.endDate >= new Date()
  );

  return {
    trips,
    currentTrip,
    upcomingTrips,
    pastTrips,
    currentTrips,
    loading,
    error,
    fetchTrips,
    addTrip,
    updateTrip,
    deleteTrip,
    setCurrentTrip,
  };
};