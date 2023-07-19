"use client";
import { RootState } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Colors from "@/common/colors";
import { months, weekdays } from "@/utils/variables";
import { generateColor, getDays, trunc } from "@/utils/functions";
import { ReservationType, SetStateType } from "@/types";
import { reservationsSampleData } from "@/utils/sampleData";

const CalendarPage = () => {
  const user = useSelector((state: RootState) => state.User.user);

  const [date, setDate] = useState<Date>(new Date());
  const [progress, setProgress] = useState(66);
  const [reservations, setReservations] = useState<Array<ReservationType>>(
    reservationsSampleData
  );
  const [leads, setLeads] = useState<Array<ReservationType>>([
    {
      id: "John Doe",
      color: generateColor(),
      groupName: "Doe's group",
      status: "Reserved",
      reservedBy: {
        id: "string",
        name: "John Doe",
        contactNumber: "+639 123 456",
        email: "john.doe@email.com",
      },
      zipCode: "4030",
      groupSize: 20,
      checkInDays: 5,
      amenities: [],
      meals: [],
      rooms: [],
    },
  ]);
  const onDrag = (e: React.DragEvent, data: ReservationType) => {
    const widgetType = JSON.stringify(data);
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const openAddLead = () => {
    const name = prompt("Enter Name", "John Doe");
    const lead: ReservationType = {
      id: String(name),
      color: generateColor(),
      groupName: `${String(name).split(" ").at(-1)}'s group`,
      status: "Reserved",
      reservedBy: {
        id: String(name),
        name: String(name),
        contactNumber: "+639 123 456",
        email: `${name?.replaceAll(" ", ".")}@email.com`,
      },
      amenities: [],
      meals: [],
      rooms: [],
      groupSize: 20,
      checkInDays: 5,
    };
    setLeads((prev) => [...prev, lead]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3 className={styles.overviewTitle}>Overview</h3>
      </div>
      <div className={styles.mainRow}>
        <div className={styles.leadscolumn}>
          <div>
            <h3 className={styles.leadsTitle}>Leads</h3>
            {leads.map((lead) => {
              return (
                <div
                  key={lead.id}
                  className={styles.leadCard}
                  style={{ border: `3px solid ${lead.color}` }}
                  draggable
                  onDragStart={(e) => onDrag(e, lead)}
                >
                  <p className={styles.leadName} style={{ color: lead.color }}>
                    {lead.groupName}
                  </p>
                  <p>{lead.reservedBy.name}</p>
                  <p>{lead.reservedBy.contactNumber}</p>
                </div>
              );
            })}
          </div>
          <div>
            <button
              type="button"
              className={styles.addLead}
              onClick={openAddLead}
            >
              New Lead
            </button>
          </div>
        </div>
        <div className={styles.calendarColumn}>
          <div className={styles.progressbarContainer}>
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={{
                trail: {
                  strokeWidth: 1,
                },
                path: {
                  stroke: Colors.green300,
                },
              }}
            />
          </div>

          <SimpleCalendar
            date={date}
            reservations={reservations}
            setReservations={setReservations}
          />
        </div>
      </div>
    </div>
  );
};

const SimpleCalendar = ({
  date,
  reservations,
  setReservations,
}: {
  date: Date;
  reservations: Array<ReservationType>;
  setReservations: SetStateType<Array<ReservationType>>;
}) => {
  const onDrop = (e: React.DragEvent) => {
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    const parsed: ReservationType = JSON.parse(widgetType);
    const reservation: ReservationType = {
      ...parsed,
      checkInDate: new Date(),
      checkOutDate: new Date(
        new Date().setDate(new Date().getDate() + parsed.checkInDays)
      ),
      status: "Booked",
    };
    setReservations((prev) => [...prev, reservation]);
  };
  const dragOver = (e: React.DragEvent) => e.preventDefault();
  const Days = getDays({
    start: new Date(`${months[date.getMonth()]} 01 ${date.getFullYear()}`),
    end: new Date(`${months[date.getMonth() + 1]} 01 ${date.getFullYear()}`),
  });
  const calendarWeeks = Array(6).fill(0);
  const calendarDays = Array(8).fill(0);
  let calendarDate: number | undefined = undefined;
  function getDayOfWeek(date: Date = new Date(), DayOfWeek = 7) {
    const dateCopy = new Date(date);
    var day = dateCopy.getDay() || 7;
    if (day !== DayOfWeek) dateCopy.setHours(-24 * (day - DayOfWeek));
    return dateCopy;
  }
  return (
    <div>
      <div className={styles.calendarWeek}>
        {calendarDays.map((d, i) => {
          if (i === 0)
            return <div key={i} className={styles.calendarHeaderText0} />;
          return (
            <div key={i} className={styles.calendarHeader}>
              <span className={styles.calendarHeaderText}>
                {trunc(weekdays[i - 1], i === 3 || i === 5 ? 2 : 1, "")}
              </span>
            </div>
          );
        })}
      </div>
      {calendarWeeks.map((w, i) => {
        return (
          <div key={i} className={styles.calendarWeek}>
            {calendarDays.map((d, ix) => {
              const cellNum = (i + 1) * ix; // column + 1 x row
              if (calendarDate === undefined && cellNum > Days[0].getUTCDay())
                calendarDate = 0;
              const rangeDate = Days[calendarDate ?? 0];
              if (ix === 0) {
                // week range column
                var lastDay = new Date(
                  rangeDate.getFullYear(),
                  rangeDate.getMonth() + 1,
                  1
                );
                const from = getDayOfWeek(rangeDate, 1);
                const to = getDayOfWeek(rangeDate, 7);
                const toString =
                  from.getDate().toString().length !==
                    to.getDate().toString().length &&
                  to.getMonth() !== rangeDate.getMonth()
                    ? ix === calendarDays.length
                      ? ""
                      : lastDay.getUTCDate()
                    : to.getUTCDate();
                const fromString =
                  from.getDate() > to.getDate() &&
                  from.getMonth() !== rangeDate.getMonth()
                    ? ""
                    : from.getUTCDate();
                const columnString = `${fromString} ${
                  fromString !== "" ? "-" : ""
                } ${toString}`;
                return (
                  <div key={ix} className={styles.calendarWeekRange}>
                    <p className={styles.calendarWeekRangeText}>
                      {columnString}
                    </p>
                  </div>
                );
              }
              const currentDate =
                calendarDate !== undefined && Days[calendarDate++];

              const reservation = reservations.find(
                (r) =>
                  r.checkInDate &&
                  r.checkOutDate &&
                  currentDate > r.checkInDate &&
                  currentDate <= r.checkOutDate
              );
              let style: string | undefined;
              console.log("rerendered", reservations);

              if (
                reservation &&
                reservation.checkInDate &&
                reservation.checkOutDate &&
                currentDate
              ) {
                let checkInString;
                let checkOutString;
                const currentDateString = `${months[currentDate.getMonth()]} ${
                  currentDate.getDate() - 1
                }`;
                if (reservation && reservation.checkInDate)
                  checkInString = `${
                    months[reservation.checkInDate.getMonth()]
                  } ${reservation.checkInDate.getDate()}`;
                if (reservation && reservation.checkOutDate)
                  checkOutString = `${
                    months[reservation.checkOutDate.getMonth()]
                  } ${reservation.checkOutDate.getDate() - 1}`;
                style = [
                  currentDate.getDate() > reservation.checkInDate.getDate() &&
                  currentDate.getDate() <= reservation.checkOutDate.getDate()
                    ? styles.booked
                    : styles.calendarDay,
                  reservation.status === "Booked"
                    ? styles.booked
                    : styles.reserved,
                ].join(" ");
              }
              return (
                <div
                  key={ix}
                  className={styles.vacant}
                  onDrop={onDrop}
                  onDragOver={dragOver}
                >
                  {reservation ? (
                    <div
                      className={style}
                      onClick={() => alert(JSON.stringify(reservation))}
                    />
                  ) : (
                    <div className={styles.vacantLine} />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
