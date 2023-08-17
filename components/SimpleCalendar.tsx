import { AppointmentType, SetStateType, RetreatCenterType } from "@/types";
import { addDaysToDate, dateIsScheduled, debounce, getDayOfWeek, getDays, getEndDate, getLastDayOfMonth, getNumberWithOrdinal, onDragOver, trunc } from "@/utils/functions";
import { months, weekdays } from "@/utils/variables";
import styles from "./SimpleCalendar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { deleteLead, setCurrentLead } from "@/services/redux/slice/leads";
import AppointmentModal from "./AppointmentModal";
import Colors from "@/common/colors";
import { setCurrentCamperGroup } from "@/services/redux/slice/campergroups";
import { createAppointment, deleteAppointment } from "@/services/redux/slice/appointments";
import { setRetreatCenter } from "@/services/redux/slice/retreatcenters";
const SimpleCalendar = ({ date, RetreatCenter }: { date: Date, RetreatCenter: RetreatCenterType }) => {
    const dispatch = useDispatch()
    const RetreatCenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    const CurrentLead = useSelector((state: RootState) => state.Leads.currentLead)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [appointmentsCopy, setAppointmentsCopy] = useState<Array<AppointmentType>>(Appointments)
    const [grabbedAppointment, setGrabbedAppointment] = useState<AppointmentType & { hoverDate: Date }>()


    useEffect(() => {
        setAppointmentsCopy(Appointments)
    }, [Appointments])


    const onDrop = useCallback((e: React.DragEvent, date?: Date) => {
        // const widgetType = e.dataTransfer.getData("widgetType") as string;
        // const parsed: AppointmentType = JSON.parse(widgetType)
        e.preventDefault()
        if (!date) return;
        if (!CurrentLead) return;
        if (!CurrentLead.checkInDays) return;
        const copiedDate = new Date(date)
        const appointment: AppointmentType = {
            ...CurrentLead,
            retreatCenterId: RetreatCenter.id,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate())),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + CurrentLead.checkInDays)),
            mealSchedule: [],
            activitySchedule: [],
            meetingRoomSchedule: [],
            roomSchedule: [],
            status: "Reserved"
        }
        const isBooked = CurrentLead.status !== "Lead"
        if (isBooked) dispatch(deleteAppointment(appointment.id))
        dispatch(createAppointment(appointment))
        dispatch(deleteLead(CurrentLead.id))
        dispatch(setCurrentLead(undefined))
        dispatch(setCurrentCamperGroup(undefined))
    }, [CurrentLead])
    const onDropPreview = useCallback((date?: Date) => {
        if (!date) return;
        if (!CurrentLead?.checkInDays || !CurrentGroup?.groupSize) return;
        const copiedDate = new Date(date)
        const appointment: AppointmentType = {
            ...CurrentLead,
            retreatCenterId: RetreatCenter.id,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate())),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + CurrentLead.checkInDays)),
        }
        debounce(setAppointmentsCopy(prev => [...prev, appointment]), 500)
        debounce(setGrabbedAppointment({ ...appointment, hoverDate: date }))
    }, [CurrentLead, CurrentGroup])
    const onDrag = useCallback((event: React.DragEvent, data: AppointmentType | Array<AppointmentType>, currentDate?: Date) => {
        const widgetType = JSON.stringify(data);
        event.dataTransfer.setData("widgetType", widgetType);
        if (!currentDate) return;
        if (Array.isArray(data)) {
            const group = CamperGroups.find(cg => cg.id === data[0].groupId)
            const newdata: AppointmentType & { draggedDate: Date } = { ...data[0], draggedDate: currentDate }
            dispatch(setCurrentLead(newdata))
            dispatch(setCurrentCamperGroup(group))
        }
        else {
            const group = CamperGroups.find(cg => cg.id === data.groupId)
            const newdata: AppointmentType & { draggedDate: Date } = { ...data, draggedDate: currentDate }
            dispatch(setCurrentLead(newdata))
            dispatch(setCurrentCamperGroup(group))
        }
    }, [CamperGroups])

    const onDragEnd = useCallback((e: any) => { dispatch(setCurrentLead(undefined)); debounce(setGrabbedAppointment(undefined)) }, [])
    const leaveDrag = useCallback((e: React.DragEvent) => { e.stopPropagation(); debounce(setAppointmentsCopy(Appointments)); }, [Appointments])

    const clickAppointment = useCallback((appointment: AppointmentType) => {
        const group = CamperGroups.find((cg) => cg.id === appointment.groupId);
        dispatch(setRetreatCenter(RetreatCenter))
        dispatch(setCurrentLead(appointment))
        dispatch(setCurrentCamperGroup(group))
        setModalIsVisible(true)
    }, [CamperGroups])
    const Days = useMemo(() => getDays({ start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`), end: getEndDate(date) }), [date]);
    const calendarWeeks = Array(6).fill(0)
    const calendarDays = Array(8).fill(0)
    let calendarDate: number | undefined = undefined;
    return (
        <div className="select-none">
            {modalIsVisible ? <AppointmentModal setIsVisible={setModalIsVisible} /> : null}
            <div className={styles.calendarWeek}>
                {calendarDays.map((d, i) => {
                    if (i === 0) return <div key={i} className={styles.calendarHeaderText0} />
                    return (
                        <div key={i} className={styles.calendarHeader}><span className={styles.calendarHeaderText}>{trunc(weekdays[i - 1], i === 3 || i === 5 ? 2 : 1, "")}</span></div>
                    )
                })}
            </div>{
                calendarWeeks.map((w, i) => {
                    let isHead = false;
                    let isTail = false;
                    return (
                        <div key={i} className={styles.calendarWeek}>
                            {calendarDays.map((d, ix) => {
                                const cellNum = (i + 1) * (ix); // column + 1 x row
                                if (calendarDate === undefined && Days[0] && cellNum > Days[0].getDay()) calendarDate = 0;
                                if (!Days[0]) {
                                    return;
                                }
                                const rangeDate = calendarDate && Days[calendarDate] !== undefined ? Days[calendarDate] : Days[0];
                                const firstDayOfWeek = rangeDate ? rangeDate.getDate() : Days[0].getDate()

                                if (ix === 0) {
                                    const lastDayOfWeek = getDayOfWeek(new Date(new Date(rangeDate).setDate(rangeDate.getDate() + 1)), 6).getDate()
                                    const lastDayOfMonth = getLastDayOfMonth(rangeDate).getDate();
                                    let prefix: string | number = ""
                                    if (firstDayOfWeek === lastDayOfWeek) prefix = ""
                                    if (firstDayOfWeek === lastDayOfMonth) prefix = ""
                                    else if (firstDayOfWeek < lastDayOfWeek) prefix = `-${lastDayOfWeek}`
                                    else if (firstDayOfWeek > lastDayOfWeek) prefix = `-${lastDayOfMonth}`
                                    if (i === 5 && firstDayOfWeek < 8) return
                                    const resultString = `${firstDayOfWeek}${prefix}`
                                    return (
                                        <div key={ix} className={[styles.calendarWeekRange, styles.calendarDate].join(" ")}>
                                            <p className={styles.calendarWeekRangeText}>
                                                {resultString}
                                            </p>
                                        </div>
                                    )
                                }

                                const currentDate = calendarDate !== undefined ? Days[calendarDate++] : undefined;
                                const appointment = dateIsScheduled({ date: currentDate, appointments: appointmentsCopy.filter((a) => a.retreatCenterId === RetreatCenter.id) });
                                const group = Array.isArray(appointment) ? CamperGroups.filter((cg) => appointment.some((a) => cg.id === a.groupId)) : CamperGroups.find((cg) => cg.id === appointment?.groupId)
                                let classes: string | undefined;
                                let style: React.CSSProperties | undefined;
                                if (!Array.isArray(appointment) && !Array.isArray(group) && group && appointment && appointment.checkInDate && appointment.checkOutDate && currentDate) {
                                    const checkInDate = new Date(new Date(appointment.checkInDate).setDate(new Date(appointment.checkInDate).getDate()))
                                    const checkOutDate = new Date(appointment.checkOutDate)
                                    const backgroundString = group.color

                                    style = {
                                        background: backgroundString,

                                    }

                                    let checkInString
                                    let checkOutString
                                    const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate()}`
                                    if (appointment && checkInDate) {
                                        checkInString = `${months[checkInDate.getMonth()]} ${checkInDate.getDate()}`
                                    }
                                    if (appointment && checkOutDate) {
                                        checkOutString = `${months[checkOutDate.getMonth()]} ${checkOutDate.getDate()}`
                                    }
                                    isTail = checkInString == currentDateString
                                    isHead = checkOutString === currentDateString
                                    classes = [
                                        currentDate.getDate() > checkInDate.getDate() && currentDate.getDate() <= checkOutDate.getDate() ?
                                            styles.occupied : styles.calendarDay,
                                        appointment.status === "Booked" || appointment.status === "Reserved" ? styles.occupied : "",
                                        checkInString == currentDateString ? styles.occupiedTail : "",
                                        checkOutString === currentDateString ? styles.occupiedHead : "",
                                    ].join(" ");
                                } else {

                                }
                                if (Array.isArray(appointment) && Array.isArray(group)) {
                                    const backgroundString = `linear-gradient(${group.map(g => (g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color)).toString()} 15px)`
                                    let isArrayHead = true;
                                    let isArrayTail = true;
                                    for (const app of appointment) {
                                        if (!currentDate) break;
                                        const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate()}`
                                        if (!app.checkInDate || !app.checkOutDate) break;
                                        const checkInDate = new Date(new Date(app.checkInDate).setDate(new Date(app.checkInDate).getDate()))
                                        const checkOutDate = new Date(app.checkOutDate)
                                        const checkInString = `${months[checkInDate.getMonth()]} ${checkInDate.getDate()}`
                                        const checkOutString = `${months[checkOutDate.getMonth()]} ${checkOutDate.getDate()}`
                                        if (checkInString !== currentDateString) isArrayHead = false;
                                        if (checkOutString !== currentDateString) isArrayTail = false
                                        isTail = checkInString == currentDateString
                                        isHead = checkOutString == currentDateString
                                    }

                                    style = {
                                        backgroundImage: backgroundString,

                                    }
                                    classes = [
                                        styles.occupied,
                                        isArrayHead ? styles.occupiedTail : styles.noSideBorder,
                                        isArrayTail ? styles.occupiedHead : styles.noSideBorder,
                                    ].join(" ")
                                }

                                if ((i >= 4 && firstDayOfWeek < 8) || i === 0 && !currentDate)
                                    return <div
                                        key={ix}
                                        className={[styles.vacant, styles.calendarDate].join(" ")}
                                        onDrop={(e) => onDrop(e, currentDate)}
                                        onDragOver={e => { e.preventDefault(); onDropPreview(currentDate) }}
                                        onDragLeave={leaveDrag}
                                    />;

                                {/* currentDrag === is the user dragging an item ? */ }
                                {/* isDraggable === item is a reservation */ }
                                {/* appointmentBeingDragged === appointment is being dragged */ }
                                {/* cellBeingDragged === the specific date of appointment being dragged */ }
                                const isDraggable = Array.isArray(appointment) || (appointment && appointment.status === "Reserved")
                                const currentGroup = Array.isArray(group) ? group[0] : group
                                const currentAppointment = Array.isArray(appointment) ? appointment[0] : appointment
                                // @ts-ignore
                                const cellBeingDragged = CurrentLead && currentDate && CurrentLead?.draggedDate?.toString() === currentDate.toString()
                                const appointmentBeingDragged = !Array.isArray(appointment) && appointment && currentDate && CurrentLead?.id === appointment.id
                                let cond = true;
                                // @ts-ignore 
                                const currentDateSplit = new Date(currentAppointment?.checkInDate).toLocaleDateString().split("/")
                                // @ts-ignore 
                                const outDateSplit = addDaysToDate(new Date(currentAppointment?.checkInDate), currentAppointment?.checkInDays).toLocaleDateString().split("/")
                                // @ts-ignore 
                                const currentMonth = trunc(months[Number(currentDateSplit.at(0)) - 1], 3, "")
                                const currentDay = Number(currentDateSplit?.at(1))
                                // @ts-ignore 
                                const outMonth = trunc(months[Number(outDateSplit.at(0)) - 1], 3, "")
                                const outDay = Number(outDateSplit?.at(1))
                                if (appointmentBeingDragged && !cellBeingDragged) cond = false;
                                return (
                                    <div
                                        key={ix}
                                        className={[styles.vacant, styles.calendarDate].join(" ")}
                                        onDrop={(e) => onDrop(e, currentDate)}
                                        onDragOver={e => { e.preventDefault(); onDropPreview(currentDate) }}
                                        onDragLeave={leaveDrag}
                                        onMouseOver={() => {
                                            if (!currentAppointment && !grabbedAppointment && !currentDate) return;
                                            const grabbed = Array.isArray(appointment) ? { appointments: appointment } : currentAppointment;
                                            // @ts-ignore
                                            debounce(setGrabbedAppointment({ ...grabbed, hoverDate: currentDate }))
                                        }}
                                        onMouseLeave={() => debounce(setGrabbedAppointment(undefined))}>
                                        {grabbedAppointment && grabbedAppointment.hoverDate === currentDate && appointment && currentDate && cond && currentGroup ?
                                            Array.isArray(appointment) ?
                                                appointment.map((ap: AppointmentType, idx: number) => {
                                                    // @ts-ignore 
                                                    const odSplit = addDaysToDate(new Date(ap?.checkInDate), ap?.checkInDays).toLocaleDateString().split("/")
                                                    // @ts-ignore 
                                                    const oMonth = trunc(months[Number(odSplit.at(0)) - 1], 3, "")
                                                    const oDay = Number(odSplit?.at(1))
                                                    const g = CamperGroups.find(cg => cg.id === ap.groupId)
                                                    if (!g || appointment[idx - 1] && appointment[idx - 1].id === ap.id) return null
                                                    return (
                                                        <div
                                                            onDragOver={e => { e.preventDefault(); onDropPreview(currentDate) }}
                                                            onDragLeave={leaveDrag}
                                                            key={idx}
                                                            style={{
                                                                top: `-${20 * (idx + (idx / 2) + 1)}px`,
                                                                left: "-200px",
                                                                height: "24px",
                                                                width: "fit-content",
                                                                position: "absolute",
                                                                background: "white",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                padding: "0px 10px 10px 10px",
                                                                whiteSpace: "nowrap",
                                                                borderRadius: "5px",
                                                                border: `2px solid ${g.color}`,
                                                                zIndex: 10,
                                                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                            }}>
                                                            <p style={{ color: g.color, fontWeight: "800", marginRight: "15px" }}>{g.groupName}</p>
                                                            <p style={{ marginRight: "15px" }}>{g.groupSize} Guests</p>
                                                            <p style={{ marginRight: "15px" }}>{ap?.checkInDays} Nights</p>
                                                            <p style={{ fontWeight: "800" }}>{currentMonth}. {getNumberWithOrdinal(currentDay)} <span style={{ fontSize: "14px" }}>to</span> {oMonth}. {getNumberWithOrdinal(oDay)}</p>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <div
                                                    onDragOver={e => { e.preventDefault(); onDropPreview(currentDate) }}
                                                    onDragLeave={leaveDrag}
                                                    style={{
                                                        top: "-20px",
                                                        left: "-200px",
                                                        height: "24px",
                                                        width: "fit-content",
                                                        position: "absolute",
                                                        background: "white",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        padding: "0px 10px 10px 10px",
                                                        whiteSpace: "nowrap",
                                                        borderRadius: "5px",
                                                        border: `2px solid ${currentGroup.color}`,
                                                        zIndex: 10,
                                                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                    }}>
                                                    <p style={{ color: currentGroup.color, fontWeight: "800", marginRight: "15px" }}>{currentGroup.groupName}</p>
                                                    <p style={{ marginRight: "15px" }}>{currentGroup.groupSize} Guests</p>
                                                    <p style={{ marginRight: "15px" }}>{currentAppointment?.checkInDays} Nights</p>
                                                    <p style={{ fontWeight: "800" }}>{currentMonth}. {getNumberWithOrdinal(currentDay)} <span style={{ fontSize: "14px" }}>to</span> {outMonth}. {getNumberWithOrdinal(outDay)}</p>
                                                </div>
                                            : null}
                                        {appointment && currentDate && cond ?
                                            <div
                                                style={appointmentBeingDragged ? vacantLine : style}
                                                className={classes}
                                                draggable={isDraggable}
                                                onDragOver={e => { e.preventDefault(); onDropPreview(currentDate) }}
                                                onDragLeave={leaveDrag}
                                                onDragStart={(e) => onDrag(e, appointment, currentDate)}
                                                onDragEnd={e => onDragEnd(e)}
                                                onClick={(e) => { e.stopPropagation(); clickAppointment(Array.isArray(appointment) ? appointment[0] : appointment) }}
                                            />
                                            : <div
                                                style={vacantLine}
                                                onDragOver={e => { e.preventDefault(); onDropPreview(currentDate) }}
                                                onDragLeave={leaveDrag}
                                            />}

                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }</div >)
}

export default memo(SimpleCalendar);

const vacantLine = {
    height: "1px",
    width: "100%",
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
}