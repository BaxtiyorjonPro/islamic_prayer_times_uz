import "../../App.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"
import { useTranslation } from "react-i18next"
import '../../extra/DateExtension'

const DailyCard = ({ times, nextTimes, now, tomorrow }: { times: any; nextTimes: any, now: Date, tomorrow: Date }) => {
    const { t } = useTranslation()

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('todays_pray_times')}</CardTitle>
                <CardDescription>{now.formatDate()}</CardDescription>
            </CardHeader>
            <CardContent style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "1rem" }}>
                {times ? Object.entries(times.times).map(([key, value]) => (
                    <Card className="w-1/5 h-26" key={key}>
                        <CardHeader>
                            <CardTitle>{t(`times.${key}`)}</CardTitle>
                            <CardDescription className="text-2xl text-black dark:text-white font-bold">{value as string}</CardDescription>
                        </CardHeader>
                    </Card>
                )) : <Skeleton className="h-26 w-12/12" />}
            </CardContent>
            <Separator className="w-12/12" />
            <CardHeader>
                <CardTitle>{t('tomorrows_pray_times')}</CardTitle>
                <CardDescription>{tomorrow.formatDate()}</CardDescription>
            </CardHeader>
            <CardContent style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "1rem" }}>
                {nextTimes ? Object.entries(nextTimes.times).map(([key, value]) => (
                    <Card className="w-1/5 h-26" key={key}>
                        <CardHeader>
                            <CardTitle>{t(`times.${key}`)}</CardTitle>
                            <CardDescription className="text-2xl text-black dark:text-white font-bold">{value as string}</CardDescription>
                        </CardHeader>
                    </Card>
                )) : <Skeleton className="h-26 w-12/12" />}
            </CardContent>
        </Card>
    )
}

export default DailyCard
