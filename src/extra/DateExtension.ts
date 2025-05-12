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
        formatDate(lang: string, t: any): string
        formDate(lang: string, t: any): string
    }
}

Date.prototype.formatDate = function (lang: string, t: any): string {
    const day = this.getDate()
    const monthIndex = this.getMonth()
    const year = this.getFullYear()
    const month = mongthTr[lang as "uz_ru" | "uz" | "ru" | "en"].months[monthIndex]

    return t("dateFormat", { day, month, year })
}

Date.prototype.formDate = function (lang: string, t: any): string {
    const day = this.getDate()
    const monthIndex = this.getMonth()
    const year = this.getFullYear()
    const month = mongthTr[lang as "uz_ru" | "uz" | "ru" | "en"].months[monthIndex]

    return t("dateForm", { day, month, year })
}

export { }
