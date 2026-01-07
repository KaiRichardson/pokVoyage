import { useState, useEffect } from 'react';
import { LocationService, LocationData } from '@services/location';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const loc = await LocationService.getCurrentLocation();
      setLocation(loc);
    } catch (err) {
      setError('Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  const geocodeAddress = async (address: string) => {
    setLoading(true);
    setError(null);

    try {
      const loc = await LocationService.geocode(address);
      setLocation(loc);
      return loc;
    } catch (err) {
      setError('Failed to geocode address');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    geocodeAddress,
  };
};