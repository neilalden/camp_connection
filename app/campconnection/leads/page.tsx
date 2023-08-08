"use client"
import LeadsColumn from "@/components/LeadsColumn"
import styles from "./styles.module.css"
import CalendarNavigation from "@/components/CalendarNavigation"
import { CSSProperties, useEffect, useRef, useState } from "react"
import SimpleCalendar from "@/components/SimpleCalendar"
import { AppointmentType, RetreatCenterType } from "@/types"
import { arrayToMap, ObjectToArray, onDragOver, trunc } from "@/utils/functions"
import Image from "next/image"
import Images from "@/common/images"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/services/redux/store"
import AppointmentModal from "@/components/AppointmentModal"
import { setDraggedLead } from "@/services/redux/slice/leads"
type ExtraType = { distance?: number }
const Leads = () => {
    const dispatch = useDispatch()
    const retreatCenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
    const retreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.bedStyles)


    const [rerenderingRetreatCenters, setRerenderingRetreatCenters] = useState<Array<RetreatCenterType & ExtraType>>(retreatCenters)
    const [date, setDate] = useState(new Date())
    const [currentAppointment, setCurrentAppointment] = useState<AppointmentType>();
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const onDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        // const parsed: any = JSON.parse(widgetType)
    }
    const customOnDrag = ({ event, data }: { event: React.DragEvent, data: AppointmentType }) => {
        const widgetType = JSON.stringify(data);
        event.dataTransfer.setData("widgetType", widgetType);
        setCurrentAppointment(data)
        dispatch(setDraggedLead(data))
        if (data && data.zipCode) {
            let copy = rerenderingRetreatCenters.map(rc => ({ ...rc, distance: Math.abs(Number(rc.zipCode) - Number(data.zipCode)) }))
            setRerenderingRetreatCenters(copy.sort((a, b) => {
                if (!data.zipCode) return 0
                if (!a.zipCode || !b.zipCode) return 0;
                if (!a.capacity || !b.capacity) return 0
                if (data.groupSize && data.groupSize > b.capacity) return -1
                if (Math.abs(data.zipCode - Number(a.zipCode)) > Math.abs(data.zipCode - Number(b.zipCode))) return 1;
                if (Math.abs(data.zipCode - Number(a.zipCode)) < Math.abs(data.zipCode - Number(b.zipCode))) return -1;
                return 0
            }))
        }
    }
    const clickLead = (appointment: AppointmentType) => {
        setCurrentAppointment(appointment)
        setModalIsVisible(true)
    }

    return (
        <div className={styles.container}>
            {modalIsVisible ? <AppointmentModal setIsVisible={setModalIsVisible} appointment={currentAppointment} /> : null}
            <div className={styles.leadColumn}>

                <LeadsColumn customOnDrag={customOnDrag} leadCardOnClick={clickLead} showZipCode />
            </div>

            <div className={styles.calendarColumn}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <CalendarNavigation date={date} setDate={setDate} />
                <div className={styles.retreatCenterCardContainer}>
                    {
                        rerenderingRetreatCenters.map((retreatCenter, i) => {
                            const logo = retreatCenter.photo ? retreatCenter.photo : Images["ic_logo"]
                            const capacity = retreatCenter.housing.buildings?.reduce((accum, building) =>
                                [...building.rooms ?? []].reduce((accu, room) =>
                                    room.beds?.reduce((acc, bed) => acc + (arrayToMap({ array: retreatCenter.bedStyles ?? [], key: "id" }).get(bed.id)?.capacity * bed.amount), accu), accum), 0)
                            const capacityClass = currentAppointment?.groupSize && capacity && currentAppointment.groupSize > capacity ? styles.capacityDanger : styles.capacity

                            return (
                                <div key={i} className={styles.retreatCenterCard}>
                                    <div className="row">
                                        <Image alt={retreatCenter.name} src={logo} height={120} width={120} className={styles.campLogo} />
                                        <div className={styles.detailsContainer}>
                                            <p className={styles.groupName}>{trunc(retreatCenter.name, 25)}</p>
                                            <p className={capacityClass}>Max Capacity : {isNaN(Number(capacity)) ? 0 : capacity} People</p>
                                            {retreatCenter.distance ? <p className={styles.distanceFrom}>{Number(retreatCenter.distance) / 10} miles away</p> : null}
                                            <p className={styles.capacity} style={{ marginTop: 10 }}>Beds Available : </p>
                                            <div className={styles.bedsContainer}>
                                                {
                                                    retreatCenter.bedStyles.map((bedstyle, ind) => <p key={ind} className={styles.bedText}>{bedstyle.name + ": " + bedstyle.capacity}</p>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.amenities}>
                                        {

                                            retreatCenter.amenities.activities && retreatCenter.amenities.activities.map((act, ind) => {
                                                return (
                                                    <div key={ind}>
                                                        <Image alt={act.name} src={Images[`ic_${act.class}`]} height={30} width={30} className={styles.amenityLogo} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className={styles.calendarContainer}>
                                        <SimpleCalendar date={date} RetreatCenter={retreatCenters.find(rc => rc.id === retreatCenter.id) ?? retreatCenters[i]} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}


export default Leads