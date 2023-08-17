import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setCurrentLead, updateLead } from "@/services/redux/slice/leads"
import { setActivities } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { BedType, ArgFunction, ActivityType, AppointmentType, ActivityScheduleType, DiagramType, ItemType } from "@/types"
import { addDaysToDate, arrayToMap, getDays, getNumberWithOrdinal, getTimeBlocks, hourStringToDate, IDGenerator, trunc } from "@/utils/functions"
import { months, weekdays } from "@/utils/variables"
import Image from "next/image"
import { memo, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DateInput from "./DateInput"
import styles from "./ActivityCard.module.css"
import DiagramPicker from "./setupcamp/components/DiagramPicker"
import ItemsSetup from "./setupcamp/components/ItemsSetupComponent"
import TimeInput from "./TimeInput"
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import DropDown from "./DropDown"
import Colors from "@/common/colors"
import { DaysSampleData } from "@/utils/sampleData"


const ActivityCard = ({ activity }: { activity: ActivityType }) => {
    const dispatch = useDispatch()
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const Activities = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)

    const CurrentLead = useSelector((state: RootState) => state.Leads.currentLead)
    const CurrentAppointment = Appointments.find(ap => ap.id === CurrentLead?.id)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)

    if (!CurrentGroup || !CurrentAppointment || !CurrentAppointment.checkInDate || !CurrentAppointment.checkOutDate) return null

    const AppointmentsInThisSched = useMemo(() => Appointments.filter((a) =>
    // @ts-ignore 
    ((new Date(CurrentAppointment.checkOutDate) >= new Date(a?.checkInDate) && (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate)))
        && a.retreatCenterId === RetreatCenter.id
    )).concat(CurrentAppointment), [Appointments, CurrentAppointment])

    const appointmentWithThisActivity = useMemo(() => AppointmentsInThisSched.filter(app => app.activitySchedule.some(sched => sched.activity.id === activity.id)), [AppointmentsInThisSched])
    // const unassignedGuests = Number(CurrentGroup?.groupSize) - CurrentAppointment.activitySchedule.reduce((accu, shed) => accu + shed.activity.capacity, 0)
    const unassignedGuests = Number(CurrentGroup?.groupSize) - Number(CurrentAppointment?.activitySchedule.reduce((accu, shed) => accu + shed.activity.capacity, 0))
    const DAYS = useMemo(() => {
        if (CurrentAppointment?.checkInDate && CurrentAppointment?.checkOutDate)
            return getDays({
                start: new Date(CurrentAppointment?.checkInDate),
                end: new Date(addDaysToDate(CurrentAppointment?.checkOutDate, 1))
            })
        else return []
    }, []);

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState<{ [day: string]: boolean }>()
    useEffect(() => {
        // @ts-ignore
        setShow(DAYS.reduce((result, day, index, array) => {
            // @ts-ignore
            result[String(day.getDate())] = false;
            return result
        }, {}))
    }, [DAYS]);
    return (
        <div>
            <button type="button" className={styles.collapsableSection} onClick={(e) => setOpen(prev => !prev)}>
                <div className="row">
                    <Image alt="activity icon" src={Images[activity.class]} height={30} />
                    <h3 className="ml-10px">{activity.name}</h3>
                </div>
                <Image alt="chevron down" src={open ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {
                open ? (
                    <div className={styles.setUpContainer}>
                        <div className="row-between">
                            <h5>Unassigned guests : {unassignedGuests}</h5>
                            <h5>Capacity: {activity.capacity}</h5>
                            <h5>Duration: {activity.duration.time} {activity.duration.interval}</h5>
                        </div>
                        {
                            DAYS.map((day, i) => {
                                const found = Array.isArray(activity.dailyAvailable) && activity.dailyAvailable.find((da) => da.day === weekdays[day.getDay()] && da.isChecked)
                                if (!found) return null;
                                const schedArray = activity.dailyAvailable !== "*" ? getTimeBlocks({
                                    from: hourStringToDate(found.from),
                                    to: hourStringToDate(found.to),
                                    interval: activity.duration.interval === "hours" ? (activity.duration.time * 60) : activity.duration.time,
                                }) : getTimeBlocks({
                                    from: new Date(new Date().setHours(9)),
                                    to: new Date(new Date().setHours(17)),
                                    interval: activity.duration.interval === "hours" ? (activity.duration.time * 60) : activity.duration.time,
                                })
                                return (
                                    <div
                                        key={i}
                                        className="buttonhover pointer"
                                        style={{
                                            width: "100%",
                                            minHeight: "10px",
                                            border: `1px solid ${Colors.cascade200}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: "10px 0 0 0",
                                        }}
                                        // @ts-ignore
                                        onClick={() => setShow(prev => ({ ...prev, [String(day.getDate())]: !prev[String(day.getDate())] }))}
                                    >
                                        <p style={{ padding: "10px 0", color: Colors.cascade400 }}>{weekdays[day.getDay()]}, {getNumberWithOrdinal(day.getDate())}</p>
                                        {
                                            show && show[String(day.getDate())] ?
                                                <div className="w-90p row-between flow-wrap mr-10px m-10px" >
                                                    {schedArray.map((sched, ix) => {
                                                        // @ts-ignore
                                                        const occupyingThisDateTime = appointmentWithThisActivity.filter((oAp) => oAp.activitySchedule.some((oApSched) => new Date(oApSched?.checkInDate).toDateString() === new Date(day).toDateString() && oApSched.checkInTime === sched.timeValue));
                                                        const occupyingGroup = CamperGroups.filter((cg) => occupyingThisDateTime?.some((otdt) => cg.id == otdt.groupId));
                                                        const currentGroupIsOccupying = occupyingGroup.find(og => og.id === CurrentGroup.id)

                                                        const occupyingAmount = occupyingGroup.reduce((acc, group) => acc + group.groupSize, 0)
                                                        const willBeFull = (occupyingAmount + CurrentGroup.groupSize) > activity.capacity;
                                                        const isFull = occupyingAmount >= activity.capacity;
                                                        return (
                                                            <button
                                                                key={ix}
                                                                type="button"
                                                                className={occupyingGroup.length > 0 ? "tooltipBreakText" : ""}
                                                                data-content={occupyingGroup.length > 0 ?
                                                                    `${occupyingGroup.map((og) => og.groupName + ": " + og.groupSize)}`.replaceAll(",", "\n") + "\n" + activity.capacity + "/" + occupyingAmount :
                                                                    ""}
                                                                style={{
                                                                    color: isFull && !currentGroupIsOccupying ? Colors.red500 : occupyingGroup.length > 0 ? Colors.chalky500 : Colors.cascade300,
                                                                    border: `1px solid ${isFull && !currentGroupIsOccupying ? Colors.red500 : occupyingGroup.length > 0 ? Colors.chalky500 : Colors.cascade300}`,
                                                                    padding: "5px",
                                                                    margin: "5px 10px",
                                                                    textAlign: "center",
                                                                    width: "calc(25% - 20px)",
                                                                    cursor: isFull && !currentGroupIsOccupying ? "not-allowed" : "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (!!currentGroupIsOccupying) {

                                                                        const newAppointment: AppointmentType = {
                                                                            ...CurrentAppointment,
                                                                            // @ts-ignore
                                                                            activitySchedule: CurrentAppointment.activitySchedule.filter(actSched => !(new Date(actSched.checkInDate).toDateString() === new Date(day).toDateString() && actSched.checkInTime === sched.timeValue))
                                                                        };
                                                                        dispatch(updateAppointment(newAppointment))
                                                                        return;
                                                                    }
                                                                    if (isFull || unassignedGuests <= 0) return;
                                                                    const newAppointment: AppointmentType = {
                                                                        ...CurrentAppointment,
                                                                        activitySchedule: [...CurrentAppointment.activitySchedule, {
                                                                            groupId: CurrentAppointment.groupId,
                                                                            activity: activity,
                                                                            scheduleId: IDGenerator(),
                                                                            checkInDate: day,
                                                                            checkInTime: sched.timeValue,
                                                                        }]
                                                                    };
                                                                    dispatch(updateAppointment(newAppointment))
                                                                    // dispatch(updateLead(newAppointment))
                                                                }
                                                                }
                                                            >
                                                                {sched.timeString}
                                                            </button>
                                                        )
                                                    })}
                                                </div> :
                                                null
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

export default memo(ActivityCard);