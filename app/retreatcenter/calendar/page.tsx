"use client"
import { RootState } from '@/services/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '@/common/colors'
import { months, weekdays } from '@/utils/variables'
import { AppointmentType, SetStateType } from '@/types'
import { appointmentsSampleData } from '@/utils/sampleData'
import CalendarNavigation from '@/components/CalendarNavigation'
import { addLead } from '@/services/redux/slice/leads'
import LeadsColumn from '@/components/LeadsColumn'
import SimpleCalendar from '@/components/SimpleCalendar'
import MainCalendar from '@/components/MainCalendar'

const CalendarPage = () => {
  const appointments = useSelector((state: RootState) => state.Appointments.appointments)
  const [date, setDate] = useState<Date>(new Date())
  const [progress, setProgress] = useState(66);


  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3 className={styles.overviewTitle}>Overview</h3>
      </div>
      <div className={styles.mainRow}>
        <LeadsColumn />
        <div className={styles.calendarColumn}>
          <CalendarNavigation date={date} setDate={setDate} />
          <div className={styles.progressbarContainer}>
            <CircularProgressbar value={progress} text={`${progress}%`} styles={{
              trail: {
                strokeWidth: 1
              },
              path: {
                stroke: Colors.green300,
              }
            }} />
          </div>

          <div className={styles.calendarContainer}>
            {/* <SimpleCalendar date={date} /> */}
            <MainCalendar date={date} />
          </div>
        </div>
      </div>
    </div>
  )
}



export default CalendarPage