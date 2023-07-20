import { AppointmentType, SetStateType } from "@/types";
import { dateIsScheduled, getDays, trunc } from "@/utils/functions";
import { months, weekdays } from "@/utils/variables";
import styles from "./SimpleCalendar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { addAppointment } from "@/services/redux/slice/appointments";
import { appointmentsSampleData } from "@/utils/sampleData";

const SimpleCalendar = ({ date }: { date: Date }) => {
    const dispatch = useDispatch()
    const appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const onDrop = (e: React.DragEvent, date?: Date) => {
        if (!date) return;
        const copiedDate = new Date(date)
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        const parsed: AppointmentType = JSON.parse(widgetType)
        const appointment: AppointmentType = {
            ...parsed,
            checkInDate: date,
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + parsed.checkInDays)),
        }
        dispatch(addAppointment(appointment))
    }
    const dragOver = (e: React.DragEvent) => e.preventDefault();
    const Days = getDays({ start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`), end: new Date(`${months[date.getMonth() + 1]} 01 ${date.getFullYear()}`) });
    const calendarWeeks = Array(6).fill(0)
    const calendarDays = Array(8).fill(0)
    let calendarDate: number | undefined = undefined;
    function getDayOfWeek(date: Date = new Date(), DayOfWeek = 7) {
        const dateCopy = new Date(date)
        var day = dateCopy.getDay() || 7;
        if (day !== DayOfWeek)
            dateCopy.setHours(-24 * (day - DayOfWeek));
        return dateCopy;
    }
    return (
        <div>
            <div className={styles.calendarWeek}>
                {calendarDays.map((d, i) => {
                    if (i === 0) return <div key={i} className={styles.calendarHeaderText0} />
                    return (
                        <div key={i} className={styles.calendarHeader}><span className={styles.calendarHeaderText}>{trunc(weekdays[i - 1], i === 3 || i === 5 ? 2 : 1, "")}</span></div>
                    )
                })}
            </div>
            {
                calendarWeeks.map((w, i) => {
                    return (
                        <div key={i} className={styles.calendarWeek}>
                            {calendarDays.map((d, ix) => {
                                const cellNum = (i + 1) * (ix); // column + 1 x row
                                if (calendarDate === undefined && Days[0] && cellNum > Days[0].getUTCDay()) calendarDate = 0;
                                const rangeDate = calendarDate && Days[calendarDate] !== undefined ? Days[calendarDate] : Days[0];
                                if (ix === 0) {
                                    // week range column
                                    var lastDay = new Date(new Date(rangeDate).getFullYear(), new Date(rangeDate).getMonth() + 1, 1);
                                    const from = getDayOfWeek(rangeDate, 1)
                                    const to = getDayOfWeek(rangeDate, 7)
                                    const toString = from.getDate().toString().length !== to.getDate().toString().length && to.getMonth() !== rangeDate.getMonth() ? ix === calendarDays.length ? "" : lastDay.getUTCDate() : to.getUTCDate()
                                    const fromString = from.getDate() > to.getDate() && from.getMonth() !== rangeDate.getMonth() ? "" : from.getUTCDate()
                                    const columnString = `${fromString} ${fromString !== "" ? "-" : ""} ${toString}`
                                    return (
                                        <div key={ix} className={styles.calendarWeekRange}>
                                            <p className={styles.calendarWeekRangeText}>
                                                {columnString}
                                            </p>
                                        </div>
                                    )
                                }
                                const currentDate = calendarDate !== undefined ? Days[calendarDate++] : undefined;
                                const appointment = dateIsScheduled({ date: currentDate, appointments })
                                let classes: string | undefined;
                                let style: React.CSSProperties | undefined

                                if (appointment && appointment.checkInDate && appointment.checkOutDate && currentDate) {
                                    let checkInString
                                    let checkOutString
                                    const bordersString = `2px solid ${appointment.color}`
                                    style = { borderTop: bordersString, borderBottom: bordersString }
                                    const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate() - 1}`
                                    if (appointment && appointment.checkInDate) checkInString = `${months[appointment.checkInDate.getMonth()]} ${appointment.checkInDate.getDate()}`
                                    if (appointment && appointment.checkOutDate) checkOutString = `${months[appointment.checkOutDate.getMonth()]} ${appointment.checkOutDate.getDate() - 1}`
                                    classes = [
                                        currentDate.getDate() > appointment.checkInDate.getDate() && currentDate.getDate() <= appointment.checkOutDate.getDate() ? styles.booked : styles.calendarDay,
                                        appointment.status === "Booked" ? styles.booked : styles.reserved,
                                        checkInString === currentDateString && styles.scheduledTail,
                                        checkOutString === currentDateString && styles.scheduledHead
                                    ].join(" ");
                                    if (checkInString === currentDateString) style = { ...style, borderLeft: bordersString }
                                    if (checkOutString === currentDateString) style = { ...style, borderRight: bordersString }
                                }
                                return (
                                    <div key={ix} className={styles.vacant} onDrop={(e) => onDrop(e, currentDate)} onDragOver={dragOver}>
                                        {appointment ? <div className={classes} style={style} onClick={() => alert(JSON.stringify(appointment))} /> : <div className={styles.vacantLine} />}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SimpleCalendar;