import i18n from 'i18next';
import translationEN from './languages/en-US.json';
import translationRU from './languages/ru-RU.json';
import translationNL from './languages/ru-RU.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  "en-US": {
    translation: translationEN,
  },
  "ru-RU": {
    translation: translationRU
  },
  "nl-NL": {
    translation: translationNL
  }
} as const;

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: "en-US"
});