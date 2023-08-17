import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setCurrentCamperGroup } from "@/services/redux/slice/campergroups"
import { setCurrentLead } from "@/services/redux/slice/leads"
import { setBuildingRooms, setRoomBeds, setBuildingName, setBuildings, } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { RoomType, BedType, ArgFunction, BuildingType, AppointmentType, CamperGroupType } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./BuildingCard.module.css"

const BuildingCard = ({ building, appointment }: { building: BuildingType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments);
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups);
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup);
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead) ?? appointment
    // @ts-ignore 
    const AppointmentsInThisSched = Appointments.filter((a) =>
    // @ts-ignore 
    ((new Date(CurrentAppointment.checkOutDate) >= new Date(a?.checkInDate) && (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate)))
        && a.retreatCenterId === RetreatCenter.id
    )).concat(CurrentAppointment)
    const [openBuilding, setOpenBuilding] = useState(false)
    const currentBuilding = (RetreatCenter.housing && RetreatCenter.housing.buildings?.find((bldg) => bldg.id === building.id)) ?? building
    const unassignedGuests = Number(CurrentGroup?.groupSize) - CurrentAppointment.roomSchedule.reduce((accu, shed) => accu + shed.rooms.reduce((acc, room) => acc + room.capacity, accu), 0)
    const updateBuildingRooms = (room: RoomType) => {
        const occupiedBy = AppointmentsInThisSched.find(app => app.roomSchedule.some(sched => sched.rooms.some(rm => rm.id === room.id)))
        const occupyingGroup = CamperGroups.find(cg => cg.id === occupiedBy?.groupId)
        if (!building.rooms) return;
        if (occupiedBy && occupiedBy.id !== CurrentAppointment.id) return;
        if (unassignedGuests <= 0 && (!occupiedBy || occupiedBy?.id !== CurrentAppointment.id)) return

        const found = CurrentAppointment.roomSchedule.find(sched => sched.rooms.some(rm => rm.id === room.id))
        const data: AppointmentType = {
            ...CurrentAppointment,
            roomSchedule: !!found ?
                CurrentAppointment.roomSchedule.map(sched => ({ ...sched, rooms: sched.rooms.filter(rm => rm.id !== room.id) })) :
                CurrentAppointment.roomSchedule.length > 0 ?
                    CurrentAppointment.roomSchedule.map(sched => ({ ...sched, rooms: [...sched.rooms, room] })) :
                    [{
                        checkInDays: CurrentAppointment.checkInDays,
                        groupId: CurrentAppointment.groupId,
                        rooms: [room],
                        checkInDate: CurrentAppointment.checkInDate,
                        checkOutDate: CurrentAppointment.checkOutDate
                    }]
        }
        dispatch(updateAppointment(data))
        dispatch(setCurrentLead(data))
    }
    return (
        <div >
            <button type="button" className={styles.collapsableSection} onClick={(e) => setOpenBuilding(prev => !prev)}>
                <h3>{building.name}</h3>
                <Image alt="chevron down" src={openBuilding ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {openBuilding ?
                <div className={styles.roomContainer}>
                    {currentBuilding.rooms?.map((room, ind) => {
                        const occupiedBy = AppointmentsInThisSched.find(app => app.roomSchedule.some(sched => sched.rooms.some(rm => rm.id === room.id)))
                        const occupyingGroup = CamperGroups.find(cg => cg.id === occupiedBy?.groupId)
                        return (
                            <button
                                key={ind}
                                type="button"
                                data-content={
                                    occupiedBy ?
                                        occupyingGroup?.groupName
                                        : room.available && room.beds.length > 0 ? "Beds for " + room.capacity + " Guests" + "\r\n" + room.beds.map((bed) => bed.name + ": " + bed.amount).toString().replaceAll(",", "\r\n")
                                            : "Unavailable"}
                                onClick={() => room.available && room.beds.length > 0 ? updateBuildingRooms(room) : () => { }}
                                style={occupiedBy ? { color: occupyingGroup?.color } : {}}
                                className={[styles.roomButton, occupiedBy ? styles.occupiedText : room.available && room.beds.length > 0 ? styles.vacantText : styles.unavailableText, "tooltipBreakText"].join(" ")}
                            >
                                <div
                                    style={occupiedBy ? { outline: `2px solid ${occupyingGroup?.color}` } : {}}
                                    className={occupiedBy ? styles.occupied : room.available && room.beds.length > 0 ? styles.vacant : styles.unavailable}
                                />
                                {room.name}
                            </button>
                        )
                    })
                    }
                </div>
                : null}

            {
                openBuilding ? <div className={styles.legendContainer}>
                    <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.occupiedText].join(" ")}><div style={{ border: `1px solid #000000`, outline: 0 }} className={styles.occupied} />Occupied</div>
                    <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.vacantText].join(" ")}><div className={styles.vacant} />Available</div>
                    <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.unavailableText].join(" ")}><div className={styles.unavailable} />Unavailable</div>
                </div> : null
            }
        </div >
    )
}

export default BuildingCard