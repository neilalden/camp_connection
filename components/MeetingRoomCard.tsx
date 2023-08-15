import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setCurrentLead } from "@/services/redux/slice/leads"
import { setMeetingRooms } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { BedType, ArgFunction, MeetingRoomType, AppointmentType, MeetingRoomScheduleType, DiagramType, ItemType } from "@/types"
import { arrayToMap, IDGenerator, trunc } from "@/utils/functions"
import { months } from "@/utils/variables"
import { group } from "console"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DateInput from "./DateInput"
import styles from "./MeetingRoomCard.module.css"
import DiagramPicker from "./setupcamp/components/DiagramPicker"
import ItemsSetup from "./setupcamp/components/ItemsSetupComponent"
import TimeInput from "./TimeInput"
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import DropDown from "./DropDown"


const MeetingRoomCard = ({ meetingRoom, appointment }: { meetingRoom: MeetingRoomType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const DiagramStyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const ItemStyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.itemStyles)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const MeetingRooms = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.meetingRooms)
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    if (!CurrentGroup || !CurrentAppointment || !CurrentAppointment.checkInDate || !CurrentAppointment.checkOutDate) return null
    const CheckInDate = new Date(CurrentAppointment.checkInDate);
    const CheckOutDate = new Date(CurrentAppointment.checkOutDate);
    const AppointmentsInThisSched = Appointments.filter((a) =>
    // @ts-ignore 
    ((new Date(CurrentAppointment.checkOutDate) >= new Date(a?.checkInDate) && (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate)))
        && a.retreatCenterId === RetreatCenter.id
    )).concat(CurrentAppointment)

    const MeetingRoomAppointmentData = AppointmentsInThisSched.find(ap => ap.meetingRoomSchedule.find(sched => sched.meetingRooms.some(mr => mr.id === meetingRoom.id)))
    const MeetingRoomScheduleData = MeetingRoomAppointmentData?.meetingRoomSchedule.find(sched => sched.meetingRooms.some(mr => mr.id === meetingRoom.id))
    const MeetingRoomData = MeetingRoomScheduleData?.meetingRooms.find(mr => mr.id === meetingRoom.id)

    const occupiedBy = AppointmentsInThisSched.find(app => app.meetingRoomSchedule.some(sched => sched.meetingRooms.some(mr => mr.id === meetingRoom.id)))
    const occupyingGroup = CamperGroups.find(cg => cg.id === occupiedBy?.groupId)
    const [open, setOpen] = useState(false)

    const updateBuildingRooms = () => {
        if (!meetingRoom.capacity) return;
        if (MeetingRoomAppointmentData && MeetingRoomAppointmentData?.groupId !== CurrentAppointment.groupId) return

        const found = CurrentAppointment.meetingRoomSchedule.find(sched => sched.meetingRooms.some(mr => mr.id === meetingRoom.id))
        const data: AppointmentType = {
            ...CurrentAppointment,
            meetingRoomSchedule: !!found ?
                CurrentAppointment.meetingRoomSchedule.map(sched => ({ ...sched, meetingRooms: sched.meetingRooms.filter(mr => mr.id !== meetingRoom.id) })) :
                CurrentAppointment.meetingRoomSchedule.length > 0 ?
                    CurrentAppointment.meetingRoomSchedule.map(sched => ({ ...sched, meetingRooms: [...sched.meetingRooms, meetingRoom] })) :
                    [{
                        scheduleId: IDGenerator(),
                        checkInDate: CurrentAppointment?.checkInDate,
                        checkInTime: '10:00',
                        checkOutTime: '11:00',
                        groupId: CurrentAppointment.groupId,
                        meetingRooms: [meetingRoom],
                    }]
        }
        dispatch(updateAppointment(data))
        dispatch(setCurrentLead(data))
    }
    const updateSchedule = (newSched: MeetingRoomScheduleType) => {
        if (!meetingRoom.capacity) return;
        if (MeetingRoomAppointmentData?.groupId !== CurrentAppointment.groupId) return
        const data: AppointmentType = {
            ...CurrentAppointment,
            meetingRoomSchedule: CurrentAppointment.meetingRoomSchedule.map(sched => sched.scheduleId === newSched.scheduleId ? newSched : sched)
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
                    <div className={styles.setUpContainer}>
                        <div className="row-between" >
                            <div className="row" style={{ margin: "5px 0" }}>
                                <DateInput
                                    name="Meeting room sched date"
                                    label={<span>Reservation Date</span>}
                                    disabled={MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId}
                                    value={new Date(MeetingRoomScheduleData?.checkInDate ?? new Date())}
                                    containerClassName={styles.inputStyle}
                                    min={new Date(CurrentAppointment.checkInDate).toISOString().slice(0, 10)}
                                    max={new Date(CurrentAppointment.checkOutDate).toISOString().slice(0, 10)}
                                    setValue={(value: Date) => {
                                        if (!MeetingRoomScheduleData) updateBuildingRooms()
                                        else updateSchedule({ ...MeetingRoomScheduleData, checkInDate: value })
                                    }}
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
                        <div className="row">

                            <TimeInput
                                name="from time input"
                                disabled={MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId}
                                containerClassName={styles.timeInput}
                                value={MeetingRoomScheduleData?.checkInTime}
                                setValue={(e) => {
                                    if (MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId) return
                                    if (!MeetingRoomScheduleData) updateBuildingRooms()
                                    else updateSchedule({ ...MeetingRoomScheduleData, checkInTime: e.target.value })
                                }}
                                label={<span>from</span>}
                            />
                            <div style={{ width: "10px" }} />
                            <TimeInput
                                name="to time input"
                                disabled={MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId}
                                containerClassName={styles.timeInput}
                                value={MeetingRoomScheduleData?.checkOutTime}
                                setValue={(e) => {
                                    if (!MeetingRoomScheduleData) updateBuildingRooms()
                                    else updateSchedule({ ...MeetingRoomScheduleData, checkOutTime: e.target.value })
                                }}
                                label={<span>to</span>}
                            />
                        </div>
                        <div style={{ margin: "20px 0" }}>

                            <h5>Notes</h5>
                            <textarea
                                onChange={(e) => {
                                    if (!MeetingRoomScheduleData) updateBuildingRooms()
                                    else updateSchedule({
                                        ...MeetingRoomScheduleData, meetingRooms: MeetingRoomScheduleData.meetingRooms.map((mr) => mr.id === MeetingRoomData?.id ?
                                            ({
                                                ...MeetingRoomData,
                                                notes: e.target.value
                                            }) : mr)
                                    })
                                }}
                                disabled={MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId}
                                value={MeetingRoomData?.notes}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resize: "none",
                                    padding: "5px"
                                }}
                            />
                        </div>
                        <div className="w-100p">
                            <div className="row-between w-100p">
                                <div className="w-60p">
                                    <DropDown
                                        disabled={MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId}
                                        htmlFor="Diagram"
                                        setValue={(value: DiagramType["id"]) => {
                                            if (!MeetingRoomScheduleData) updateBuildingRooms()
                                            else updateSchedule({
                                                ...MeetingRoomScheduleData, meetingRooms: MeetingRoomScheduleData.meetingRooms.map((mrs => mrs.id === meetingRoom.id ? ({
                                                    ...mrs,
                                                    diagram: DiagramStyles.find(ds => ds.id === value)
                                                }) : mrs))
                                            })
                                        }}
                                        options={DiagramStyles.map(ds => ({ label: ds.name, value: ds.id }))} />
                                    <br />
                                    {MeetingRoomData ? <Image src={MeetingRoomData.diagram?.photo ?? Images["ic_logo"]} alt="Diagram" height={100} width={100} style={{ width: "100%", minHeight: "200px", objectFit: "cover" }} /> : null}

                                </div>
                                <div className="w-40p" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "right" }}>
                                    <h5 >Items</h5>
                                    {MeetingRoomData?.items?.length !== ItemStyles.length ? (<button
                                        className={styles.addItemsButton}
                                        onClick={() => {
                                            if (MeetingRoomData?.items?.length === ItemStyles.length) return;
                                            if (!MeetingRoomScheduleData) updateBuildingRooms()
                                            else updateSchedule({
                                                ...MeetingRoomScheduleData, meetingRooms: MeetingRoomScheduleData.meetingRooms.map((mrs => mrs.id === meetingRoom.id ? ({
                                                    ...mrs,
                                                    items: MeetingRoomData?.items ? [...MeetingRoomData.items, ItemStyles[MeetingRoomData.items.length]] : [ItemStyles[0]]
                                                }) : mrs))
                                            })

                                        }}
                                    >
                                        +
                                    </button>) : null}
                                    {
                                        MeetingRoomData?.items && MeetingRoomData?.items?.map((item, i) => {
                                            return (
                                                <div key={i} className={"row-between w-100p"}>
                                                    <button
                                                        disabled={MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId}
                                                        type="button"
                                                        className={styles.itemDeleteButtom}
                                                        onClick={() => {
                                                            if (MeetingRoomScheduleData?.groupId !== CurrentAppointment.groupId) return;
                                                            let newItems: MeetingRoomType["items"] = MeetingRoomData.items?.filter((i) => i.id !== item.id)
                                                            if (!MeetingRoomScheduleData) updateBuildingRooms()
                                                            else updateSchedule({
                                                                ...MeetingRoomScheduleData, meetingRooms: MeetingRoomScheduleData.meetingRooms.map((mrs => mrs.id === MeetingRoomData.id ? ({
                                                                    ...mrs,
                                                                    items: newItems
                                                                }) : mrs))
                                                            })
                                                        }}>X</button>
                                                    <div className={styles.meetingRoomCardNameInputContainer}>
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <TextInput
                                                        containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                                        inputClassName={styles.meetingRoomCardCapacityInput}
                                                        labelClassName={styles.capacityLabelClassName}
                                                        label="Amount"
                                                        value={item.amount}
                                                        setValue={(e) => {

                                                            let newItems: MeetingRoomType["items"] = meetingRoom.items?.map((i) => i.id === item.id ? ({ ...i, amount: Number(e.target.value) }) : i)
                                                            if (!MeetingRoomScheduleData) updateBuildingRooms()
                                                            else updateSchedule({
                                                                ...MeetingRoomScheduleData, meetingRooms: MeetingRoomScheduleData.meetingRooms.map((mrs => mrs.id === meetingRoom.id ? ({
                                                                    ...mrs,
                                                                    items: newItems
                                                                }) : mrs))
                                                            })

                                                        }}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default MeetingRoomCard;