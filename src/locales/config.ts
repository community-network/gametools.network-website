import i18n from 'i18next';
import translationEN from './en/translation.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  "en-US": {
    translation: translationEN,
  },
} as const;

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: "en-US"
});