import provinces from "../assets/translations/provinces.json"

type ProvinceData = {
    [key: string]: {
        [region: string]: string[]
    }
}
const data: ProvinceData = provinces

export function findUzByCity(lang: string, city: string): { uzRegion: string; uzCity: string } {

    if (!data[lang] || !data["uz"]) {
        throw new Error("Kiritilgan til yoki 'uz' bo'limi mavjud emas.")
    }

    const langRegions = data[lang]
    const uzRegions = data["uz"]

    for (const [regionName, cities] of Object.entries(langRegions)) {
        const cityIndex = cities.indexOf(city)
        if (cityIndex !== -1) {
            const langRegionNames = Object.keys(langRegions)
            const uzRegionNames = Object.keys(uzRegions)

            const regionIndex = langRegionNames.indexOf(regionName)
            const uzRegion = uzRegionNames[regionIndex]
            const uzCity = uzRegions[uzRegion][cityIndex]

            return { uzRegion, uzCity }
        }
    }

    return { uzRegion: "Toshkent", uzCity: "Toshkent" }
}

export function translateCityAllLangs(uzCity: string): {
    [lang: string]: { region: string; city: string }
} {
    const uzLang = data["uz"]
    if (!uzLang) {
        throw new Error("'uz' tilidagi ma'lumotlar topilmadi")
    }

    const uzRegionKeys = Object.keys(uzLang)
    let regionIndex = 0
    let cityIndex = 0
    let found = false

    for (let r = 0; r < uzRegionKeys.length; r++) {
        const cities = uzLang[uzRegionKeys[r]]
        const c = cities.indexOf(uzCity)
        if (c !== -1) {
            regionIndex = r
            cityIndex = c
            found = true
            break
        }
    }

    if (!found) {
        regionIndex = 0
        cityIndex = 0
    }

    const result: { [lang: string]: { region: string; city: string } } = {}

    for (const lang in data) {
        const regions = Object.keys(data[lang])
        const region = regions[regionIndex]
        const city = data[lang][region][cityIndex]
        result[lang] = { region, city }
    }

    return result
}