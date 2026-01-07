import { Alert, Linking, Share } from 'react-native';

export const helpers = {
  openURL: async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this URL');
    }
  },

  openEmail: (email: string, subject?: string, body?: string) => {
    let url = `mailto:${email}`;
    const params = [];

    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return helpers.openURL(url);
  },

  openPhone: (phoneNumber: string) => {
    return helpers.openURL(`tel:${phoneNumber}`);
  },

  openMaps: (latitude: number, longitude: number, label?: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}${label ? `&query_place_id=${encodeURIComponent(label)}` : ''
      }`;
    return helpers.openURL(url);
  },

  share: async (title: string, message: string, url?: string) => {
    try {
      const result = await Share.share({
        title,
        message: url ? `${message}\n\n${url}` : message,
        url,
      });

      return result.action === Share.sharedAction;
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
      return false;
    }
  },

  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  wait: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  retry: async <T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await helpers.wait(delay);
        return helpers.retry(fn, retries - 1, delay);
      }
      throw error;
    }
  },

  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, T[]>);
  },

  sortBy: <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  },

  uniqueBy: <T>(array: T[], key: keyof T): T[] => {
    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  },
};