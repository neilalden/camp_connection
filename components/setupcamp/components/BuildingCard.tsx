import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { setBuildingRooms, setRoomBeds, setBuildingName, setBuildingNumberRooms } from "@/services/redux/slice/retreatcenter"
import { RootState } from "@/services/redux/store"
import { RoomType, BedType } from "@/types"
import { arrayToMap } from "@/utils/functions"
import { BuildingType } from "@/utils/sampleData"
import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./BuildingCard.module.css"
import BedCard from "./BedCard"

const BuildingCard = ({ building }: { building: BuildingType }) => {
    const dispatch = useDispatch()
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.bedStyles)

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
    return (
        <div>
            <button type="button" className={styles.collapsableSection} style={{ width: "100%" }} onClick={() => setOpenBuilding(prev => !prev)}>
                {/* <h4 className={styles.sectionTitle}>{building.name}</h4> */}
                <TextInput
                    placeholder="Building name..."
                    value={building.name}
                    setValue={(e) => { e.stopPropagation(); dispatch(setBuildingName({ id: building.id, name: e.target.value })) }}
                    containerClassName={styles.buildingNameInputStyle}
                />
                <Image alt="chevron down" src={openBuilding ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {openBuilding ?
                <div className={styles.buildingCard}>
                    <div className="row-between">
                        <TextInput
                            type="number"
                            label="Number of rooms"
                            placeholder="8"
                            value={building.rooms?.length ?? ""}
                            setValue={(e) => dispatch(setBuildingNumberRooms({ id: building.id, rooms: Number(e.target.value) }))}
                        />
                        <TextInput
                            disabled
                            label="Capacity"
                            value={building.rooms?.reduce((accu, room) =>
                                room.beds.reduce((acc, bed) => acc + (bedStylesMap.get(bed.id)?.capacity * bed.amount), accu), 0)
                                ?? ""}
                        />
                    </div>
                    <div className={styles.housingCardsContainer}>
                        {building.rooms?.map((room, ind) => {
                            return (
                                <div key={ind} className={styles.roomCard}>
                                    <TextInput
                                        inputClassName={styles.inputInsideBox}
                                        placeholder={room.name}
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