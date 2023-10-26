import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { format, formatDistanceToNowStrict } from "date-fns";
import { enUS, tr, zhCN, nl, ru, de } from "date-fns/locale";
import { registerLocale } from "i18n-iso-countries";
import resourcesToBackend from "i18next-resources-to-backend";

const locales = {
  "en-US": enUS,
  "tr-TR": tr,
  "zh-CN": zhCN,
  "nl-NL": nl,
  "de-DE": de,
  "ru-RU": ru,
};

i18n
  .use(resourcesToBackend((language) => import(`./languages/${language}.json`)))
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
        return value;
      },
    },
  });

export const apiLanguage = {
  "zh-cn": "zh-tw",
  "nl-nl": "en-US",
  "tr-TR": "en-US",
};

export const apiCountry = {
  "en-us": "en",
  "zh-cn": "zh",
  "nl-nl": "nl",
  "tr-tr": "tr",
  "ru-ru": "ru",
  "de-de": "de",
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
