import { format as DateFormat, formatDistanceToNowStrict, type Locale } from "date-fns";
import { de, enUS, es, fr, nl, ru, tr, zhCN } from "date-fns/locale";
import { registerLocale, type LocaleData } from "i18n-iso-countries";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const locales: { [key: string]: Locale } = {
  "en-US": enUS,
  "tr-TR": tr,
  "zh-CN": zhCN,
  "nl-NL": nl,
  "de-DE": de,
  "ru-RU": ru,
  "fr-FR": fr,
  es: es,
};

const langFile: { [key: string]: string } = { "de-DE": "de_DE", "fr-FR": "fr_FR" };

i18n
  .use(
    resourcesToBackend((language: string) => {
      if (language in langFile) {
        language = langFile[language];
      }
      return import(`./languages/${language}.json`);
    }),
  )
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(() => ({
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default,
      format: function (value: any, format?: string, lng?: string) {
        if (!value || value === "" || value === undefined || value === null) {
          return "";
        }
        if (format !== undefined) {
          // format = date|mask
          const [type, mask] = format.split("|");
          if (type === "date") {
            return DateFormat(value, mask, { locale: locales[lng || ""] });
          }
          if (type === "change") {
            return formatDistanceToNowStrict(value, { locale: locales[lng || ""] });
          }
          if (type === "hourChange") {
            return formatDistanceToNowStrict(value, {
              locale: locales[lng || ""],
              unit: "hour",
            });
          }
        }
        return value;
      },
    },
  }));

export const apiLanguage: { [key: string]: string } = {
  "zh-cn": "zh-tw",
  "nl-nl": "en-US",
  "tr-TR": "en-US",
  es: "es-es",
};

export const getLanguage = (): string => {
  let language = window.localStorage.i18nextLng.toLowerCase();
  if (language in apiLanguage) {
    language = apiLanguage[language];
  }
  return language;
};

export const apiCountry = {
  "en-us": "en",
  "zh-cn": "zh",
  "nl-nl": "nl",
  "tr-tr": "tr",
  "ru-ru": "ru",
  "de-de": "de",
  "fr-fr": "fr",
  es: "es",
};
export const getCurrentCountry = (): Promise<string> => {
  const language = window.localStorage.i18nextLng.toLowerCase();

  const apiCountry: { [key: string]: [string, Promise<LocaleData>] } = {
    "en-us": ["en", import(`i18n-iso-countries/langs/en.json`)],
    "zh-cn": ["zh", import(`i18n-iso-countries/langs/zh.json`)],
    "nl-nl": ["nl", import(`i18n-iso-countries/langs/nl.json`)],
    "tr-tr": ["tr", import(`i18n-iso-countries/langs/tr.json`)],
    "ru-ru": ["ru", import(`i18n-iso-countries/langs/ru.json`)],
    "de-de": ["de", import(`i18n-iso-countries/langs/de.json`)],
    "fr-fr": ["fr", import(`i18n-iso-countries/langs/fr.json`)],
    es: ["es", import(`i18n-iso-countries/langs/es.json`)],
  };

  let country: [string, Promise<LocaleData>] = ["en", import(`i18n-iso-countries/langs/en.json`)];
  if (language in apiCountry) {
    country = apiCountry[language];
  }

  return country[1].then(
    (countries) => {
      registerLocale(countries);
      return country[0];
    },
  );
};

export default i18n;
