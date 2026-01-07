import { useState, useEffect } from 'react';
import { StorageService } from '@services/storage';

export const useStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredValue();
  }, [key]);

  const loadStoredValue = async () => {
    try {
      const value = await StorageService.get<T>(key);
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (error) {
      console.error('Error loading stored value:', error);
    } finally {
      setLoading(false);
    }
  };

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await StorageService.save(key, value);
    } catch (error) {
      console.error('Error saving value:', error);
    }
  };

  const removeValue = async () => {
    try {
      setStoredValue(initialValue);
      await StorageService.remove(key);
    } catch (error) {
      console.error('Error removing value:', error);
    }
  };

  return { storedValue, setValue, removeValue, loading };
};