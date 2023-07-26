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
import CalendarNavigation from '@/components/CalendarNavigation'
import { addLead } from '@/services/redux/slice/leads'
import LeadsColumn from '@/components/LeadsColumn'
import SimpleCalendar from '@/components/SimpleCalendar'
import MainCalendar from '@/components/MainCalendar'
import Divider from '@/components/Divider'
import { getNextMonth, getPrevMonth, trunc } from '@/utils/functions'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'

const CalendarPage = () => {
  const retreatCenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
  // const RetreatCenter = retreatCenters["Eatern Point Retreat House"]
  const RetreatCenter = retreatCenters[0]
  const [date, setDate] = useState<Date>(new Date())
  const [progress, setProgress] = useState(66);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<AppointmentType>()

  const clickLead = (appointment: AppointmentType) => {
    setCurrentAppointment(appointment)
    setModalIsVisible(true)
  }
  if (!RetreatCenter) return;
  return (
    <div className={styles.container}>
      {modalIsVisible ? <Modal setIsVisible={setModalIsVisible} appointment={currentAppointment} /> : null}
      <div className={styles.heading}>
        <h3 className={styles.overviewTitle}>Overview</h3>
      </div>
      <MainCalendar date={date} />

    </div>
  )
}



export default CalendarPage