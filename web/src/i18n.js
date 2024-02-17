import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './Locale/en.json';
import arTranslations from './Locale/ar.json';

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: enTranslations
    },
    ar: {
      translation: arTranslations
    }
  }
});
export default i18n;
