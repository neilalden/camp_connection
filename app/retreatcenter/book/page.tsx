"use client"
import LeadsColumn from "@/components/LeadsColumn"
import styles from "./styles.module.css"
import CalendarNavigation from "@/components/CalendarNavigation"
import { useState } from "react"
import SimpleCalendar from "@/components/SimpleCalendar"
import { RetreatCenterSsampleData, RetreatCenterType } from "@/utils/sampleData"
import { AppointmentType } from "@/types"
import { sortArrayOfObjects } from "@/utils/functions"
const BookPage = () => {
    const [date, setDate] = useState(new Date())
    const retreatCenters: Array<RetreatCenterType> = RetreatCenterSsampleData
    const [rerenderingRetreatCenters, setRerenderingRetreatCenters] = useState<Array<RetreatCenterType>>(retreatCenters)
    const onDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        const parsed: any = JSON.parse(widgetType)
    }
    const onDragOver = (e: React.DragEvent) => e.preventDefault();
    const customOnDrag = ({ event, data }: { event: React.DragEvent, data: AppointmentType }) => {
        const widgetType = JSON.stringify(data);
        event.dataTransfer.setData("widgetType", widgetType);
        if (data && data.zipCode) {
            let copy = [...retreatCenters];
            setRerenderingRetreatCenters(copy.sort((a: RetreatCenterType, b: RetreatCenterType) => {
                if (!data.zipCode) return 0
                if (Math.abs(data.zipCode - a.zipCode) > Math.abs(data.zipCode - b.zipCode)) return 1;
                if (Math.abs(data.zipCode - a.zipCode) < Math.abs(data.zipCode - b.zipCode)) return -1;
                return 0
            }))
        }
    }

    return (
        <div className={styles.container}>
            <LeadsColumn customOnDrag={customOnDrag} />
            <div className={styles.calendarColumn}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <CalendarNavigation date={date} setDate={setDate} />
                <div className={styles.retreatCenterCardContainer}>
                    {
                        rerenderingRetreatCenters.map((retreatCenter, i) => {
                            return (
                                <div key={i} className={styles.retreatCenterCard}>
                                    <div className={styles.calendarContainer}>
                                        <p>{retreatCenter.name}</p>
                                        <p>{retreatCenter.zipCode}</p>
                                        <SimpleCalendar date={date} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default BookPage