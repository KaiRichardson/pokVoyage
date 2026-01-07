import { create } from 'zustand';
import { Notification, NotificationType } from '@types/notification';
import { StorageService } from '@services/storage';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  loadNotifications: () => Promise<void>;
}

const NOTIFICATIONS_STORAGE_KEY = '@travel_planner_notifications';

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  addNotification: async (notificationData) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    const notifications = [newNotification, ...get().notifications];
    const unreadCount = notifications.filter((n) => !n.read).length;

    set({ notifications, unreadCount });
    await StorageService.save(NOTIFICATIONS_STORAGE_KEY, notifications);
  },

  markAsRead: async (id) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    const unreadCount = notifications.filter((n) => !n.read).length;

    set({ notifications, unreadCount });
    await StorageService.save(NOTIFICATIONS_STORAGE_KEY, notifications);
  },

  markAllAsRead: async () => {
    const notifications = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications, unreadCount: 0 });
    await StorageService.save(NOTIFICATIONS_STORAGE_KEY, notifications);
  },

  deleteNotification: async (id) => {
    const notifications = get().notifications.filter((n) => n.id !== id);
    const unreadCount = notifications.filter((n) => !n.read).length;

    set({ notifications, unreadCount });
    await StorageService.save(NOTIFICATIONS_STORAGE_KEY, notifications);
  },

  clearAll: async () => {
    set({ notifications: [], unreadCount: 0 });
    await StorageService.remove(NOTIFICATIONS_STORAGE_KEY);
  },

  loadNotifications: async () => {
    set({ loading: true });
    try {
      const notifications = await StorageService.get<Notification[]>(
        NOTIFICATIONS_STORAGE_KEY
      );
      const notificationList = notifications || [];
      const unreadCount = notificationList.filter((n) => !n.read).length;

      set({ notifications: notificationList, unreadCount, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));