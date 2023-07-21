"use client"
import LeadsColumn from "@/components/LeadsColumn"
import styles from "./styles.module.css"
import CalendarNavigation from "@/components/CalendarNavigation"
import { CSSProperties, useState } from "react"
import SimpleCalendar from "@/components/SimpleCalendar"
import { RetreatCenterSsampleData, RetreatCenterType } from "@/utils/sampleData"
import { AppointmentType } from "@/types"
import { sortArrayOfObjects, trunc } from "@/utils/functions"
import Image from "next/image"
import Images from "@/common/images"
type ExtraType = { distance?: number }
const BookPage = () => {
    const retreatCenters: Array<RetreatCenterType & ExtraType> = RetreatCenterSsampleData
    const [rerenderingRetreatCenters, setRerenderingRetreatCenters] = useState<Array<RetreatCenterType & ExtraType>>(retreatCenters)
    const [date, setDate] = useState(new Date())
    const [currentAppointment, setCurrentAppointment] = useState<AppointmentType>()
    const onDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        const parsed: any = JSON.parse(widgetType)
    }
    const onDragOver = (e: React.DragEvent) => e.preventDefault();
    const customOnDrag = ({ event, data }: { event: React.DragEvent, data: AppointmentType }) => {
        const widgetType = JSON.stringify(data);
        event.dataTransfer.setData("widgetType", widgetType);
        setCurrentAppointment(data)
        if (data && data.zipCode) {
            let copy = retreatCenters.map(rc => ({ ...rc, distance: Math.abs(rc.zipCode - Number(data.zipCode)) }))
            setRerenderingRetreatCenters(copy.sort((a, b) => {
                if (!data.zipCode) return 0
                if (!a.capacity || !b.capacity) return 0
                if (data.groupSize && data.groupSize > b.capacity) return -1
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
                            const logo = typeof retreatCenter.image === "string" ? { uri: retreatCenter.image } : Images["ic_logo"]
                            const capacityClass = currentAppointment?.groupSize && retreatCenter.capacity && currentAppointment.groupSize > retreatCenter.capacity ? styles.capacityDanger : styles.capacity
                            return (
                                <div key={i} className={styles.retreatCenterCard}>
                                    <div className="row">
                                        <Image alt={retreatCenter.name} src={logo} height={120} width={120} className={styles.campLogo} />
                                        <div className={styles.detailsContainer}>
                                            <p className={styles.groupName}>{trunc(retreatCenter.name, 32)}</p>
                                            <p className={capacityClass}>Max Capacity : {retreatCenter.capacity} People</p>
                                            {retreatCenter.distance ? <p className={styles.distanceFrom}>{Number(retreatCenter.distance) / 10} miles away</p> : null}
                                            <p className={[styles.capacity, styles.bedsContainer].join(" ")}>Beds Available : </p>
                                            <div className={"row-between"}>
                                                <p className={styles.bedText}>King: 4</p>
                                                <p className={styles.bedText}>Queenn: 6</p>
                                            </div>
                                            <div className="row-between">
                                                <p className={styles.bedText}>Double: 4</p>
                                                <p className={styles.bedText}>Single: 8</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.amenities}>
                                        {
                                            retreatCenter.amenities.activities && retreatCenter.amenities.activities.map((act, i) => {
                                                return (
                                                    <div key={i}>
                                                        <Image alt={act.name} src={Images[`ic_${act.class}`]} height={30} width={30} className={styles.amenityLogo} />

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className={styles.calendarContainer}>
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