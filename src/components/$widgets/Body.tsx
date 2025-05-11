import { useTranslation } from "react-i18next"
import "../../App.css"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import DailyCard from "./DailyCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { translateCityAllLangs } from "../../extra/RealLocationFinder"

const Body = () => {
    const { t, i18n } = useTranslation()

    const lsLocation = localStorage.getItem('location')
    const dataTr = translateCityAllLangs(lsLocation ? JSON.parse(lsLocation).uzCity : "Toshkent")[i18n.language]

    const now = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(now.getDate() + 1)

    const [times, setTimes] = useState<any>()
    const [nextTimes, setNextTimes] = useState<any>()

    const fetchTodayData = async () => {
        await axios.get(`https://islomapi.uz/api/present/day?region=${lsLocation ? JSON.parse(lsLocation).uzCity : "Toshkent"}`)
            .then(e => {
                setTimes(e.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const fetchTomorrowData = async () => {
        await axios.get(`https://islomapi.uz/api/daily?region=${lsLocation ? JSON.parse(lsLocation).uzCity : "Toshkent"}&month=${tomorrow.getMonth() + 1}&day=${tomorrow.getDate()}`)
            .then(e => {
                setNextTimes(e.data)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchTodayData()
        fetchTomorrowData()
    }, [])

    return (
        <div>
            <div className="text-black dark:text-white  text-3xl px-4 py-8">{t('current_location', { name: `${dataTr.region}, ${dataTr.city}` })}</div>
            <Tabs className="w-12/12 items-center" defaultValue="daily">
                <TabsList className="w-3/6">
                    <TabsTrigger value="daily" className="text-xl cursor-pointer">{t('daily')}</TabsTrigger>
                    <TabsTrigger value="monthly" className="text-xl cursor-pointer">{t('weekly')}</TabsTrigger>
                    <TabsTrigger value="yearly" className="text-xl cursor-pointer">{t('monthly')}</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="w-10/12 items-center">
                    <DailyCard times={times} nextTimes={nextTimes} now={now} tomorrow={tomorrow} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Body
