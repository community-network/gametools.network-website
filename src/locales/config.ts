import { format, formatDistanceToNowStrict } from "date-fns";
import { de, enUS, es, fr, nl, ru, tr, zhCN } from "date-fns/locale";
import { registerLocale } from "i18n-iso-countries";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const locales = {
  "en-US": enUS,
  "tr-TR": tr,
  "zh-CN": zhCN,
  "nl-NL": nl,
  "de-DE": de,
  "ru-RU": ru,
  "fr-FR": fr,
  es: es,
};

const langFile = { "de-DE": "de_DE", "fr-FR": "fr_FR" };

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
  .init({
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default,
      format: function (value, fmt, lng) {
        if (!value || value === "" || value === undefined || value === null) {
          return "";
        }

        // format = date|mask
        const [type, mask] = fmt.split("|");
        if (type === "date") {
          return format(value, mask, { locale: locales[lng] });
        }
        if (type === "change") {
          return formatDistanceToNowStrict(value, { locale: locales[lng] });
        }
        if (type === "hourChange") {
          return formatDistanceToNowStrict(value, {
            locale: locales[lng],
            unit: "hour",
          });
        }
        return value;
      },
    },
  });

export const apiLanguage = {
  "zh-cn": "zh-tw",
  "nl-nl": "en-US",
  "tr-TR": "en-US",
  es: "es-es",
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

export const getLanguage = (): string => {
  let language = window.localStorage.i18nextLng.toLowerCase();
  if (language in apiLanguage) {
    language = apiLanguage[language];
  }
  return language;
};

export const getCurrentCountry = (): Promise<string> => {
  const language = window.localStorage.i18nextLng.toLowerCase();
  let country = "en";
  if (language in apiCountry) {
    country = apiCountry[language];
  }
  return import(`i18n-iso-countries/langs/${country}.json`).then(
    (countries) => {
      registerLocale(countries);
      return country;
    },
  );
};

export default i18n;
