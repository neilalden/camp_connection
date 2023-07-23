import { AppointmentType, SetStateType } from "@/types";
import { dateIsScheduled, getDays, trunc } from "@/utils/functions";
import { months, weekdays } from "@/utils/variables";
import styles from "./SimpleCalendar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { appointmentsSampleData, RetreatCenterType } from "@/utils/sampleData";
import { addAppointment } from "@/services/redux/slice/retreatcenters";
import { useEffect, useState } from "react";
import { removeLead } from "@/services/redux/slice/leads";

const SimpleCalendar = ({ date, RetreatCenter }: { date: Date, RetreatCenter: RetreatCenterType }) => {
    const dispatch = useDispatch()
    const onDrop = (e: React.DragEvent, date?: Date) => {
        if (!date) return;
        const copiedDate = new Date(date)
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        const parsed: AppointmentType = JSON.parse(widgetType)
        if (parsed.status === undefined) return; // it means that the data from drop is not an appointment
        const appointment: AppointmentType = {
            ...parsed,
            checkInDate: new Date(copiedDate.setDate(copiedDate.getDate() + 1)),
            checkOutDate: new Date(copiedDate.setDate(copiedDate.getDate() + parsed.checkInDays - 1)),
        }
        dispatch(addAppointment({
            retreatCenterId: RetreatCenter.id,
            appointment: appointment
        }))
        dispatch(removeLead(appointment.id))
    }
    const dragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }
    const endDate = () => {
        if (date.getMonth() === 11) return new Date(`${months[0]} 01 ${date.getFullYear() + 1}`)
        else return new Date(`${months[date.getMonth() + 1]} 01 ${date.getFullYear()}`)
    }
    const Days = getDays({ start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`), end: endDate() });
    const calendarWeeks = Array(6).fill(0)
    const calendarDays = Array(8).fill(0)
    let calendarDate: number | undefined = undefined;
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
                                const appointment = dateIsScheduled({ date: currentDate, appointments: RetreatCenter.appointments })
                                let classes: string | undefined;
                                let style: React.CSSProperties | undefined

                                if (appointment && !Array.isArray(appointment) && appointment.checkInDate && appointment.checkOutDate && currentDate) {
                                    const bordersString = `2px solid ${appointment.color}`
                                    style = { borderTop: bordersString, borderBottom: bordersString }

                                    let checkInString
                                    let checkOutString
                                    const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate() + 1}`
                                    if (appointment && appointment.checkInDate) {
                                        checkInString = `${months[appointment.checkInDate.getMonth()]} ${appointment.checkInDate.getDate()}`
                                    }
                                    if (appointment && appointment.checkOutDate) {
                                        checkOutString = `${months[appointment.checkOutDate.getMonth()]} ${appointment.checkOutDate.getDate()}`
                                    }
                                    classes = [
                                        currentDate.getDate() > appointment.checkInDate.getDate() && currentDate.getDate() <= appointment.checkOutDate.getDate() ? styles.booked : styles.calendarDay,
                                        appointment.status === "Booked" ? styles.booked : styles.reserved,
                                        checkInString == currentDateString && styles.scheduledTail,
                                        checkOutString === currentDateString && styles.scheduledHead
                                    ].join(" ");
                                    if (checkInString === currentDateString) style = { ...style, borderLeft: bordersString }
                                    if (checkOutString === currentDateString) style = { ...style, borderRight: bordersString }
                                }

                                if ((i >= 4 && firstDayOfWeek < 8) || i === 0 && !currentDate) return <div key={ix} className={[styles.vacant, styles.calendarDate].join(" ")} onDrop={(e) => onDrop(e, currentDate)} onDragOver={dragOver} />;
                                return (
                                    <div key={ix} className={[styles.vacant, styles.calendarDate].join(" ")} onDrop={(e) => onDrop(e, currentDate)} onDragOver={dragOver}>
                                        {/* <span className={styles.calendarDate}>{currentDate ? currentDate.getDate() : ""}</span> */}
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