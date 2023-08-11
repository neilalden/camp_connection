import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { updateAppointment } from "@/services/redux/slice/appointments"
import { setBuildingRooms, setRoomBeds, setBuildingName, setBuildings, } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { RoomType, BedType, ArgFunction, BuildingType, AppointmentType } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./BuildingCard.module.css"

const BuildingCard = ({ building, appointment }: { building: BuildingType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments);
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup);

    const [openBuilding, setOpenBuilding] = useState(false)
    const currentAppointment = Appointments.find((ap) => ap.id === appointment.id) ?? appointment
    const currentBuilding = (RetreatCenter.housing && RetreatCenter.housing.buildings?.find((bldg) => bldg.id === building.id)) ?? building
    const unassignedGuests = Number(CurrentGroup?.groupSize) - (currentAppointment.roomSchedule.reduce((accu, shed) => accu + shed.rooms.reduce((acc, room) => acc + room.capacity, accu), 0) ?? 0)
    const updateBuildingRooms = (room: RoomType) => {
        if (!building.rooms) return;
        if (room.occupiedBy && room.occupiedBy.id !== currentAppointment.id) return;
        if (unassignedGuests <= 0 && (!room.occupiedBy || room.occupiedBy?.id !== currentAppointment.id)) return
        let newRooms: Array<RoomType> = [...building.rooms]
        newRooms = newRooms.map((nr) => nr.id === room.id ? nr.occupiedBy ? ({ ...room, occupiedBy: undefined }) : ({ ...room, occupiedBy: currentAppointment }) : nr)
        const found = RetreatCenter.housing.buildings ? RetreatCenter.housing.buildings.find(rm => rm.id === room.id) : false
        const newAppointment: AppointmentType = {
            ...currentAppointment,
        }
        dispatch(updateAppointment(newAppointment))
        dispatch(setRoomBeds({
            buildingId: building.id,
            rooms: newRooms
        }))
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
                        return (
                            <button
                                key={ind}
                                type="button"
                                data-content={
                                    room.occupiedBy ?
                                        room.occupiedBy.groupId
                                        : room.available && room.beds.length > 0 ? "Beds for " + room.capacity + " Guests"
                                            : "Unavailable"}
                                onClick={() => room.available && room.beds.length > 0 ? updateBuildingRooms(room) : () => { }}
                                style={room.occupiedBy ? { color: room.occupiedBy.groupId } : {}}
                                className={[styles.roomButton, room.occupiedBy ? styles.occupiedText : room.available && room.beds.length > 0 ? styles.vacantText : styles.unavailableText, "tooltip"].join(" ")}
                            >
                                <div
                                    style={room.occupiedBy ? { outline: `2px solid ${room.occupiedBy.groupId}` } : {}}
                                    className={room.occupiedBy ? styles.occupied : room.available && room.beds.length > 0 ? styles.vacant : styles.unavailable}
                                />
                                {room.name}
                            </button>
                        )
                    })
                    }
                </div>
                : null}

            {openBuilding ? <div className={styles.legendContainer}>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.occupiedText].join(" ")}><div style={{ border: `1px solid #000000`, outline: 0 }} className={styles.occupied} />Occupied</div>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.vacantText].join(" ")}><div className={styles.vacant} />Available</div>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.unavailableText].join(" ")}><div className={styles.unavailable} />Unavailable</div>
            </div> : null}
        </div>
    )
}

export default BuildingCard;