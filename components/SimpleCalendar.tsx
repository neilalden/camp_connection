import { AppointmentType, SetStateType, RetreatCenterType } from "@/types";
import { dateIsScheduled, debounce, getDayOfWeek, getDays, getEndDate, getLastDayOfMonth, onDragOver, trunc } from "@/utils/functions";
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
const SimpleCalendar = ({ date, RetreatCenter }: { date: Date, RetreatCenter: RetreatCenterType }) => {
    const dispatch = useDispatch()
    const RetreatCenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    const CurrentLead = useSelector((state: RootState) => state.Leads.currentLead)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    const [modalIsVisible, setModalIsVisible] = useState(false);
    // const [currentAppointment, setCurrentAppointment] = useState<AppointmentType | Array<AppointmentType>>()
    const [appointmentsCopy, setAppointmentsCopy] = useState<Array<AppointmentType>>(Appointments)


    useEffect(() => {
        setAppointmentsCopy(Appointments)
    }, [Appointments])


    const onDrop = useCallback((e: React.DragEvent, date?: Date) => {
        // const widgetType = e.dataTransfer.getData("widgetType") as string;
        // const parsed: AppointmentType = JSON.parse(widgetType)
        if (!date) return;
        if (!CurrentLead) return;
        if (!CurrentLead.checkInDays) return;
        const copiedDate = new Date(date)
        const appointment: AppointmentType = {
            ...CurrentLead,
            retreatCenterId: RetreatCenter.id,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate())),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + CurrentLead.checkInDays - 1)),
            status: "Reserved"
        }
        const isBooked = CurrentLead.status !== "Lead"
        if (isBooked) dispatch(deleteAppointment(appointment.id))
        dispatch(createAppointment(appointment))
        dispatch(deleteLead(CurrentLead.id))
        dispatch(setCurrentLead(undefined))
        dispatch(setCurrentCamperGroup(undefined))
    }, [CurrentLead])
    const leaveDrag = useCallback((e: React.DragEvent) => { e.stopPropagation(); debounce(setAppointmentsCopy(Appointments)) }, [Appointments])
    const onDropPreview = useCallback((date?: Date) => {
        if (!date) return;
        if (!CurrentLead?.checkInDays || !CurrentGroup?.groupSize) return;
        const copiedDate = new Date(date)
        const appointment: AppointmentType = {
            ...CurrentLead,
            retreatCenterId: RetreatCenter.id,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate())),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + CurrentLead.checkInDays - 1)),
        }
        debounce(setAppointmentsCopy(prev => [...prev, appointment]))
    }, [CurrentLead])
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

    const onDragEnd = useCallback((e: any) => dispatch(setCurrentLead(undefined)), [])

    const clickAppointment = useCallback((appointment: AppointmentType) => {
        const group = CamperGroups.find((cg) => cg.id === appointment.groupId)
        dispatch(setCurrentLead(appointment))
        dispatch(setCurrentCamperGroup(group))
        setModalIsVisible(true)
    }, [])
    const Days = useMemo(() => getDays({ start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`), end: getEndDate(date) }), [date]);
    const calendarWeeks = Array(6).fill(0)
    const calendarDays = Array(8).fill(0)
    let calendarDate: number | undefined = undefined;
    return (
        <div>
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

                                    style = { background: backgroundString }

                                    let checkInString
                                    let checkOutString
                                    const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate()}`
                                    if (appointment && checkInDate) {
                                        checkInString = `${months[checkInDate.getMonth()]} ${checkInDate.getDate()}`
                                    }
                                    if (appointment && checkOutDate) {
                                        checkOutString = `${months[checkOutDate.getMonth()]} ${checkOutDate.getDate()}`
                                    }
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
                                    const backgroundString = `repeating-linear-gradient(${group.map(g => (g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color + "," + g.color)).toString()} 15px)`
                                    let isHead = true;
                                    let isTail = true;
                                    for (const app of appointment) {
                                        if (!currentDate) break;
                                        const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate()}`
                                        if (!app.checkInDate || !app.checkOutDate) break;
                                        const checkInDate = new Date(new Date(app.checkInDate).setDate(new Date(app.checkInDate).getDate()))
                                        const checkOutDate = new Date(app.checkOutDate)
                                        const checkInString = `${months[checkInDate.getMonth()]} ${checkInDate.getDate()}`
                                        const checkOutString = `${months[checkOutDate.getMonth()]} ${checkOutDate.getDate()}`
                                        if (checkInString !== currentDateString) isHead = false;
                                        if (checkOutString !== currentDateString) isTail = false
                                    }
                                    style = {
                                        backgroundImage: backgroundString,
                                    }
                                    classes = [
                                        styles.occupied,
                                        isHead ? styles.occupiedTail : styles.noSideBorder,
                                        isTail ? styles.occupiedHead : styles.noSideBorder,
                                    ].join(" ")
                                }

                                if ((i >= 4 && firstDayOfWeek < 8) || i === 0 && !currentDate)
                                    return <div
                                        key={ix}
                                        className={[styles.vacant, styles.calendarDate].join(" ")}
                                        onDrop={(e) => onDrop(e, currentDate)}
                                        onDragOver={e => onDropPreview(currentDate)}
                                        onDragLeave={leaveDrag}
                                    />;

                                {/* currentDrag === is the user dragging an item ? */ }
                                {/* isDraggable === item is a reservation */ }
                                {/* appointmentBeingDragged === appointment is being dragged */ }
                                {/* cellBeingDragged === the specific date of appointment being dragged */ }
                                const isDraggable = Array.isArray(appointment) || (appointment && appointment.status === "Reserved")
                                // @ts-ignore
                                const cellBeingDragged = CurrentLead && currentDate && CurrentLead?.draggedDate?.toString() === currentDate.toString()
                                const appointmentBeingDragged = !Array.isArray(appointment) && currentDate && appointment && CurrentLead?.id === appointment.id
                                let cond = true;
                                if (appointmentBeingDragged && !cellBeingDragged) cond = false
                                return (
                                    <div
                                        key={ix}
                                        className={[styles.vacant, styles.calendarDate].join(" ")}
                                        onDrop={(e) => onDrop(e, currentDate)}
                                        onDragOver={e => onDropPreview(currentDate)}
                                        onDragLeave={leaveDrag}
                                    >
                                        {appointment && currentDate && cond ?
                                            <div
                                                data-content={!Array.isArray(group) ?
                                                    `${group?.groupName}` :
                                                    group.map((g) => g.groupName).toString().replaceAll(",", ", \n")}
                                                style={
                                                    appointmentBeingDragged ?
                                                        {
                                                            ...style,
                                                            border: `3px solid ${CurrentGroup?.color}`,
                                                        }
                                                        : style
                                                }
                                                className={classes}
                                                id={appointmentBeingDragged && cellBeingDragged ? styles.draggable : ""}
                                                draggable={isDraggable}
                                                onDragStart={(e) => onDrag(e, appointment, currentDate)}
                                                onDragEnd={e => onDragEnd(e)}
                                                onClick={() => clickAppointment(Array.isArray(appointment) ? appointment[0] : appointment)}

                                            >{!Array.isArray(CurrentLead) && appointmentBeingDragged ? (
                                                <div>
                                                    <p className={styles.leadName} style={{ color: CurrentGroup?.color }}>{CurrentGroup?.groupName}</p>
                                                    {/* <p>{appointment.reservee.firstName}</p>
                                                <p>{appointment.reservee.contactNumber}</p>
                                                <p>{appointment.zipCode}</p> */}
                                                </div>)
                                                : null}
                                            </div>
                                            : <div
                                                className={styles.vacantLine}
                                                onDragOver={e => onDropPreview(currentDate)}
                                            />}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }</div>)
}

export default memo(SimpleCalendar);