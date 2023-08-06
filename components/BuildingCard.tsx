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

const BuildingCard = ({ building }: { building: BuildingType, }) => {
    const dispatch = useDispatch()
    const [openBuilding, setOpenBuilding] = useState(true)

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
            <button type="button" className={styles.collapsableSection} onClick={(e) => setOpenBuilding(prev => !prev)}>
                <h3>{building.name}</h3>
                <Image alt="chevron down" src={openBuilding ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {openBuilding ?
                <div className={styles.buildingCard}>
                    {building.rooms?.map((room, ind) => {
                        return (
                            <div>

                            </div>
                        )
                    })
                    }
                </div>
                : null}
        </div>
    )
}

export default BuildingCard;