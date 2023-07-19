"use client"
import React, { useState } from 'react'
import styles from "./MainCalendar.module.css"
import { arrayToMap, filterReservation, getDays } from '@/utils/functions'
import { months, weekdays } from '@/utils/variables'
import Colors from '@/common/colors'
import { AmenityType, FilterType, ReservationType, RoomType } from '@/types'
import Image from 'next/image'
import Images from '@/common/images'
import { DaysSampleData, FacilitiesSampleData, reservationsSampleData, } from '@/utils/sampleData'
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
                    <Image src={showHousingFilter ? Images.ic_chevron_up : Images.ic_chevron_down} height={9} alt={showHousingFilter ? "Chevron up" : "Chevron down"} />
                </button>
                {showHousingFilter ?
                    <div>
                        {
                            FacilitiesSampleData["housing"]["buildings"].map((building, i) => {
                                return (
                                    <div key={i}>
                                        <input id={building.id} type="checkbox" onClick={() => setSelectedFilters([building])} />
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
                    <Image src={showAmenitiesFilter ? Images.ic_chevron_up : Images.ic_chevron_down} height={9} alt={showAmenitiesFilter ? "Chevron up" : "Chevron down"} />
                </button>
                {showAmenitiesFilter ?
                    <div>
                        {
                            FacilitiesSampleData["amenities"]["activities"].map((activity, i) => {
                                return (
                                    <div key={i}>
                                        <input id={activity.id} type="checkbox" onClick={() => setSelectedFilters([activity])

                                        } />
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
                                    if (calendarDate === undefined && cellNum > Days[0].getUTCDay()) calendarDate = 0; // basta kaylangan

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
                                            <span className={styles.calendarDate}>{currentDate ? currentDate.getUTCDate() : ""}</span>
                                            <div className={styles.space} />
                                            {
                                                currentDate && selectedFilters.map((selectedFilter, idx) => {
                                                    const lastChecked = new Set<ReservationType["id"]>();
                                                    const reservation = reservationsSampleData.find((r) => {
                                                        const matched = r.checkInDate && r.checkOutDate && currentDate > r.checkInDate && currentDate <= r?.checkOutDate
                                                        if (matched && !lastChecked.has(r.id)) {
                                                            lastChecked.add(r.id)
                                                            return true
                                                        }
                                                        return false
                                                    })
                                                    let checkInString
                                                    let checkOutString
                                                    const currentDateString = `${months[currentDate.getMonth()]} ${currentDate.getDate() - 1}`
                                                    if (reservation && reservation.checkInDate) checkInString = `${months[reservation.checkInDate.getMonth()]} ${reservation.checkInDate.getDate()}`
                                                    if (reservation && reservation.checkOutDate) checkOutString = `${months[reservation.checkOutDate.getMonth()]} ${reservation.checkOutDate.getDate() - 1}`

                                                    return (
                                                        <div key={idx} className={styles.vacant}>
                                                            {
                                                                reservation && filterReservation({ reservation: reservation, selectedFilter }) ? <div className={[reservation.status === "Booked" ? styles.booked : styles.reserved, checkInString === currentDateString && styles.scheduledTail, checkOutString === currentDateString && styles.scheduledHead].join(" ")} id={reservation.id} /> : <div className={styles.vacantLine} />
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