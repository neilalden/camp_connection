import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setCurrentLead } from "@/services/redux/slice/leads"
import { setActivities } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { BedType, ArgFunction, ActivityType, AppointmentType, ActivityScheduleType, DiagramType, ItemType } from "@/types"
import { arrayToMap, getDays, getNumberWithOrdinal, IDGenerator, trunc } from "@/utils/functions"
import { months, weekdays, weekdaysFull } from "@/utils/variables"
import { group } from "console"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DateInput from "./DateInput"
import styles from "./ActivityCard.module.css"
import DiagramPicker from "./setupcamp/components/DiagramPicker"
import ItemsSetup from "./setupcamp/components/ItemsSetupComponent"
import TimeInput from "./TimeInput"
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import DropDown from "./DropDown"
import Colors from "@/common/colors"


const ActivityCard = ({ activity, appointment }: { activity: ActivityType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const DiagramStyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const ItemStyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.itemStyles)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const Activities = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    if (!CurrentGroup || !CurrentAppointment || !CurrentAppointment.checkInDate || !CurrentAppointment.checkOutDate) return null
    const CheckInDate = new Date(CurrentAppointment.checkInDate);
    const CheckOutDate = new Date(CurrentAppointment.checkOutDate);
    const AppointmentsInThisSched = Appointments.filter((a) =>
    // @ts-ignore 
    ((new Date(CurrentAppointment.checkOutDate) >= new Date(a?.checkInDate) && (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate)))
        && a.retreatCenterId === RetreatCenter.id
    )).concat(CurrentAppointment)

    const ActivityAppointmentData = AppointmentsInThisSched.find(ap => ap.activitySchedule.find(sched => sched.activities.some(mr => mr.id === activity.id)))
    const ActivityScheduleData = ActivityAppointmentData?.activitySchedule.find(sched => sched.activities.some(mr => mr.id === activity.id))
    const ActivityData = ActivityScheduleData?.activities.find(mr => mr.id === activity.id)

    const occupiedBy = AppointmentsInThisSched.find(app => app.activitySchedule.some(sched => sched.activities.some(mr => mr.id === activity.id)))
    const occupyingGroup = CamperGroups.find(cg => cg.id === occupiedBy?.groupId)
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState<{ day: boolean }>()
    const updateActivity = () => {
        if (!activity.capacity) return;
        if (ActivityAppointmentData && ActivityAppointmentData?.groupId !== CurrentAppointment.groupId) return

        const found = CurrentAppointment.activitySchedule.find(sched => sched.activities.some(mr => mr.id === activity.id))
        const data: AppointmentType = {
            ...CurrentAppointment,
            activitySchedule: !!found ?
                CurrentAppointment.activitySchedule.map(sched => ({ ...sched, activities: sched.activities.filter(mr => mr.id !== activity.id) })) :
                CurrentAppointment.activitySchedule.length > 0 ?
                    CurrentAppointment.activitySchedule.map(sched => ({ ...sched, activities: [...sched.activities, activity] })) :
                    [{
                        scheduleId: IDGenerator(),
                        checkInDate: CurrentAppointment?.checkInDate,
                        checkInTime: '10:00',
                        checkOutTime: '11:00',
                        groupId: CurrentAppointment.groupId,
                        activities: [activity],
                    }]
        }
        dispatch(updateAppointment(data))
        dispatch(setCurrentLead(data))
    }
    const updateSchedule = (newSched: ActivityScheduleType) => {
        if (!activity.capacity) return;
        if (ActivityAppointmentData?.groupId !== CurrentAppointment.groupId) return
        const data: AppointmentType = {
            ...CurrentAppointment,
            activitySchedule: CurrentAppointment.activitySchedule.map(sched => sched.scheduleId === newSched.scheduleId ? newSched : sched)
        }
        dispatch(updateAppointment(data))
        dispatch(setCurrentLead(data))
    }
    const DAYS = useMemo(() => {
        if (CurrentAppointment?.checkInDate && CurrentAppointment?.checkOutDate)
            return getDays({
                start: new Date(CurrentAppointment?.checkInDate),
                end: new Date(CurrentAppointment?.checkOutDate)
            })
        else return []
    }, [CurrentAppointment])
    useEffect(() => {
        // @ts-ignore
        setShow(DAYS.reduce((result, item, index, array) => {
            // @ts-ignore
            result[String(item.getDay())] = true;
            return result
        }, {}))
    }, [DAYS])
    return (
        <div>
            <button type="button" className={styles.collapsableSection} onClick={(e) => setOpen(prev => !prev)}>
                <h3>{activity.name}</h3>
                <Image alt="chevron down" src={open ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>

            {
                open ? (
                    <div className={styles.setUpContainer}>
                        <div className="row-between">
                            <h5>Group Size: {CurrentGroup.groupSize}</h5>
                            <h5>Capacity: {activity.capacity}</h5>
                            <h5>Duration: {activity.duration.time} {activity.duration.interval}</h5>
                        </div>
                        {
                            DAYS.map((day, i) => {
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            width: "100%",
                                            minHeight: "10px",
                                            border: `1px solid ${Colors.cascade200}`,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: "10px 0 0 0",
                                        }}
                                        // @ts-ignore
                                        onClick={() => setShow(prev => ({ ...prev, [String(day.getDay())]: !prev[String(day.getDay())] }))}
                                    >
                                        <p style={{ padding: "10px 0", color: Colors.cascade400 }}>{weekdaysFull[day.getDay()]}, {getNumberWithOrdinal(day.getDay())}</p>
                                        {

                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : null
            }
        </div >
    )
}

export default ActivityCard;