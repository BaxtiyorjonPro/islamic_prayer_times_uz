import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uzRuTranslation from './assets/translations/uz_ru/translation.json'
import uzTranslation from './assets/translations/uz/translation.json'
import ruTranslation from './assets/translations/ru/translation.json'
import enTranslation from './assets/translations/en/translation.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            uz_ru: {
                translation: uzRuTranslation,
            },
            uz: {
                translation: uzTranslation,
            },
            ru: {
                translation: ruTranslation,
            },
            en: {
                translation: enTranslation,
            },
        },
        fallbackLng: localStorage.getItem('lang') || 'uz_ru',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
