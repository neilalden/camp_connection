import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { setAppointment, setMeetingRooms } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { BedType, ArgFunction, MeetingRoomType, AppointmentType } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./MeetingRoomCard.module.css"

const MeetingRoomCard = ({ meetingRoom, appointment }: { meetingRoom: MeetingRoomType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const retreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const currentAppointment = retreatCenter.appointments.find((ap) => ap.id === appointment.id) ?? appointment

    const updateBuildingRooms = () => {
        if (meetingRoom.occupiedBy && meetingRoom.occupiedBy.id !== currentAppointment.id) return;
        let newMeetingRooms: Array<MeetingRoomType> = [...retreatCenter.meetingRooms ?? []]

        newMeetingRooms = newMeetingRooms.map((mr) => mr.id === meetingRoom.id ? mr.occupiedBy ? ({ ...meetingRoom, occupiedBy: undefined }) : ({ ...meetingRoom, occupiedBy: currentAppointment }) : mr)
        const found = currentAppointment.meetingRooms ? currentAppointment.meetingRooms.find(mr => mr.id === meetingRoom.id) : false
        const newAppointment: AppointmentType = {
            ...currentAppointment,
            meetingRooms: currentAppointment.meetingRooms ? found ? currentAppointment.meetingRooms?.filter((mr) => mr.id !== meetingRoom.id) : [meetingRoom, ...currentAppointment.meetingRooms] : [meetingRoom]
        }
        dispatch(setAppointment(newAppointment))
        dispatch(setMeetingRooms(newMeetingRooms))
    }
    return (
        <button
            type="button"
            data-content={
                meetingRoom.occupiedBy ?
                    meetingRoom.occupiedBy.groupName
                    : meetingRoom.available && meetingRoom.capacity > 0 ? "Host " + meetingRoom.capacity + " guests" : "Unavailable"}
            onClick={() => meetingRoom.available && meetingRoom.capacity > 0 ? updateBuildingRooms() : () => { }}
            style={meetingRoom.occupiedBy ? { color: meetingRoom.occupiedBy.color } : {}}
            className={[styles.meetingRoomButton, meetingRoom.occupiedBy ? styles.occupiedText : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacantText : styles.unavailableText, "tooltip"].join(" ")}
        >
            <div
                style={meetingRoom.occupiedBy ? { outline: `2px solid ${meetingRoom.occupiedBy.color}` } : {}}
                className={meetingRoom.occupiedBy ? styles.occupied : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacant : styles.unavailable}
            />
            {meetingRoom.name}
        </button>
    )
}

export default MeetingRoomCard;