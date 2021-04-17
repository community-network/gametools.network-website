import i18n from 'i18next';
import translationEN from './en/translation.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  "en-us": {
    translation: translationEN,
  },
} as const;

i18n.use(initReactI18next).use(LanguageDetector).init({
  lng: 'en-us',
  resources,
  fallbackLng: "en-us"
});