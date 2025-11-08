import * as React from "react";
import { useTranslation } from "react-i18next";

// stop it from removing react import
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
React.version;

const LanguageSelector = (): React.ReactElement => {
  const { i18n } = useTranslation();
  const changeLanguage = (event: { target: { value: string } }) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select
      aria-label="Select language"
      className="selectSecondary"
      value={i18n.language}
      onChange={changeLanguage}
    >
      <option value="en-US">English</option>
      <option value="zh-CN">繁體中文</option>
      <option value="zh-Hans">简体中文</option>
      <option value="tr-TR">Türkçe</option>
      <option value="ru-RU">Русский</option>
      <option value="de-DE">Deutsch</option>
      <option value="nl-NL">Nederlands</option>
      <option value="fr-FR">Français</option>
      <option value="es">Español</option>
    </select>
  );
};

export default LanguageSelector;
