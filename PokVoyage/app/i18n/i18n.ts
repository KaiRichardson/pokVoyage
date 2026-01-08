import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import ro from './locales/ro.json';
import es from './locales/es.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

// Ensure translations are loaded
const resources = {
  en: {
    translation: en
  },
  ja: {
    translation: ja
  },
  de: {
    translation: de
  },
  fr: {
    translation: fr
  },
  ro: {
    translation: ro
  },
  es: {
    translation: es
  },
  'zh-CN': {
    translation: zhCN
  },
  'zh-TW': {
    translation: zhTW
  }
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