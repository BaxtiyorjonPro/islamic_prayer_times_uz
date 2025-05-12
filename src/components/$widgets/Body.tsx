import { useTranslation } from "react-i18next"
import "../../App.css"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import DailyCard from "./DailyCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { translateCityAllLangs } from "../../extra/RealLocationFinder"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Skeleton } from "../ui/skeleton"
import { parse } from 'date-fns'

const Body = () => {
    const { t, i18n } = useTranslation()

    const lsLocation = localStorage.getItem('location')
    const dataTr = translateCityAllLangs(lsLocation ? JSON.parse(lsLocation).uzCity : "Toshkent")[i18n.language]

    const now = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(now.getDate() + 1)

    const [times, setTimes] = useState<any>()
    const [nextTimes, setNextTimes] = useState<any>()
    const [week, setWeek] = useState<any>()

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

    const fetchWeeklyData = async () => {
        await axios.get(`https://islomapi.uz/api/present/week?region=${lsLocation ? JSON.parse(lsLocation).uzCity : "Toshkent"}`)
            .then(e => {
                setWeek(e.data)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchTodayData()
        fetchTomorrowData()
        fetchWeeklyData()
    }, [])

    return (
        <div>
            <div className="text-black dark:text-white  text-3xl px-4 py-8">{t('current_location', { name: `${dataTr.region}, ${dataTr.city}` })}</div>
            <Tabs className="w-12/12 items-center" defaultValue="daily">
                <TabsList className="w-3/6">
                    <TabsTrigger value="daily" className="text-xl cursor-pointer">{t('daily')}</TabsTrigger>
                    <TabsTrigger value="weekly" className="text-xl cursor-pointer">{t('weekly')}</TabsTrigger>
                    <TabsTrigger value="monthly" className="text-xl cursor-pointer">{t('monthly')}</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="w-10/12 items-center">
                    <DailyCard times={times} nextTimes={nextTimes} now={now} tomorrow={tomorrow} />
                </TabsContent>
                <TabsContent value="weekly" className="w-10/12 items-center">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-lg">
                                <TableHead>{t('date')}</TableHead>
                                <TableHead>{t('times.tong_saharlik')}</TableHead>
                                <TableHead>{t('times.quyosh')}</TableHead>
                                <TableHead>{t('times.peshin')}</TableHead>
                                <TableHead>{t('times.asr')}</TableHead>
                                <TableHead>{t('times.shom_iftor')}</TableHead>
                                <TableHead>{t('times.hufton')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {week ? week.map((e: any) => {
                                const date = parse(e.date, "dd/MM/yyyy, HH:mm:ss", new Date())
                                const isToday = date.toLocaleDateString() == new Date().toLocaleDateString()
                                return (
                                    <TableRow className={isToday ? "dark:bg-[#222222] bg-[#f5f5f5]" : ""} >
                                        <TableCell className="font-bold">{date.formDate(i18n.language, t)}</TableCell>
                                        <TableCell>{e.times.tong_saharlik}</TableCell>
                                        <TableCell>{e.times.quyosh}</TableCell>
                                        <TableCell>{e.times.peshin}</TableCell>
                                        <TableCell>{e.times.asr}</TableCell>
                                        <TableCell>{e.times.shom_iftor}</TableCell>
                                        <TableCell>{e.times.hufton}</TableCell>
                                    </TableRow>
                                )
                            }) : <Skeleton />}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Body
