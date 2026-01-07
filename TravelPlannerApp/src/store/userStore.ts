import { create } from 'zustand';
import { User, UserPreferences } from '@types/user';
import { StorageService } from '@services/storage';

interface UserState {
  user: User | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  language: 'en',
  notifications: true,
  theme: 'light',
};

const USER_STORAGE_KEY = '@travel_planner_user';
const PREFERENCES_STORAGE_KEY = '@travel_planner_preferences';

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  preferences: DEFAULT_PREFERENCES,
  isAuthenticated: false,
  loading: false,
  error: null,

  setUser: (user) => {
    set({ user, isAuthenticated: true });
    StorageService.save(USER_STORAGE_KEY, user);
  },

  updateUser: async (updates) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    set({ user: updatedUser });
    await StorageService.save(USER_STORAGE_KEY, updatedUser);
  },

  updatePreferences: async (newPreferences) => {
    const currentPreferences = get().preferences;
    const updatedPreferences = { ...currentPreferences, ...newPreferences };

    set({ preferences: updatedPreferences });
    await StorageService.save(PREFERENCES_STORAGE_KEY, updatedPreferences);
  },

  logout: async () => {
    set({ user: null, isAuthenticated: false });
    await StorageService.remove(USER_STORAGE_KEY);
  },

  loadUser: async () => {
    set({ loading: true });
    try {
      const user = await StorageService.get<User>(USER_STORAGE_KEY);
      const preferences = await StorageService.get<UserPreferences>(
        PREFERENCES_STORAGE_KEY
      );

      set({
        user,
        preferences: preferences || DEFAULT_PREFERENCES,
        isAuthenticated: !!user,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to load user data', loading: false });
    }
  },
}));