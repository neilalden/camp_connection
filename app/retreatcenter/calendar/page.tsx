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
import TextInputBase from '@/components/TextInputBase'
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
      {modalIsVisible ? <Modal setIsVisible={setModalIsVisible} data={currentAppointment} /> : null}
      <div className={styles.heading}>
        <h3 className={styles.overviewTitle}>Overview</h3>
      </div>
      <div className={styles.mainRow}>
        <LeadsColumn leadCardOnClick={clickLead} />
        <div className={styles.calendarColumn}>
          <CalendarNavigation date={date} setDate={setDate} />
          <div className={styles.calendarContainer}>
            <div className={styles.progressbarsContainer}>
              <div className="row">

                <div className='row'>
                  <div className={styles.progressbarContainer}>
                    <CircularProgressbar value={progress} styles={{
                      trail: {
                        strokeWidth: 1
                      },
                      path: {
                        stroke: Colors.green300,
                      }
                    }} />
                  </div>
                  <div>
                    <p className={styles.progressText}>{progress}%</p>
                    <p className={styles.progressText}>Weekend</p>
                  </div>
                </div>
                <div className='row'>
                  <div className={styles.progressbarContainer}>
                    <CircularProgressbar value={progress} styles={{
                      trail: {
                        strokeWidth: 1
                      },
                      path: {
                        stroke: Colors.yellow300,
                      }
                    }} />
                  </div>
                  <div>
                    <p className={styles.progressText}>{progress}%</p>
                    <p className={styles.progressText}>Weekend</p>
                  </div>
                </div>
              </div>
              <p className={styles.monthTitle}>{months[date.getMonth()]}</p>
            </div>
            <SimpleCalendar date={date} RetreatCenter={RetreatCenter} />
          </div>
          <Divider className={styles.divider} />
          {/* ------------------------------ */}
          <div className="row">
            <div className={styles.prevCalendarContainer}>
              <div className={styles.progressbarsContainer}>
                <div className='row'>
                  <div className='row'>
                    <div className={styles.bottomProgressbarContainer}>
                      <CircularProgressbar value={progress} styles={{
                        trail: {
                          strokeWidth: 1
                        },
                        path: {
                          stroke: Colors.green300,
                        }
                      }} />
                    </div>
                    <div>
                      <p className={styles.bottomProgressText}>{progress}%</p>
                      <p className={styles.bottomProgressText}>Weekend</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={styles.bottomProgressbarContainer}>
                      <CircularProgressbar value={progress} styles={{
                        trail: {
                          strokeWidth: 1
                        },
                        path: {
                          stroke: Colors.yellow300,
                        }
                      }} />
                    </div>
                    <div>
                      <p className={styles.bottomProgressText}>{progress}%</p>
                      <p className={styles.bottomProgressText}>Weekend</p>
                    </div>
                  </div>
                </div>
                <p className={styles.bottomMonthTitle}>{trunc(months[getPrevMonth(date.getMonth())], 3, "")}</p>
              </div>
              <SimpleCalendar date={new Date(new Date(date).setMonth(new Date(date).getMonth() - 1))} RetreatCenter={RetreatCenter} />
            </div>
            <Divider className={styles.dividerVert} />

            <div className={styles.nextCalendarContainer}>
              <div className={styles.progressbarsContainer}>
                <div className='row'>
                  <div className='row'>
                    <div className={styles.bottomProgressbarContainer}>
                      <CircularProgressbar value={progress} styles={{
                        trail: {
                          strokeWidth: 1
                        },
                        path: {
                          stroke: Colors.green300,
                        }
                      }} />
                    </div>
                    <div>
                      <p className={styles.bottomProgressText}>{progress}%</p>
                      <p className={styles.bottomProgressText}>Weekend</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={styles.bottomProgressbarContainer}>
                      <CircularProgressbar value={progress} styles={{
                        trail: {
                          strokeWidth: 1
                        },
                        path: {
                          stroke: Colors.yellow300,
                        }
                      }} />
                    </div>
                    <div>
                      <p className={styles.bottomProgressText}>{progress}%</p>
                      <p className={styles.bottomProgressText}>Weekend</p>
                    </div>
                  </div>
                </div>
                <p className={styles.bottomMonthTitle}>{trunc(months[getNextMonth(date.getMonth())], 3, "")}</p>
              </div>
              <SimpleCalendar date={new Date(new Date(date).setMonth(new Date(date).getMonth() + 1))} RetreatCenter={RetreatCenter} />

            </div>
          </div>
        </div>
        <div className={styles.groupsContainer}>
          <div className={styles.groupsHeading}>
            <h3 className={styles.groupsTitle}>Groups</h3>
          </div>
          {
            RetreatCenter && RetreatCenter?.appointments?.map((appointment, i) => {
              return (
                <button
                  key={i}
                  type='button'
                  className={styles.groupCard}
                  onClick={() => clickLead(appointment)}
                  style={{ background: appointment.color }}
                >
                  <h3>{appointment.groupName}</h3>
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}



export default CalendarPage