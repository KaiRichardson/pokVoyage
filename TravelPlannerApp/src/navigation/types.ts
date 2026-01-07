import { Trip } from '@types/trip';

export type RootStackParamList = {
  MainTabs: undefined;
  TripDetail: { tripId: string };
  CreateTrip: undefined;
  EditTrip: { tripId: string };
  AddActivity: { tripId: string };
  AddAccommodation: { tripId: string };
  AddTransportation: { tripId: string };
};

export type TabParamList = {
  Home: undefined;
  Trips: undefined;
  Destinations: undefined;
  Profile: undefined;
};