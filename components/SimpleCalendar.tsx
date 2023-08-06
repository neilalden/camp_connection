import { AppointmentType, SetStateType, RetreatCenterType } from "@/types";
import { dateIsScheduled, debounce, getDays, getEndDate, onDragOver, trunc } from "@/utils/functions";
import { months, weekdays } from "@/utils/variables";
import styles from "./SimpleCalendar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { addAppointment, cancelAppointment } from "@/services/redux/slice/retreatcenters";
import { useEffect, useState } from "react";
import { AppointmentTypeWithExtraProp, removeLead, setDraggedLead } from "@/services/redux/slice/leads";
import Modal from "./Modal";
import Colors from "@/common/colors";
const SimpleCalendar = ({ date, RetreatCenter }: { date: Date, RetreatCenter: RetreatCenterType }) => {
    const dispatch = useDispatch()
    const retreatcenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
    const draggedLead: any = useSelector((state: RootState) => state.Leads.draggedLead)
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState<AppointmentType | Array<AppointmentType>>()
    const [currentRetreatCenter, setCurrentRetreatCenter] = useState<RetreatCenterType>(RetreatCenter)

    const Days = getDays({ start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`), end: getEndDate(date) });
    const calendarWeeks = Array(6).fill(0)
    const calendarDays = Array(8).fill(0)
    let calendarDate: number | undefined = undefined;


    useEffect(() => {
        setCurrentRetreatCenter(RetreatCenter)
    }, [RetreatCenter])


    const onDrop = (e: React.DragEvent, date?: Date) => {
        if (!date) return;

        const widgetType = e.dataTransfer.getData("widgetType") as string;
        const parsed: AppointmentType = JSON.parse(widgetType)
        const copiedDate = new Date(date)
        if (parsed.status === undefined) return; // it means that the data from drop is not an appointment
        const appointment: AppointmentType = {
            ...parsed,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate() + 1)),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + parsed.checkInDays - 1)),
        }

        const isBooked = retreatcenters.find(rc => rc.appointments.some(a => a.id === appointment.id));
        if (isBooked) dispatch(cancelAppointment({ appointmentId: appointment.id }))
        dispatch(addAppointment({
            retreatCenterId: currentRetreatCenter.id,
            appointment: appointment
        }))
        dispatch(removeLead(appointment.id))
        dispatch(setDraggedLead(undefined))
    }
    const leaveDrag = (e: React.DragEvent) => { e.preventDefault(); debounce(setCurrentRetreatCenter(RetreatCenter), 500) }
    const onDropPreview = (data: AppointmentType, date?: Date) => {
        if (!date) return;
        const copiedDate = new Date(date)
        if (data.status === undefined) return; // it means that the data from drop is not an appointment
        const appointment: AppointmentType = {
            ...data,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate() + 1)),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + data.checkInDays - 1)),
        }
        setCurrentRetreatCenter(prev => ({
            ...prev,
            appointments: [...prev.appointments, appointment]
        }))
    }
    const clickAppointment = (appointment: AppointmentType | Array<AppointmentType>) => {
        setCurrentAppointment(appointment)
        setModalIsVisible(true)
    }
    const onDrag = (event: React.DragEvent, data: AppointmentType | Array<AppointmentType>, currentDate?: Date) => {
        const widgetType = JSON.stringify(data);
        event.dataTransfer.setData("widgetType", widgetType);
        if (!currentDate) return;
        if (Array.isArray(data)) return;
        const newdata: AppointmentTypeWithExtraProp = { ...data, draggedDate: currentDate }
        // setCurrentDrag(newdata)
        dispatch(setDraggedLead(newdata))
    }
    const onDragEnd = (e: any) => dispatch(setDraggedLead(undefined))
    return (<div>
        {modalIsVisible ? <Modal setIsVisible={setModalIsVisible} appointment={currentAppointment} /> : null}
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
                            const appointment = dateIsScheduled({ date: currentDate, appointments: currentRetreatCenter.appointments });
                            let classes: string | undefined;
                            let style: React.CSSProperties | undefined;
                            if (!Array.isArray(appointment) && appointment && appointment.checkInDate && appointment.checkOutDate && currentDate) {
                                const checkInDate = new Date(appointment.checkInDate)
                                const checkOutDate = new Date(appointment.checkOutDate)
                                const backgroundString = appointment.color

                                style = { background: backgroundString }

                                let checkInString
                                let checkOutString
                                const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate() + 1}`
                                if (appointment && checkInDate) {
                                    checkInString = `${months[checkInDate.getMonth()]} ${checkInDate.getDate()}`
                                }
                                if (appointment && checkOutDate) {
                                    checkOutString = `${months[checkOutDate.getMonth()]} ${checkOutDate.getDate()}`
                                }
                                classes = [
                                    currentDate.getDate() > checkInDate.getDate() && currentDate.getDate() <= checkOutDate.getDate() ?
                                        styles.booked : styles.calendarDay,
                                    appointment.status === "Booked" ? styles.booked : styles.reserved,
                                    checkInString == currentDateString ? appointment.status === "Booked" ? styles.bookingTail : styles.reservationTail : "",
                                    checkOutString === currentDateString ? appointment.status === "Booked" ? styles.bookingHead : styles.reservationHead : "",
                                ].join(" ");
                            }
                            if (Array.isArray(appointment)) {
                                const backgroundString = `repeating-linear-gradient(180deg, ${appointment.map(a => a.color).toString()}) `

                                const borderString = `linear-gradient(to top, ${appointment.map(a => a.status == "Booked" ? Colors.green400 : Colors.yellow400).toString()}) 1`
                                style = {
                                    borderWidth: "3px",
                                    borderStyle: "solid",
                                    borderImage: borderString,
                                    backgroundImage: backgroundString,
                                    backgroundAttachment: "fixed"
                                }
                                classes = [
                                    styles.booked,
                                    styles.noSideBorder
                                ].join(" ")
                            }

                            if ((i >= 4 && firstDayOfWeek < 8) || i === 0 && !currentDate)
                                return <div
                                    key={ix}
                                    className={[styles.vacant, styles.calendarDate].join(" ")}
                                    onDrop={(e) => onDrop(e, currentDate)}
                                    onDragOver={e => {
                                        e.preventDefault();
                                        debounce(onDropPreview(draggedLead, currentDate), 1000)
                                    }}
                                    onDragLeave={leaveDrag}
                                />;

                            {/* currentDrag === is the user dragging an item ? */ }
                            {/* isDraggable === item is a reservation */ }
                            {/* appointmentBeingDragged === appointment is being dragged */ }
                            {/* cellBeingDragged === the specific date of appointment being dragged */ }
                            const isDraggable = !Array.isArray(appointment) && appointment && appointment.status === "Reserved"
                            const cellBeingDragged = draggedLead && currentDate && draggedLead?.draggedDate?.toString() === currentDate.toString()
                            const appointmentBeingDragged = !Array.isArray(appointment) && currentDate && appointment && draggedLead?.id === appointment.id
                            let cond = true;
                            if (appointmentBeingDragged && !cellBeingDragged) cond = false
                            return (
                                <div
                                    key={ix}
                                    className={[styles.vacant, styles.calendarDate].join(" ")}
                                    onDrop={(e) => onDrop(e, currentDate)}
                                    onDragOver={e => {
                                        e.preventDefault();
                                        debounce(onDropPreview(draggedLead, currentDate), 1000)
                                    }}
                                    onDragLeave={leaveDrag}
                                >
                                    {appointment && currentDate && cond ?
                                        <div
                                            data-content={!Array.isArray(appointment) ?
                                                `${appointment.groupName}` :
                                                appointment.map((app) => app.groupName).toString().replaceAll(",", ", \n")}
                                            style={
                                                appointmentBeingDragged ?
                                                    {
                                                        ...style,
                                                        border: `3px solid ${draggedLead.color}`,
                                                    }
                                                    : style
                                            }
                                            className={classes}
                                            id={appointmentBeingDragged && cellBeingDragged ? styles.draggable : ""}
                                            draggable={isDraggable}
                                            onDragStart={(e) => onDrag(e, appointment, currentDate)}
                                            onDragEnd={e => onDragEnd(e)}
                                            onClick={() => clickAppointment(appointment)}
                                            onDragOver={e => {
                                                e.preventDefault();
                                                debounce(onDropPreview(draggedLead, currentDate), 1000)
                                            }}
                                            onDragLeave={leaveDrag}

                                        >{!Array.isArray(draggedLead) && appointmentBeingDragged ? (
                                            <div>
                                                <p className={styles.leadName} style={{ color: appointment.color }}>{appointment.groupName}</p>
                                                <p>{appointment.reservee.firstName}</p>
                                                <p>{appointment.reservee.contactNumber}</p>
                                                <p>{appointment.zipCode}</p>
                                            </div>)
                                            : null}</div>
                                        : <div
                                            className={styles.vacantLine}
                                            onDragOver={e => {
                                                e.preventDefault();
                                                debounce(onDropPreview(draggedLead, currentDate), 1000)
                                            }}
                                            onDragLeave={leaveDrag}
                                        />}
                                </div>
                            )
                        })}
                    </div>
                )
            })
        }</div>)
}
const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
function getDayOfWeek(date: Date = new Date(), DayOfWeek = 7) {
    const dateCopy = new Date(date)
    var day = dateCopy.getDay() || 7;
    if (day !== DayOfWeek)
        dateCopy.setHours(-24 * (day - DayOfWeek));
    return dateCopy;
}

export default SimpleCalendar;