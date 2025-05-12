import { useTranslation } from "react-i18next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import provinces from "../../assets/translations/provinces.json"
import { ScrollArea } from "../ui/scroll-area"
import { useState } from "react"
import { findUzByCity } from "../../extra/RealLocationFinder"

const LocationChange = ({ setRnd }: { setRnd: any }) => {
    const { t, i18n } = useTranslation()

    const [location, setLocation] = useState({
        region: "",
        city: ""
    })

    const dispose = () => {
        setLocation({
            region: "",
            city: ""
        })
    }


    const province = provinces[i18n.language as keyof typeof provinces]

    const changeLocation = () => {
        const data = findUzByCity(i18n.language, location.city)
        setRnd(new Date().getTime())
        localStorage.setItem('location', JSON.stringify(data))
        dispose()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger><Button style={{ cursor: "pointer" }}>{t('select_location')}</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="pb-4">Joylashuvingizni yoki unga yaqinroq joyni tanlang:</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="text-20 pb-4 text-black font-semibold">{location.city != "" && location.region != "" ? `Tanlangan joylashuv: ${location.region}, ${location.city}` : null}</div>
                        <ScrollArea className="h-[60vh] border-1 rounded-md px-3">
                            <Accordion type="single" collapsible className="w-full">
                                {Object.entries(province).map(([key, value], index) => (
                                    <AccordionItem value={index.toString()}>
                                        <AccordionTrigger className="text-black dark:text-white cursor-pointer">{key}</AccordionTrigger>
                                        {value.map(e => (
                                            <AccordionContent>
                                                <Button className="cursor-pointer" onClick={() => setLocation({ region: key, city: e })}>{e}</Button>
                                            </AccordionContent>
                                        ))}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" onClick={() => dispose()}>Bekor qilish</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" onClick={() => changeLocation()}>Tanlash</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LocationChange
