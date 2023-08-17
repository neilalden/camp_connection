"use client"
import LeadsColumn from "@/components/LeadsColumn"
import styles from "./styles.module.css"
import CalendarNavigation from "@/components/CalendarNavigation"
import { CSSProperties, useEffect, useRef, useState } from "react"
import SimpleCalendar from "@/components/SimpleCalendar"
import { ActivityType, AppointmentType, RetreatCenterType } from "@/types"
import { arrayToMap, ObjectToArray, onDragOver, removeDuplicates, trunc } from "@/utils/functions"
import Image from "next/image"
import Images from "@/common/images"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/services/redux/store"
import AppointmentModal from "@/components/AppointmentModal"
import { setCurrentLead } from "@/services/redux/slice/leads"
import { setCurrentCamperGroup } from "@/services/redux/slice/campergroups"
import { setRetreatCenter } from "@/services/redux/slice/retreatcenters"
type ExtraType = { distance?: number }
const Leads = () => {
    const dispatch = useDispatch()
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    const RetreatCenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)


    const [rerenderingRetreatCenters, setRerenderingRetreatCenters] = useState<Array<RetreatCenterType & ExtraType>>(RetreatCenters)
    const [date, setDate] = useState(new Date())
    const [currentAppointment, setCurrentAppointment] = useState<AppointmentType>();
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const onDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        // const parsed: any = JSON.parse(widgetType)
        dispatch(setCurrentLead(undefined))
        dispatch(setCurrentCamperGroup(undefined))
    }
    const customOnDrag = ({ event, data }: { event: React.DragEvent, data: AppointmentType }) => {
        const widgetType = JSON.stringify(data);
        event.dataTransfer.setData("widgetType", widgetType);
        const group = CamperGroups.find((cg) => cg.id === data.groupId);
        setCurrentAppointment(data)
        dispatch(setCurrentLead(data))
        dispatch(setCurrentCamperGroup(group))
        if (group && group.zipCode) {
            let copy = rerenderingRetreatCenters.map(rc => ({ ...rc, distance: Math.abs(Number(rc.zipCode) - Number(group.zipCode)) }))
            setRerenderingRetreatCenters(copy.sort((a, b) => {
                if (!group.zipCode) return 0
                if (!a.zipCode || !b.zipCode) return 0;
                if (!a.capacity || !b.capacity) return 0
                if (group.groupSize && group.groupSize > b.capacity) return -1
                if (Math.abs(group.zipCode - Number(a.zipCode)) > Math.abs(group.zipCode - Number(b.zipCode))) return 1;
                if (Math.abs(group.zipCode - Number(a.zipCode)) < Math.abs(group.zipCode - Number(b.zipCode))) return -1;
                return 0
            }))
        }
    }
    const clickLead = (appointment: AppointmentType) => {
        dispatch(setRetreatCenter(RetreatCenter))
        setCurrentAppointment(appointment)
        setModalIsVisible(true)
    }

    return (
        <div className={styles.container}>
            {modalIsVisible ? <AppointmentModal setIsVisible={setModalIsVisible} /> : null}
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
                            const logo = !!retreatCenter.photo ? retreatCenter.photo : Images["ic_logo"]
                            const capacity = retreatCenter.housing.buildings?.reduce((accum, building) =>
                                [...building.rooms ?? []].reduce((accu, room) =>
                                    room.beds?.reduce((acc, bed) => acc + (arrayToMap({ array: retreatCenter.bedStyles ?? [], key: "id" }).get(bed.id)?.capacity * bed.amount), accu), accum), 0) ?? 0
                            const group = CamperGroups.find((cg) => cg.id === currentAppointment?.groupId);
                            const capacityClass = group && group.groupSize > capacity ? styles.capacityDanger : styles.capacity
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
                                                    retreatCenter.bedStyles.map((bedstyle, ind) => <p key={ind} className={styles.bedText}>{bedstyle.name + ": " + bedstyle.amount}</p>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.amenities}>
                                        {

                                            retreatCenter.amenities.activities && retreatCenter.amenities.activities.map((act, ind) => {
                                                return (
                                                    <div key={ind} data-content={act.name} className="tooltip" >
                                                        <Image alt={act.name} src={Images[act.class]} height={30} width={30} className={styles.amenityLogo} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className={styles.calendarContainer} >
                                        <SimpleCalendar date={date} RetreatCenter={RetreatCenters.find(rc => rc.id === retreatCenter.id) ?? RetreatCenters[i]} />
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