import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { setBuildingRooms, setRoomBeds, setBuildingName, setBuildings } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { RoomType, BedType, ArgFunction, BuildingType } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./BuildingCard.module.css"
import BedCard from "./BedCard"

const BuildingCard = ({ building, deleteBuilding }: { building: BuildingType, deleteBuilding: ArgFunction }) => {
    const dispatch = useDispatch()
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.bedStyles)

    const [openBuilding, setOpenBuilding] = useState(true)

    const bedStylesMap = arrayToMap({ array: BEDSTYLES ?? [], key: "id" })
    const changeRoomName = ({ name, buildingId, roomId, rooms }: { name: string, buildingId: BuildingType["id"], roomId: RoomType["id"], rooms: BuildingType["rooms"] }) => {
        const newRooms = rooms?.map((room) => {
            if (room.id === roomId) return { ...room, name }
            return room
        })
        dispatch(setBuildingRooms({
            id: buildingId,
            rooms: newRooms,
        }))
    }
    const addBed = ({
        buildingId, roomId, rooms
    }: { buildingId: BuildingType["id"], roomId: RoomType["id"], rooms: BuildingType["rooms"] }) => {
        if (!BEDSTYLES) return alert("Add Bed Style")
        if (!BEDSTYLES[0]) return alert("Create a bed style first")
        const bedConfig: BedType = {
            ...BEDSTYLES[0],
            amount: 1
        }
        const newRooms = rooms?.map((room) => {
            if (room.id === roomId) return {
                ...room, beds: room.beds ? [...room.beds, bedConfig] : [bedConfig]
            }
            return room
        })

        dispatch(setRoomBeds({
            buildingId: buildingId,
            rooms: newRooms
        }))
    }

    const updateBuildingRooms = ({
        buildingId, rooms
    }: { buildingId: BuildingType["id"], rooms: BuildingType["rooms"] }) => {
        dispatch(setRoomBeds({
            buildingId: buildingId,
            rooms: rooms
        }))
    }
    const setupUpdateBuildingRooms = (buildingId: BuildingType["id"], numberOfRooms: number) => {
        let newRooms: Array<RoomType> = [...building.rooms ?? []]
        const length = newRooms.length
        if (length >= numberOfRooms) newRooms = newRooms.filter((item, index) => index < numberOfRooms)
        else {
            const addedRooms: Array<RoomType> = Array(numberOfRooms - length).fill({ id: IDGenerator(), name: `Room 1${length + 1 > 9 ? length + 1 : "0" + (length + 1)}`, beds: newRooms.at(-1) ? newRooms.at(-1)?.beds : [] })
            newRooms.push(...addedRooms)
        }
        dispatch(setRoomBeds({
            buildingId: buildingId,
            rooms: newRooms
        }))
    }

    return (
        <div>
            <button type="button" className={styles.collapsableSection} style={{ width: "100%" }} onClick={(e) => setOpenBuilding(prev => !prev)}>
                <div className="row">
                    {!openBuilding ? <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={deleteBuilding}
                    >X</button> : null}
                    <TextInput
                        placeholder="Building/House name..."
                        value={building.name}
                        setValue={(e) => dispatch(setBuildingName({ id: building.id, name: e.target.value }))}
                        containerClassName={styles.buildingNameInputStyle}
                    /></div>

                <Image alt="chevron down" src={openBuilding ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {openBuilding ?
                <div className={styles.buildingCard}>
                    <div className="row-between">
                        <div className="row">
                            <TextInput
                                type="number"
                                label="Number of rooms"
                                placeholder="8"
                                value={building.rooms?.length ?? ""}
                                setValue={(e) => setupUpdateBuildingRooms(building.id, Number(e.target.value))}
                            />
                            <button
                                type="button"
                                disabled={building.rooms?.length === 0}
                                onClick={() => setupUpdateBuildingRooms(building.id, Number(building.rooms?.length) - 1)}
                                className={[building.rooms?.length === 0 && "disabled", styles.capacityPlus].join(" ")}>-</button>
                            <button
                                type="button"
                                onClick={() => setupUpdateBuildingRooms(building.id, Number(building.rooms?.length) + 1)}
                                className={styles.capacityPlus}>+</button>
                        </div>
                        <TextInput
                            disabled
                            label="Capacity"
                            value={building.rooms?.reduce((accu, room) =>
                                room.beds?.reduce((acc, bed) => acc + (bedStylesMap.get(bed.id)?.capacity * bed.amount), accu), 0)
                                ?? ""}
                        />
                    </div>
                    <div className={styles.housingCardsContainer}>
                        {building.rooms?.map((room, ind) => {
                            return (
                                <div key={ind} className={styles.roomCard}>
                                    <TextInput
                                        inputClassName={styles.inputInsideBox}
                                        containerClassName={styles.buildingNameInputStyle}
                                        placeholder={"Room name..."}
                                        value={room.name}
                                        setValue={(e) => changeRoomName({
                                            name: e.target.value,
                                            buildingId: building.id,
                                            roomId: room.id,
                                            rooms: building.rooms
                                        })}
                                    />
                                    {
                                        room.beds?.map((bed, inde) => {
                                            const deleteBed = () => {
                                                const rooms = building.rooms?.map((rm) => {
                                                    if (rm.id === room.id) {
                                                        const newBeds = [...rm.beds]
                                                        newBeds.splice(inde, 1)
                                                        return {
                                                            ...rm,
                                                            beds: newBeds
                                                        }
                                                    }
                                                    return rm
                                                })
                                                updateBuildingRooms({
                                                    buildingId: building.id,
                                                    rooms: rooms
                                                })
                                            }
                                            const changeBed = (parambed: BedType) => {
                                                const rooms = building.rooms?.map((rm) => {
                                                    if (rm.id === room.id) {
                                                        const newBeds = [...rm.beds]
                                                        newBeds.splice(inde, 1, parambed)
                                                        return {
                                                            ...rm,
                                                            beds: newBeds
                                                        }
                                                    }
                                                    return rm
                                                })
                                                updateBuildingRooms({
                                                    buildingId: building.id,
                                                    rooms: rooms
                                                })
                                            }
                                            const changeBedAmount = (value: number, parambed: BedType) => {
                                                if (isNaN(value)) return;
                                                if (value < 1) return;
                                                const rooms = building.rooms?.map((rm) => {
                                                    if (rm.id === room.id) {
                                                        return {
                                                            ...rm,
                                                            beds: rm.beds.map(b => b.id == parambed.id ? { ...parambed, amount: value } : b)
                                                        }
                                                    }
                                                    return rm
                                                })
                                                updateBuildingRooms({
                                                    buildingId: building.id,
                                                    rooms: rooms
                                                })
                                            }
                                            return (
                                                <div key={inde}>
                                                    <BedCard
                                                        bed={bed}
                                                        deleteBed={deleteBed}
                                                        changeBed={changeBed}
                                                        changeBedAmount={changeBedAmount}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                    <button
                                        className={styles.addBedButton}
                                        onClick={() => addBed({
                                            buildingId: building.id,
                                            roomId: room.id,
                                            rooms: building.rooms
                                        })}
                                    >
                                        +
                                    </button>
                                    {room.beds.length > 0 ?
                                        <button
                                            className={styles.pricingButton}
                                            onClick={() => {
                                                const rooms = building.rooms?.map((rm) => ({ ...rm, beds: room.beds }))
                                                updateBuildingRooms({
                                                    buildingId: building.id,
                                                    rooms: rooms
                                                })
                                            }}
                                        >apply to all</button>
                                        : null}
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                : null}
        </div>
    )
}

export default BuildingCard;