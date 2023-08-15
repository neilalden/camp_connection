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
import { getLastDayOfMonth, getNextMonth, getPrevMonth, trunc } from "@/utils/functions";
import TextInput from "@/components/TextInput";
import AppointmentModal from "@/components/AppointmentModal";
import { setCurrentCamperGroup } from "@/services/redux/slice/campergroups";
import { setRetreatCenter } from "@/services/redux/slice/retreatcenters";

const GroupLeads = () => {
  const dispatch = useDispatch();
  const Appointments = useSelector((state: RootState) => state.Appointments.appointments);
  const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
  const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups);
  const [date, setDate] = useState<Date>(new Date());
  const [progress, setProgress] = useState(66);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const clickLead = (appointment: AppointmentType) => {
    const group = CamperGroups.find(cg => cg.id === appointment.groupId)
    dispatch(setRetreatCenter(RetreatCenter))
    dispatch(setCurrentLead(appointment));
    dispatch(setCurrentCamperGroup(group));
    setModalIsVisible(true);
  };
  if (!RetreatCenter) return;

  return (

    <div className={styles.container}>
      {modalIsVisible ? <AppointmentModal setIsVisible={setModalIsVisible} /> : null}
      <div className={styles.leadColumn}>
        <LeadsColumn leadCardOnClick={clickLead} showZipCode={false} />
      </div>
      <div className={styles.groupleadsContainer}>
        <CalendarNavigation date={date} setDate={setDate} />
        <div className="row">

          <div className={styles.calendarColumn}>
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
              <div style={{ width: "50%" }}>
                <div className={styles.groupsHeading}>
                  <h3 className={styles.groupsTitle}>Mid-Week</h3>
                </div>
                {RetreatCenter.bedStyles?.map((bedstyle, i) => {
                  const totalAmount = Number(RetreatCenter.housing.buildings?.reduce((accum, bldg) => accum + ([...bldg.rooms ?? []].reduce((accu, room) => accu + room?.beds?.reduce((acc, bed) => bed.name === bedstyle.name ? acc + bedstyle.amount : acc + 0, 0), accum)), 0))

                  return (
                    <div key={i} className="row" style={{ height: "70px", width: "100%", margin: "10px 5px" }}>
                      <div style={{ height: "40px", width: "40px", marginRight: "10px" }}>
                        <CircularProgressbar
                          value={totalAmount}
                          maxValue={totalAmount}
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
                        <h3>{bedstyle.name}</h3>
                        <p>{totalAmount}</p>
                      </div>
                    </div>
                  );
                  // })
                })}
              </div>
              <div style={{ width: "50%" }}>
                <div className={styles.groupsHeading}>
                  <h3 className={styles.groupsTitle}>Weekends</h3>
                </div>
                {RetreatCenter.bedStyles?.map((bedstyle, i) => {
                  const totalAmount = Number(RetreatCenter.housing.buildings?.reduce((accum, bldg) => accum + ([...bldg.rooms ?? []].reduce((accu, room) => accu + room?.beds?.reduce((acc, bed) => bed.name === bedstyle.name ? acc + bedstyle.amount : acc + 0, 0), accum)), 0))
                  // return bedstyle.map((room, ix) => {

                  // const occupiedDays = Appointments.filter(ap =>
                  //   ap.checkInDate?.getMonth() === date.getMonth() &&
                  //   ap.retreatCenterId === RetreatCenter.id).reduce((accum, ap) =>
                  //     accum + (ap.roomSchedule.some((sched) =>
                  //       (sched.rooms.some(rm => rm.id === room.id))) ?
                  //       ap.checkInDays : 0), 0)

                  return (
                    <div key={i} className="row" style={{ height: "70px", width: "100%", margin: "10px 5px" }}>
                      <div style={{ height: "40px", width: "40px", marginRight: "10px" }}>
                        <CircularProgressbar
                          value={totalAmount}
                          maxValue={totalAmount}
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
                        <h3>{bedstyle.name}</h3>
                        <p>{totalAmount}</p>
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
            <div className="row-between flex-wrap" style={{ width: "100%" }}>
              {Appointments.map((appointment, i) => {
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
