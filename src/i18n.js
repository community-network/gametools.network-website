import i18next from 'i18next';

// Backend
import middleware from 'i18next-http-middleware';

// Frontend
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Translations
import translationDev from './locales/dev.json';


function init(i18) {
    i18.init({
        initImmediate: true,
        /* debug: true, */
        preload: ['en', 'dev'],
        resources: {
            dev: {
                translation: translationDev
            }
        }
    });
}

export function translateServer() {
    init(
        i18next
            .use(middleware.LanguageDetector)
    );
    return {
        translateHandle: middleware.handle(i18next, {
            removeLngFromUrl: false
        }),
        i18next
    };
}

export function translateClient() {
    init(
        i18next
            .use(LanguageDetector)
            .use(initReactI18next)
    );
}

