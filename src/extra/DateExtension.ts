import { useTranslation } from 'react-i18next'

const mongthTr = {
    uz_ru: {
        months: [
            "январ",
            "феврал",
            "март",
            "апрел",
            "май",
            "июн",
            "июл",
            "август",
            "сентабр",
            "октябр",
            "ноябр",
            "декабр"
        ]
    },
    uz: {
        months: [
            "yanvar",
            "fevral",
            "mart",
            "aprel",
            "may",
            "iyun",
            "iyul",
            "avgust",
            "sentabr",
            "oktyabr",
            "noyabr",
            "dekabr"
        ]
    },
    ru: {
        months: [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря"
        ]
    },
    en: {
        months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    }
}


declare global {
    interface Date {
        formatDate(): string
    }
}

Date.prototype.formatDate = function (): string {
    const { t, i18n } = useTranslation()

    const lang = i18n.language as "uz" | "ru" | "en"

    const day = this.getDate()
    const monthIndex = this.getMonth()
    const year = this.getFullYear()

    const month = mongthTr[lang].months[monthIndex]

    return t('dateFormat', { day, month, year })
}

export { }
