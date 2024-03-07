import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import deTranslation from './thunder/de.json';
import enTranslation from './thunder/en.json';

export const translationResources = {
  de: {
    thunder: deTranslation,
  },
  en: {
    thunder: enTranslation,
  },
};

const i18n = createInstance({
  fallbackLng: 'en',
  debug: false,
  cleanCode: true,
  resources: translationResources,
  defaultNS: 'thunder',
});

i18n.use(initReactI18next).init();

export default i18n;
