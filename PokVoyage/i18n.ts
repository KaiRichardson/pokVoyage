import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './app/i18n/locales/en.json';
import ja from './app/i18n/locales/ja.json';

// Ensure translations are loaded
const resources = {
  en: {
    translation: en
  },
  ja: { translation: ja }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: true,
  react: {
    useSuspense: false,
  },
  defaultNS: 'translation',
  ns: ['translation'],
});

// Add a listener to log translation issues
i18n.on('missingKey', (lng, ns, key, fallbackValue) => {
  console.warn(`Missing translation key: ${key} for language: ${lng}`);
});

export default i18n; 