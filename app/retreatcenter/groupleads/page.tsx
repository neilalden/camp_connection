"use client";
import { RootState } from "@/services/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Colors from "@/common/colors";
import { months, weekdays } from "@/utils/variables";
import { AppointmentType, SetStateType } from "@/types";
import CalendarNavigation from "@/components/CalendarNavigation";
import { createLead, setCurrentLead } from "@/services/redux/slice/leads";
import LeadsColumn from "@/components/LeadsColumn";
import SimpleCalendar from "@/components/SimpleCalendar";
import MainCalendar from "@/components/MainCalendar";
import Divider from "@/components/Divider";
import { getDays, getLastDayOfMonth, getNextMonth, getPrevMonth, trunc } from "@/utils/functions";
import TextInput from "@/components/TextInput";
import AppointmentModal from "@/components/AppointmentModal";
import { setCurrentCamperGroup } from "@/services/redux/slice/campergroups";
import { setRetreatCenter } from "@/services/redux/slice/retreatcenters";
import appointments from "@/services/redux/slice/appointments";

const GroupLeads = () => {
  const dispatch = useDispatch();
  const Appointments = useSelector((state: RootState) => state.Appointments.appointments);
  const Leads = useSelector((state: RootState) => state.Leads.leads);
  const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
  const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups);

  const [date, setDate] = useState<Date>(new Date());
  const [progress, setProgress] = useState(66);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [midweekBedStyleCapacity, setMidweekBedStyleCapacity] = useState<{ [bedstyle: string]: number }>({})
  const [weekendBedStyleCapacity, setWeekendBedStyleCapacity] = useState<{ [bedstyle: string]: number }>({})


  const AppointmentsInThisSched = Appointments.filter((a) =>
  // @ts-ignore 
  ((new Date(a.checkInDate).getMonth() === date.getMonth() && new Date(a.checkInDate).getFullYear() === date.getFullYear())
    && a.retreatCenterId === RetreatCenter.id
  ))


  const clickLead = (appointment: AppointmentType) => {
    const group = CamperGroups.find(cg => cg.id === appointment.groupId)
    dispatch(setRetreatCenter(RetreatCenter))
    dispatch(setCurrentLead(appointment));
    dispatch(setCurrentCamperGroup(group));
    setModalIsVisible(true);
  };
  if (!RetreatCenter) return;
  useEffect(() => {
    AppointmentsInThisSched.forEach((appointment) => {
      if (!appointment.checkInDate || !appointment.checkOutDate) return;
      const appointmentHitsWeekend = getDays({ start: new Date(appointment.checkInDate), end: new Date(appointment.checkOutDate) }).some(date => date.getDay() === 0 || date.getDay() === 6)
      const appointmentHitsMidweek = getDays({ start: new Date(appointment.checkInDate), end: new Date(appointment.checkOutDate) }).some(date => date.getDay() !== 0 || date.getDay() !== 6)
      const bedObj: { [key: string]: number } = {}
      appointment.roomSchedule.forEach((shed) => shed.rooms.forEach((room) => room.beds.forEach(bed => {
        bedObj[bed.name] = (bedObj[bed.name] ?? 0) + bed.amount
      })))
      if (appointmentHitsWeekend) setWeekendBedStyleCapacity(bedObj)
      if (appointmentHitsMidweek) setMidweekBedStyleCapacity(bedObj)
    })
  }, [Appointments, Leads])
  return (

    <div className={styles.container}>
      {modalIsVisible ? <AppointmentModal setIsVisible={setModalIsVisible} /> : null}
      <div className={styles.leadColumn}>
        <LeadsColumn leadCardOnClick={clickLead} showZipCode={false} />
      </div>
      <div className={styles.groupleadsContainer}>
        <CalendarNavigation date={date} setDate={setDate} />
        <div className="row w-100p">

          <div className={[styles.calendarColumn, "select-none"].join(" ")}>
            <div className={styles.calendarContainer}>
              <div className={styles.progressbarsContainer}>
                <div className="row">
                  <div className="row">
                    <div className={styles.progressbarContainer}>
                      <CircularProgressbar
                        value={progress}
                        styles={{
                          trail: {
                            strokeWidth: 1,
                          },
                          path: {
                            stroke: Colors.chalky500,
                          },
                        }}
                      />
                    </div>
                    <div>
                      <p className={styles.progressText}>{progress}%</p>
                      <p className={styles.progressText}>Weekend</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className={styles.progressbarContainer}>
                      <CircularProgressbar
                        value={progress}
                        styles={{
                          trail: {
                            strokeWidth: 1,
                          },
                          path: {
                            stroke: Colors.yellow500,
                          },
                        }}
                      />
                    </div>
                    <div>
                      <p className={styles.progressText}>{progress}%</p>
                      <p className={styles.progressText}>Mid-week</p>
                    </div>
                  </div>
                </div>
                <p className={styles.monthTitle}>{months[date.getMonth()]}</p>
              </div>
              <SimpleCalendar date={date} RetreatCenter={RetreatCenter} />
            </div>
            <Divider className={styles.divider} />
            {/* ------------------------------ */}
            <div className={styles.bottomCalendarContainer}>
              <div className={styles.prevCalendarContainer}>
                <div className={styles.progressbarsContainer}>
                  <div className="row">
                    <div className="row">
                      <div className={styles.bottomProgressbarContainer}>
                        <CircularProgressbar
                          value={progress}
                          styles={{
                            trail: {
                              strokeWidth: 1,
                            },
                            path: {
                              stroke: Colors.chalky500,
                            },
                          }}
                        />
                      </div>
                      <div>
                        <p className={styles.bottomProgressText}>{progress}%</p>
                        <p className={styles.bottomProgressText}>Weekend</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className={styles.bottomProgressbarContainer}>
                        <CircularProgressbar
                          value={progress}
                          styles={{
                            trail: {
                              strokeWidth: 1,
                            },
                            path: {
                              stroke: Colors.yellow500,
                            },
                          }}
                        />
                      </div>
                      <div>
                        <p className={styles.bottomProgressText}>{progress}%</p>
                        <p className={styles.bottomProgressText}>Mid-week</p>
                      </div>
                    </div>
                  </div>
                  <p className={styles.bottomMonthTitle}>
                    {trunc(months[getPrevMonth(date.getMonth())], 3, "")}
                  </p>
                </div>
                <SimpleCalendar
                  date={
                    new Date(
                      new Date(date).setMonth(new Date(date).getMonth() - 1)
                    )
                  }
                  RetreatCenter={RetreatCenter}
                />
              </div>

              <Divider className={styles.dividerVert} />

              <div className={styles.nextCalendarContainer}>
                <div className={styles.progressbarsContainer}>
                  <div className="row">
                    <div className="row">
                      <div className={styles.bottomProgressbarContainer}>
                        <CircularProgressbar
                          value={progress}
                          styles={{
                            trail: {
                              strokeWidth: 1,
                            },
                            path: {
                              stroke: Colors.chalky500,
                            },
                          }}
                        />
                      </div>
                      <div>
                        <p className={styles.bottomProgressText}>{progress}%</p>
                        <p className={styles.bottomProgressText}>Weekend</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className={styles.bottomProgressbarContainer}>
                        <CircularProgressbar
                          value={progress}
                          styles={{
                            trail: {
                              strokeWidth: 1,
                            },
                            path: {
                              stroke: Colors.yellow500,
                            },
                          }}
                        />
                      </div>
                      <div>
                        <p className={styles.bottomProgressText}>{progress}%</p>
                        <p className={styles.bottomProgressText}>Mid-week</p>
                      </div>
                    </div>
                  </div>
                  <p className={styles.bottomMonthTitle}>
                    {trunc(months[getNextMonth(date.getMonth())], 3, "")}
                  </p>
                </div>
                <SimpleCalendar
                  date={
                    new Date(
                      new Date(date).setMonth(new Date(date).getMonth() + 1)
                    )
                  }
                  RetreatCenter={RetreatCenter}
                />
              </div>
            </div>
          </div>

          <div className={styles.groupsContainer} style={{ width: "40%" }}>
            <div className="row-between" style={{ width: "100%" }}>
              <div className="col-center" style={{ width: "50%" }}>
                <div className={styles.groupsHeading}>
                  <h3 className={styles.groupsTitle}>Mid-Week</h3>
                </div>
                {RetreatCenter.bedStyles?.map((bedstyle, i) => {
                  const totalAmount = Number(RetreatCenter.housing.buildings?.reduce((accum, bldg) => accum + ([...bldg.rooms ?? []].reduce((accu, room) => accu + room?.beds?.reduce((acc, bed) => bed.name === bedstyle.name ? acc + bed.amount : acc + 0, 0), accum)), 0) ?? 0)
                  const value = (midweekBedStyleCapacity[bedstyle.name]) ?? 0
                  const valueOverCapacity = isNaN(value / totalAmount) ? 0 : Number(((value / totalAmount * 100)).toFixed(0))
                  return (
                    <div key={i} className="row" style={{ height: "70px", width: "200px", minWidth: "150px", margin: "10px", }}>
                      <div style={{ height: "50px", width: "50px", marginRight: "10px" }}>
                        <CircularProgressbar
                          value={value}
                          maxValue={value === 0 && totalAmount === 0 ? 1 : totalAmount}
                          text={valueOverCapacity + "%"}
                          styles={{
                            trail: {
                              strokeWidth: 1,
                            },
                            path: {
                              stroke: valueOverCapacity > 95 ? Colors.red500 : valueOverCapacity > 80 ? Colors.yellow500 : valueOverCapacity > 50 ? Colors.chalky500 : Colors.green400,
                            },
                            text: {
                              fontSize: 27
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h3>{bedstyle.name}</h3>
                        <p>{totalAmount - (midweekBedStyleCapacity[bedstyle.name] ?? 0)}</p>
                      </div>
                    </div>
                  );
                  // })
                })}
              </div>
              <div className="col-center" style={{ width: "50%" }}>
                <div className={styles.groupsHeading}>
                  <h3 className={styles.groupsTitle}>Weekends</h3>
                </div>
                {RetreatCenter.bedStyles?.map((bedstyle, i) => {
                  // const midweekbookings = Appointments.reduce((accum, appointment) => {
                  //   if (!appointment.checkInDate || !appointment.checkOutDate) return 0
                  //   return accum + getDays({ start: new Date(appointment.checkInDate), end: new Date(appointment.checkOutDate) }).reduce((accu, date) => {

                  //     if (date.getDay() == 0 || date.getDay() == 6) return accu + 0
                  //     if (!CamperGroups || !appointment) return accu + 0
                  //     // @ts-ignore
                  //     else return accu + CamperGroups.find((cg) => cg.id === appointment.groupId).groupSize ?? 0


                  //   }, accum)
                  // }, 0)
                  // return bedstyle.map((room, ix) => {

                  // const occupiedDays = Appointments.filter(ap =>
                  //   ap.checkInDate?.getMonth() === date.getMonth() &&
                  //   ap.retreatCenterId === RetreatCenter.id).reduce((accum, ap) =>
                  //     accum + (ap.roomSchedule.some((sched) =>
                  //       (sched.rooms.some(rm => rm.id === room.id))) ?
                  //       ap.checkInDays : 0), 0)

                  const totalAmount = Number(RetreatCenter.housing.buildings?.reduce((accum, bldg) => accum + ([...bldg.rooms ?? []].reduce((accu, room) => accu + room?.beds?.reduce((acc, bed) => bed.name === bedstyle.name ? acc + bed.amount : acc + 0, 0), accum)), 0) ?? 0)
                  const value = (weekendBedStyleCapacity[bedstyle.name]) ?? 0
                  const valueOverCapacity = isNaN(value / totalAmount) ? 0 : Number(((value / totalAmount * 100)).toFixed(0))
                  return (
                    <div key={i} className="row" style={{ height: "70px", width: "200px", minWidth: "150px", margin: "10px", }}>
                      <div style={{ height: "50px", width: "50px", marginRight: "10px" }}>
                        <CircularProgressbar
                          value={value}
                          maxValue={value === 0 && totalAmount === 0 ? 1 : totalAmount}
                          text={valueOverCapacity + "%"}
                          styles={{
                            trail: {
                              strokeWidth: 1,
                            },
                            path: {
                              stroke: valueOverCapacity > 95 ? Colors.red500 : valueOverCapacity > 80 ? Colors.yellow500 : valueOverCapacity > 50 ? Colors.chalky500 : Colors.green400,
                            },
                            text: {
                              fontSize: 27
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h3>{bedstyle.name}</h3>
                        <p>{totalAmount - (weekendBedStyleCapacity[bedstyle.name] ?? 0)}</p>
                      </div>
                    </div>
                  );
                  // })
                })}
              </div>

            </div>

            <div className={styles.groupsHeading}>
              <h3 className={styles.groupsTitle}>Groups</h3>
            </div>
            <div
              className="row-evenly flow-wrap w-100p"
            >
              {AppointmentsInThisSched.map((appointment, i) => {
                const group = CamperGroups.find(cg => cg.id === appointment.groupId)
                return (
                  <button
                    key={i}
                    type="button"
                    className={styles.groupCard}
                    onClick={() => clickLead(appointment)}
                    style={{ background: group?.color }}
                  >
                    <h3>{group?.groupName}</h3>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupLeads;
