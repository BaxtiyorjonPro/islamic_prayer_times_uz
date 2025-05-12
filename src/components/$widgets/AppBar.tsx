import "../../index.css"
import "../../App.css"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { useTranslation } from "react-i18next"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useTheme } from "../ThemeProvider"
import LocationChange from "./LocationChange"


const AppBar = ({ setRnd }: { setRnd: any }) => {
    const { t, i18n } = useTranslation()
    const { setTheme, theme } = useTheme()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lang', lang)
    }

    const changeTheme = (checked: boolean) => {
        if (checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div className="h-20 px-4 bg-[#F5F5F5] dark:bg-[#000000]" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="text-4xl text-black dark:text-[#00ff00]" style={{ fontFamily: "Khalid, \"Caveat\", sans-serif" }}>{t('prayer_times')}</div>
            <div style={{ display: "flex", gap: "1rem" }}>
                <Select defaultValue={i18n.language} onValueChange={(e) => changeLanguage(e)}>
                    <SelectTrigger className="w-[180px] text-black dark:text-white" >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="uz_ru">Ўзбек</SelectItem>
                        <SelectItem value="uz">O'zbek</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                    <Switch className="cursor-pointer" id="dark-light" onCheckedChange={(e) => changeTheme(e)} checked={theme == "dark"} />
                    <Label htmlFor="dark-light">{t('dark_mode')}</Label>
                </div>
                <LocationChange setRnd={setRnd} />
            </div>
        </div>
    )
}

export default AppBar
