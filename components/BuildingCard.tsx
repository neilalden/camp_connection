import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { setBuildingRooms, setRoomBeds, setBuildingName, setBuildings, addAppointment, setAppointment } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { RoomType, BedType, ArgFunction, BuildingType, AppointmentType } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./BuildingCard.module.css"

const BuildingCard = ({ building, appointment }: { building: BuildingType, appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const retreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const [openBuilding, setOpenBuilding] = useState(false)
    const currentAppointment = retreatCenter.appointments.find((ap) => ap.id === appointment.id) ?? appointment
    const currentBuilding = (retreatCenter.housing && retreatCenter.housing.buildings?.find((bldg) => bldg.id === building.id)) ?? building
    const unassignedGuests = Number(currentAppointment.groupSize) - (currentAppointment.rooms?.reduce((acc, rm) => acc + rm.capacity, 0) ?? 0)
    const updateBuildingRooms = (room: RoomType) => {
        if (!building.rooms) return;
        if (room.occupiedBy && room.occupiedBy.id !== currentAppointment.id) return;
        if (unassignedGuests <= 0 && (!room.occupiedBy || room.occupiedBy?.id !== currentAppointment.id)) return
        let newRooms: Array<RoomType> = [...building.rooms]
        newRooms = newRooms.map((nr) => nr.id === room.id ? nr.occupiedBy ? ({ ...room, occupiedBy: undefined }) : ({ ...room, occupiedBy: currentAppointment }) : nr)
        const found = currentAppointment.rooms ? currentAppointment.rooms.find(rm => rm.id === room.id) : false
        const newAppointment: AppointmentType = {
            ...currentAppointment,
            rooms: currentAppointment.rooms ? found ? currentAppointment.rooms?.filter((rm) => rm.id !== room.id) : [room, ...currentAppointment.rooms] : [room]
        }
        dispatch(setAppointment(newAppointment))
        dispatch(setRoomBeds({
            buildingId: building.id,
            rooms: newRooms
        }))
    }
    return (
        <div style={{ marginBottom: "40px" }}>
            <h5 style={{ textAlign: "start", margin: "10px 0" }}>unassigned guests : {unassignedGuests}</h5>
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
                                        room.occupiedBy.groupName
                                        : room.available && room.beds.length > 0 ? "Beds for " + room.capacity + "Guests"
                                            : "Unavailable"}
                                onClick={() => room.available && room.beds.length > 0 ? updateBuildingRooms(room) : () => { }}
                                style={room.occupiedBy ? { color: room.occupiedBy.color } : {}}
                                className={[styles.roomButton, room.occupiedBy ? styles.occupiedText : room.available && room.beds.length > 0 ? styles.vacantText : styles.unavailableText, "tooltip"].join(" ")}
                            >
                                <div
                                    style={room.occupiedBy ? { outline: `2px solid ${room.occupiedBy.color}` } : {}}
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
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.occupiedText].join(" ")}><div style={{ outline: `2px solid ${appointment.color}` }} className={styles.occupied} />Occupied</div>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.vacantText].join(" ")}><div className={styles.vacant} />Available</div>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.unavailableText].join(" ")}><div className={styles.unavailable} />Unavailable</div>
            </div> : null}
        </div>
    )
}

export default BuildingCard;