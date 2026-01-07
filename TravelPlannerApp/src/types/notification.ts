export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  data?: any;
}

export enum NotificationType {
  TRIP_REMINDER = 'Trip Reminder',
  BOOKING_CONFIRMATION = 'Booking Confirmation',
  WEATHER_ALERT = 'Weather Alert',
  PRICE_ALERT = 'Price Alert',
  GENERAL = 'General',
}