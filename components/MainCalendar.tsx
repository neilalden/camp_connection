"use client"
import React, { useState } from 'react'
import styles from "./MainCalendar.module.css"
import { arrayToMap, filterAppointment, getDays } from '@/utils/functions'
import { months, weekdays } from '@/utils/variables'
import Colors from '@/common/colors'
import { AmenityType, FilterType, AppointmentType, RoomType } from '@/types'
import Image from 'next/image'
import Images from '@/common/images'
import { DaysSampleData, FacilitiesSampleData, } from '@/utils/sampleData'
const calendarWeeks = Array(6).fill(0)
const calendarDays = Array(8).fill(0)

const MainCalendar = ({ date }: { date: Date }) => {
    const Days = getDays({ start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`), end: new Date(`${months[date.getMonth() + 1]} 01 ${date.getFullYear()}`) });
    let calendarDate: number | undefined = undefined;

    const [showHousingFilter, setShowHousingFilter] = useState<boolean>(false)
    const [showMeetingRoomsFilter, setShowMeetingRoomsFilter] = useState<boolean>(false)
    const [showAmenitiesFilter, setShowAmenitiesFilter] = useState<boolean>(false)
    const [showGroupsFilter, setShowGroupsFilter] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState<Array<FilterType>>([])
    return (
        <div className={styles.row}>
            <div className={styles.filterContainer}>
                <button type='button' className={styles.filterCategoryContainer} onClick={() => {
                    setShowHousingFilter(prev => !prev)
                }}>
                    <h4 className={styles.filterCategoryTitle}>Housing</h4>
                    <Image alt="Chevron up" src={showHousingFilter ? Images.ic_chevron_up : Images.ic_chevron_down} height={9} />
                </button>
                {showHousingFilter ?
                    <div>
                        {
                            FacilitiesSampleData && FacilitiesSampleData.housing.buildings?.map((building, i) => {
                                return (
                                    <div key={i}>
                                        {/* <input id={building.id} type="checkbox" onClick={() => setSelectedFilters([building.name])} /> */}
                                        <label htmlFor={building.id} className="pointer">{building.name}</label>
                                    </div>

                                )
                            })
                        }
                    </div>
                    : null}

                <button type='button' className={styles.filterCategoryContainer} onClick={() => {
                    setShowAmenitiesFilter(prev => !prev)
                }}>
                    <h4 className={styles.filterCategoryTitle}>Amenities</h4>
                    <Image alt="Chevron up" src={showAmenitiesFilter ? Images.ic_chevron_up : Images.ic_chevron_down} height={9} />
                </button>
                {showAmenitiesFilter ?
                    <div>
                        {
                            FacilitiesSampleData.amenities.activities && FacilitiesSampleData.amenities?.activities.map((activity, i) => {
                                return (
                                    <div key={i}>
                                        {/* <input id={activity.id} type="checkbox" onClick={() => setSelectedFilters([activity])

                                        } /> */}
                                        <label htmlFor={activity.id} className="pointer">{activity.name}</label>
                                    </div>

                                )
                            })
                        }
                    </div>
                    : null}
            </div>
            <div>
                <div className={styles.calendarWeek}>
                    {calendarDays.map((d, i) => {
                        if (i === 0) return <div key={i} className={styles.calendarHeader0} />
                        return (
                            <div key={i} className={styles.calendarHeader}><span className={styles.calendarHeaderText}>{weekdays[i - 1]}</span></div>
                        )
                    })}
                </div>
                {
                    calendarWeeks.map((w, i) => {

                        return (
                            <div key={i} className={styles.calendarWeek}>
                                {calendarDays.map((d, ix) => {

                                    const cellNum = (i + 1) * (ix); // basta kaylangan
                                    if (calendarDate === undefined && cellNum > Days[0].getDay()) calendarDate = 0; // basta kaylangan

                                    if (ix === 0) return (
                                        <div key={ix} className={styles.selectedFilter}>
                                            <br />
                                            {
                                                selectedFilters?.map((selectedFilter, idx) => {
                                                    return (
                                                        <p key={idx} className={styles.selectedFilterText}>{selectedFilter.name}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                    const currentDate = calendarDate !== undefined && Days[calendarDate++];
                                    return (
                                        <div key={ix} className={styles.calendarDay}>
                                            <span className={styles.calendarDate}>{currentDate ? currentDate.getDate() : ""}</span>
                                            <div className={styles.space} />
                                            {
                                                currentDate && selectedFilters.map((selectedFilter, idx) => {
                                                    const lastChecked = new Set<AppointmentType["id"]>();
                                                    // const appointment = [appointmentsSampleData].find((r) => {
                                                    //     const matched = r.checkInDate && r.checkOutDate && currentDate > r.checkInDate && currentDate <= r?.checkOutDate
                                                    //     if (matched && !lastChecked.has(r.id)) {
                                                    //         lastChecked.add(r.id)
                                                    //         return true
                                                    //     }
                                                    //     return false
                                                    // })
                                                    const appointment: AppointmentType = {
                                                        id: "appointment1",
                                                        status: "Reserved",
                                                        checkInDate: new Date("July 05 2023"),
                                                        checkOutDate: new Date("July 10 2023"),
                                                        checkInDays: 3,
                                                        createdAt: new Date(),
                                                        activitySchedule: [],
                                                        groupId: "",
                                                        mealSchedule: [],
                                                        meetingRoomSchedule: [],
                                                        retreatCenterId: "",
                                                        roomSchedule: []
                                                    }
                                                    let checkInString
                                                    let checkOutString
                                                    const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate() - 1}`
                                                    if (appointment && appointment.checkInDate) checkInString = `${months[appointment.checkInDate.getMonth()]} ${appointment.checkInDate.getDate()}`
                                                    if (appointment && appointment.checkOutDate) checkOutString = `${months[appointment.checkOutDate.getMonth()]} ${appointment.checkOutDate.getDate() - 1}`

                                                    return (
                                                        <div key={idx} className={styles.vacant} onClick={() => appointment ? alert(appointment) : ""}>
                                                            {
                                                                appointment && filterAppointment({ appointment: appointment, selectedFilter }) ? <div className={[appointment.status === "Booked" ? styles.booked : styles.reserved, checkInString === currentDateString && styles.scheduledTail, checkOutString === currentDateString && styles.scheduledHead].join(" ")} id={appointment.id} /> : <div className={styles.vacantLine} />
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default MainCalendar