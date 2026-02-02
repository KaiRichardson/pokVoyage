import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USERS: '@pokvoyage_users',
  SESSION: '@pokvoyage_session',
  TRIPS: '@pokvoyage_trips',
} as const;

export async function getStoredUsers(): Promise<string> {
  try {
    const json = await AsyncStorage.getItem(KEYS.USERS);
    return json || '{}';
  } catch {
    return '{}';
  }
}

export async function saveUsers(usersJson: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.USERS, usersJson);
}

export async function getSession(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.SESSION);
}

export async function setSession(userId: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.SESSION, userId);
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.SESSION);
}

export async function getStoredTrips(): Promise<string> {
  const json = await AsyncStorage.getItem(KEYS.TRIPS);
  return json || '{}';
}

export async function saveTrips(tripsJson: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.TRIPS, tripsJson);
}
