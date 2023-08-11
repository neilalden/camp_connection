import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setMeetingRooms } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { BedType, ArgFunction, MeetingRoomType, AppointmentType } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DateInput from "./DateInput"
import styles from "./MeetingRoomCard.module.css"
import DiagramPicker from "./setupcamp/components/DiagramPicker"
import ItemsSetup from "./setupcamp/components/ItemsSetupComponent"

const MeetingRoomCard = ({ meetingRoom, appointment }: { meetingRoom: MeetingRoomType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const retreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const diagramstyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const MeetingRooms = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.meetingRooms)
    const currentAppointment = Appointments.find((ap) => ap.id === appointment.id) ?? appointment
    const [open, setOpen] = useState(false)

    const updateBuildingRooms = () => {
        if (meetingRoom.occupiedBy && meetingRoom.occupiedBy.id !== currentAppointment.id) return;
        const newMeetingRooms: Array<MeetingRoomType> = [...retreatCenter.meetingRooms ?? []].map((mr) => mr.id === meetingRoom.id ? mr.occupiedBy ? ({ ...meetingRoom, occupiedBy: undefined }) : ({ ...meetingRoom, occupiedBy: currentAppointment }) : mr)
        const found = MeetingRooms ? MeetingRooms.find(mr => mr.id === meetingRoom.id) : false
        const newAppointment: AppointmentType = {
            ...currentAppointment,
        }
        dispatch(updateAppointment(newAppointment))
        dispatch(setMeetingRooms(newMeetingRooms))
    }
    useEffect(() => {
        if (!meetingRoom.diagram) {
            const newMeetingRooms: Array<MeetingRoomType> = [...retreatCenter.meetingRooms ?? []].map((mr) => mr.id === meetingRoom.id ? ({ ...meetingRoom, diagram: diagramstyles[0] }) : mr)
            dispatch(setMeetingRooms(newMeetingRooms))
        }
    }, [])

    return (
        <div className="scroll-y">
            <button type="button" className={styles.collapsableSection} onClick={(e) => setOpen(prev => !prev)}>
                <h3>{meetingRoom.name}</h3>
                <Image alt="chevron down" src={open ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            <div className="row-between" >
                <div className="row">
                    <DateInput
                        value={new Date()}
                        label="Birthdate"
                        containerClassName={styles.inputStyle}
                    />
                    <input type={"time"} className={styles.timeInput} />
                </div>
                <button
                    type="button"
                    data-content={
                        meetingRoom.occupiedBy ?
                            meetingRoom.occupiedBy
                            : meetingRoom.available && meetingRoom.capacity > 0 ? "Can host up to " + meetingRoom.capacity + " Guests"
                                : "Unavailable"}
                    onClick={() => meetingRoom.available && meetingRoom.capacity > 0 ? updateBuildingRooms() : () => { }}
                    style={meetingRoom.occupiedBy ? { color: meetingRoom.occupiedBy.groupId } : {}}
                    className={[styles.roomButton, meetingRoom.occupiedBy ? styles.occupiedText : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacantText : styles.unavailableText, "tooltip"].join(" ")}
                >
                    <div
                        style={meetingRoom.occupiedBy ? { outline: `2px solid ${meetingRoom.occupiedBy.groupId}` } : {}}
                        className={meetingRoom.occupiedBy ? styles.occupied : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacant : styles.unavailable}
                    />
                    {meetingRoom.occupiedBy ? "Occupied" : "Available"}
                </button>
            </div>

            <h5>Notes</h5>
            <textarea
                style={{
                    width: "100%",
                    height: "100%",
                    resize: "none",
                    padding: "5px"
                }}
            />
            <div>
                {
                    open ? (
                        <div>
                            <div className={styles.meetingRoomContainer}>
                                <DiagramPicker diagram={meetingRoom.diagram} changeDiagram={() => { }} changeDiagramAmount={() => { }} deleteDiagram={() => { }} />
                            </div>
                            <div className={styles.legendContainer}>
                                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.occupiedText].join(" ")}><div style={{ border: `1px solid #000000`, outline: 0 }} className={styles.occupied} />Occupied</div>
                                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.vacantText].join(" ")}><div className={styles.vacant} />Available</div>
                                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.unavailableText].join(" ")}><div className={styles.unavailable} />Unavailable</div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
            <ItemsSetup />
        </div>
    )
    // return (
    //     <button
    //         type="button"
    //         data-content={
    //             meetingRoom.occupiedBy ?
    //                 meetingRoom.occupiedBy.groupName
    //                 : meetingRoom.available && meetingRoom.capacity > 0 ? "Host " + meetingRoom.capacity + " guests" : "Unavailable"}
    //         onClick={() => meetingRoom.available && meetingRoom.capacity > 0 ? updateBuildingRooms() : () => { }}
    //         style={meetingRoom.occupiedBy ? { color: meetingRoom.occupiedBy.color } : {}}
    //         className={[styles.meetingRoomButton, meetingRoom.occupiedBy ? styles.occupiedText : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacantText : styles.unavailableText, "tooltip"].join(" ")}
    //     >
    //         <div
    //             style={meetingRoom.occupiedBy ? { outline: `2px solid ${meetingRoom.occupiedBy.color}` } : {}}
    //             className={meetingRoom.occupiedBy ? styles.occupied : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacant : styles.unavailable}
    //         />
    //         {meetingRoom.name}
    //     </button>
    // )
}

export default MeetingRoomCard;