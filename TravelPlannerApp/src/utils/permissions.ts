import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Calendar from 'expo-calendar';
import { Alert, Linking } from 'react-native';

export const permissions = {
  requestLocation: async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Location permission is needed to show nearby destinations.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  },

  requestCamera: async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is needed to take photos.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  },

  requestMediaLibrary: async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Media Library Permission',
          'Media library permission is needed to select photos.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting media library permission:', error);
      return false;
    }
  },

  requestCalendar: async (): Promise<boolean> => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Calendar Permission',
          'Calendar permission is needed to sync your trips.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting calendar permission:', error);
      return false;
    }
  },
};