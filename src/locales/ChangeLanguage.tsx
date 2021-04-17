import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()
  const getLanguage = () => window.localStorage.i18nextLng
  
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <select value={getLanguage()} onChange={changeLanguage}>
        <option value="en-US">English</option>
        <option value="ru-RU">Russian</option>
    </select>
  )
}

export default LanguageSelector