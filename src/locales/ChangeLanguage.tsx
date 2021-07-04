import React from "react";
import { useTranslation } from "react-i18next";
import { SelectSecondary } from "../components/Materials";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const getLanguage = () => window.localStorage.i18nextLng;

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <SelectSecondary value={getLanguage()} onChange={changeLanguage}>
      <option value="en-US">English</option>
      <option value="ru-RU">Russian</option>
      <option value="zh-CN">简体中文</option>
      <option value="nl-NL">Nederlands</option>
    </SelectSecondary>
  );
};

export default LanguageSelector;
