import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setCurrentLead } from "@/services/redux/slice/leads"
import { setMeetingRooms } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { BedType, ArgFunction, MeetingRoomType, AppointmentType } from "@/types"
import { arrayToMap, IDGenerator, trunc } from "@/utils/functions"
import { months } from "@/utils/variables"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DateInput from "./DateInput"
import styles from "./MeetingRoomCard.module.css"
import DiagramPicker from "./setupcamp/components/DiagramPicker"
import ItemsSetup from "./setupcamp/components/ItemsSetupComponent"
import TimeInput from "./TimeInput"

const MeetingRoomCard = ({ meetingRoom, appointment }: { meetingRoom: MeetingRoomType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const DiagramStyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const MeetingRooms = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.meetingRooms)
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead)
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    if (!CurrentGroup || !CurrentAppointment || !CurrentAppointment.checkInDate || !CurrentAppointment.checkOutDate) return null
    const CheckInDate = new Date(CurrentAppointment.checkInDate);
    const CheckOutDate = new Date(CurrentAppointment.checkOutDate);
    // @ts-ignore 
    const AppointmentsInThisSched = Appointments.filter((a) =>
    // @ts-ignore 
    ((new Date(CurrentAppointment.checkOutDate) >= new Date(a?.checkInDate) && (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate)))
        && a.retreatCenterId === RetreatCenter.id
    )).concat(CurrentAppointment)
    const unassignedGuests = Number(CurrentGroup.groupSize) - (appointment.roomSchedule.reduce((accu, shed) => accu + shed.rooms.reduce((acc, room) => acc + room.capacity, accu), 0) ?? 0)
    const checkInSplit = CheckInDate.toLocaleDateString().split("/")
    const checkOutSplit = CheckOutDate.toLocaleDateString().split("/")
    // @ts-ignore 
    const checkInMonth = trunc(months[checkInSplit?.at(0)], 3, "")
    const checkInDay = Number(checkInSplit?.at(1))
    // @ts-ignore 
    const checkOutMonth = trunc(months[checkOutSplit?.at(0)], 3, "")
    const checkOutDay = Number(checkOutSplit?.at(1))
    const occupiedBy = AppointmentsInThisSched.find(app => app.meetingRoomSchedule.some(sched => sched.meetingRooms.some(mr => mr.id === meetingRoom.id)))
    const occupyingGroup = CamperGroups.find(cg => cg.id === occupiedBy?.groupId)
    const [open, setOpen] = useState(false)

    const updateBuildingRooms = () => {
        if (!meetingRoom.capacity) return;
        if (occupiedBy && occupiedBy.id !== CurrentAppointment.id) return;
        const found = CurrentAppointment.meetingRoomSchedule.find(sched => sched.meetingRooms.some(mr => mr.id === meetingRoom.id))
        const data: AppointmentType = {
            ...CurrentAppointment,
            meetingRoomSchedule: !!found ?
                CurrentAppointment.meetingRoomSchedule.map(sched => ({ ...sched, meetingRooms: sched.meetingRooms.filter(mr => mr.id !== meetingRoom.id) })) :
                CurrentAppointment.meetingRoomSchedule.length > 0 ?
                    CurrentAppointment.meetingRoomSchedule.map(sched => ({ ...sched, meetingRooms: [...sched.meetingRooms, meetingRoom] })) :
                    [{
                        checkIn: CurrentAppointment.checkInDate,
                        checkOut: CurrentAppointment.checkOutDate,
                        groupId: CurrentAppointment.groupId,
                        meetingRooms: [meetingRoom],
                    }]
        }
        dispatch(updateAppointment(data))
        dispatch(setCurrentLead(data))
    }
    useEffect(() => {
        if (!meetingRoom.diagram) {
            const newMeetingRooms: Array<MeetingRoomType> = [...RetreatCenter.meetingRooms ?? []].map((mr) => mr.id === meetingRoom.id ? ({ ...meetingRoom, diagram: DiagramStyles[0] }) : mr)
            dispatch(setMeetingRooms(newMeetingRooms))
        }
    }, [])

    return (
        <div>
            <button type="button" className={styles.collapsableSection} onClick={(e) => setOpen(prev => !prev)}>
                <h3>{meetingRoom.name}</h3>
                <Image alt="chevron down" src={open ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>

            {
                open ? (
                    <div>
                        <div className="row-between" >
                            <div className="row" style={{ margin: "5px 0" }}>
                                <DateInput
                                    value={new Date()}
                                    containerClassName={styles.inputStyle}
                                />
                                {/* <input type={"time"} className={styles.timeInput} /> */}
                                <TimeInput
                                    containerClassName={styles.timeInput}
                                    value={new Date().toISOString().substring(11, 16)}
                                />
                            </div>
                            <button
                                type="button"
                                data-content={
                                    occupiedBy ?
                                        occupyingGroup?.groupName
                                        : meetingRoom.available && meetingRoom.capacity > 0 ? "Can host up to " + meetingRoom.capacity + " Guests"
                                            : "Unavailable"}
                                onClick={() => meetingRoom.available && meetingRoom.capacity > 0 ? updateBuildingRooms() : () => { }}
                                style={occupyingGroup ? { color: occupyingGroup?.color, margin: "25px 10px 0 0" } : { margin: "25px 10px 0 0" }}
                                className={["row row-center", occupiedBy ? styles.occupiedText : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacantText : styles.unavailableText, "tooltip"].join(" ")}
                            >
                                <div
                                    style={occupyingGroup ? { outline: `2px solid ${occupyingGroup?.color}` } : {}}
                                    className={occupiedBy ? styles.occupied : meetingRoom.available && meetingRoom.capacity > 0 ? styles.vacant : styles.unavailable}
                                />
                                {occupiedBy ? "Occupied" : "Available"}
                            </button>
                        </div>
                        <div style={{ margin: "20px 0" }}>

                            <h5>Notes</h5>
                            <textarea
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resize: "none",
                                    padding: "5px"
                                }}
                            />
                        </div>
                        <div>
                            <h5>Diagrams</h5>
                            <Image src={meetingRoom.diagram?.photo ?? Images["ic_logo"]} alt="Diagram" height={100} width={100} />
                            {/* @ts-ignore */}
                            <DiagramPicker diagram={meetingRoom.diagram?.photo ?? Images["ic_logo"]} changeDiagram={() => { }} changeDiagramAmount={() => { }} deleteDiagram={() => { }} />
                        </div>
                        {/* <ItemsSetup /> */}
                    </div>
                ) : null
            }
        </div>
    )
}

export default MeetingRoomCard;