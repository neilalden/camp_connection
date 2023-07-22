"use client"
import { SetStateType, HTMLEvent } from "@/types"
import { trunc } from "@/utils/functions"
import { months } from "@/utils/variables"
import styles from "./CalendarNavigation.module.css"

const CalendarNavigation = ({ date, setDate }: { date: Date, setDate: SetStateType<Date> }) => {
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth()

    function checkScrollDirectionIsUp(event: any) {
        if (event.wheelDelta) {
            return event.wheelDelta > 0;
        }
        return event.deltaY < 0;
    }

    const ml = months.length
    const yearItems = [year - 1, year, year + 1]
    const monthItems = [month - 3 < 0 ? months[month + ml - 3] : months[month - 3], month - 2 < 0 ? months[month + ml - 2] : months[month - 2], month - 1 < 0 ? months[month + ml - 1] : months[month - 1], months[month], month + 1 >= ml ? months[month - ml + 1] : months[month + 1], month + 2 >= ml ? months[month - ml + 2] : months[month + 2], month + 3 >= ml ? months[month - ml + 3] : months[month + 3]];

    return (
        <div className={[styles.calendarNavigation, "disable-scroll"].join(" ")}>
            <div
                className={styles.calendarNavigationYear}
                onWheel={(e: React.WheelEvent) => {
                    const isUp = checkScrollDirectionIsUp(e);
                    setDate(new Date(`${months[month]} 01 ${isUp ? year + 1 : year - 1}`));
                }}
            >
                {
                    yearItems.map((y, i) => {
                        return <button key={i} type='button' className={[styles.calendarNavigationItem, y === year && styles.calendarNavigationItemActive, i === 0 && styles.firstCalendarItem, i === 2 && styles.lastCalendarItem].join(" ")} onClick={() => { setDate(new Date(`${months[month]} 01 ${y}`)) }}>{y}</button>
                    })
                }
            </div>
            <div className={styles.line} />

            <div
                className={styles.calendarNavigationYear}
                onWheel={(e: React.WheelEvent) => {
                    const isUp = checkScrollDirectionIsUp(e);
                    let m = month + (isUp ? 1 : -1)
                    if (m > 11) m = 0;
                    if (m < 0) m = 11
                    setDate(new Date(`${months[m]} 01 ${year}`));
                }}
            >
                {
                    monthItems.map((m, i) => {
                        return <button key={i} type='button' className={[styles.calendarNavigationItem, m === months[month] && styles.calendarNavigationItemActive, i === 0 && styles.firstCalendarItem, i === 6 && styles.lastCalendarItem].join(" ")} onClick={() => { setDate(new Date(`${m} 01 ${year}`)) }}>{trunc(m, 3, "")}</button>
                    })
                }
            </div>
        </div>
    )
}

export default CalendarNavigation;