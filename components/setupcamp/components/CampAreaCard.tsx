import Images from "@/common/images"
import TextInput from "@/components/TextInput"
import { setCampAreaName, setCampAreaSpaces, setSpaceSpots } from "@/services/redux/slice/retreatcenters"
import { RootState } from "@/services/redux/store"
import { ArgFunction, BedType, CampAreaType, SpaceType, SpotType, } from "@/types"
import { arrayToMap, IDGenerator } from "@/utils/functions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BedCard from "./BedCard"
import styles from "./CampAreaCard.module.css"
import SpotCard from "./SpotCard"

const CampAreaCard = ({ campArea, deleteCampArea }: { campArea: CampAreaType, deleteCampArea: ArgFunction }) => {
    const dispatch = useDispatch()
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.spotStyles)

    const [openSpaceArea, setOpenSpaceArea] = useState(true)

    const spotStylesMap = arrayToMap({ array: BEDSTYLES ?? [], key: "id" })
    const changeSpaceName = ({ name, campAreaId, spaceId, spaces }: { name: string, campAreaId: CampAreaType["id"], spaceId: SpaceType["id"], spaces: CampAreaType["spaces"] }) => {
        const newSpaces = spaces?.map((space) => {
            if (space.id === spaceId) return { ...space, name }
            return space
        })
        dispatch(setCampAreaSpaces({
            id: campAreaId,
            spaces: newSpaces,
        }))
    }
    const addBed = ({
        campAreaId, spaceId, spaces
    }: { campAreaId: CampAreaType["id"], spaceId: SpaceType["id"], spaces: CampAreaType["spaces"] }) => {
        if (!BEDSTYLES) return alert("Add Bed Style")
        if (!BEDSTYLES[0]) return alert("Create a spot style first")
        const spotConfig: BedType = {
            ...BEDSTYLES[0],
            amount: 1
        }
        const newSpaces = spaces?.map((space) => {
            if (space.id === spaceId) return {
                ...space, spots: space.spots ? [...space.spots, spotConfig] : [spotConfig]
            }
            return space
        })

        dispatch(setSpaceSpots({
            campAreaId: campAreaId,
            spaces: newSpaces
        }))
    }

    const updateSpaceAreaSpaces = ({
        campAreaId, spaces
    }: { campAreaId: CampAreaType["id"], spaces: CampAreaType["spaces"] }) => {
        dispatch(setSpaceSpots({
            campAreaId: campAreaId,
            spaces: spaces
        }))
    }
    const setupUpdateSpaceAreaSpaces = (campAreaId: CampAreaType["id"], numberOfSpaces: number) => {
        let newSpaces: Array<SpaceType> = [...campArea.spaces ?? []]
        const length = newSpaces.length
        if (length >= numberOfSpaces) newSpaces = newSpaces.filter((item, index) => index < numberOfSpaces)
        else {
            // const size = Array(numberOfSpaces - length).fill(1)
            // // @ts-ignore
            // const addedSpaces: Array<SpaceType> = size.map((item,index): SpaceType=>({ id: IDGenerator(), name: `Space 1${index + 1 > 9 ? index + 1 : "0" + (index + 1)}`, spots: newSpaces.at(-1) ? newSpaces.at(-1)?.spots : [] }))
            // newSpaces.push(...addedSpaces)

            const size = Array(numberOfSpaces - length).fill(1)
            //@ts-ignore
            const addedRooms: Array<RoomType> = size.map((x, i) => ({ id: IDGenerator(), name: `Space 1${length + i + 1 > 9 ? length + i + 1 : "0" + (length + i + 1)}`, spots: newSpaces.at(-1) ? newSpaces.at(-1).spots : [] }))
            newSpaces.push(...addedRooms)
        }
        dispatch(setSpaceSpots({
            campAreaId: campAreaId,
            spaces: newSpaces
        }))
    }

    return (
        <div>
            <button type="button" className={styles.collapsableSection} style={{ width: "100%" }} onClick={(e) => setOpenSpaceArea(prev => !prev)}>
                <div className="row">
                    {openSpaceArea ? <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={deleteCampArea}
                    >X</button> : null}
                    <TextInput
                        placeholder="Camp area name..."
                        value={campArea.name}
                        onClick={(e) => { e.stopPropagation(); }}
                        setValue={(e) => dispatch(setCampAreaName({ id: campArea.id, name: e.target.value }))}
                        containerClassName={styles.buildingNameInputContainer}
                    /></div>

                <Image alt="chevron down" src={openSpaceArea ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {openSpaceArea ?
                <div className={styles.buildingCard}>
                    <div className="row-between">
                        <div className="row">
                            <TextInput
                                type="number"
                                label="Number of spaces"
                                placeholder="8"
                                value={campArea.spaces?.length ?? ""}
                                setValue={(e) => setupUpdateSpaceAreaSpaces(campArea.id, Number(e.target.value))}
                            />
                            <button
                                type="button"
                                disabled={campArea.spaces?.length === 0}
                                onClick={() => setupUpdateSpaceAreaSpaces(campArea.id, Number(campArea.spaces?.length) - 1)}
                                className={[campArea.spaces?.length === 0 && "disabled", styles.capacityPlus].join(" ")}>-</button>
                            <button
                                type="button"
                                onClick={() => setupUpdateSpaceAreaSpaces(campArea.id, Number(campArea.spaces?.length) + 1)}
                                className={styles.capacityPlus}>+</button>
                        </div>
                        <TextInput
                            disabled
                            label="Capacity"
                            value={campArea.spaces?.reduce((accu, space) =>
                                space.spots?.reduce((acc, spot) => acc + (spotStylesMap.get(spot.id)?.capacity * spot.amount), accu), 0)
                                ?? ""}
                        />
                    </div>
                    <div className={styles.housingCardsContainer}>
                        {campArea.spaces?.map((space, ind) => {
                            return (
                                <div key={ind} className={styles.spaceCard}>
                                    <TextInput
                                        inputClassName={styles.inputInsideBox}
                                        containerClassName={styles.buildingNameInputContainer}
                                        placeholder={"Space name..."}
                                        value={space.name}
                                        setValue={(e) => changeSpaceName({
                                            name: e.target.value,
                                            campAreaId: campArea.id,
                                            spaceId: space.id,
                                            spaces: campArea.spaces
                                        })}
                                    />
                                    {
                                        space.spots?.map((spot, inde) => {
                                            const deleteSpot = () => {
                                                const spaces = campArea.spaces?.map((rm) => {
                                                    if (rm.id === space.id) {
                                                        const newSpots = [...rm.spots]
                                                        newSpots.splice(inde, 1)
                                                        return {
                                                            ...rm,
                                                            spots: newSpots
                                                        }
                                                    }
                                                    return rm
                                                })
                                                updateSpaceAreaSpaces({
                                                    campAreaId: campArea.id,
                                                    spaces: spaces
                                                })
                                            }
                                            const changeSpot = (paramspot: SpotType) => {
                                                const spaces = campArea.spaces?.map((rm) => {
                                                    if (rm.id === space.id) {
                                                        const newSpots = [...rm.spots]
                                                        newSpots.splice(inde, 1, paramspot)
                                                        return {
                                                            ...rm,
                                                            spots: newSpots
                                                        }
                                                    }
                                                    return rm
                                                })
                                                updateSpaceAreaSpaces({
                                                    campAreaId: campArea.id,
                                                    spaces: spaces
                                                })
                                            }
                                            const changeSpotAmount = (value: number, paramspot: SpotType) => {
                                                if (isNaN(value)) return;
                                                if (value < 1) return;
                                                const spaces = campArea.spaces?.map((rm) => {
                                                    if (rm.id === space.id) {
                                                        return {
                                                            ...rm,
                                                            spots: rm.spots.map(b => b.id == paramspot.id ? { ...paramspot, amount: value } : b)
                                                        }
                                                    }
                                                    return rm
                                                })
                                                updateSpaceAreaSpaces({
                                                    campAreaId: campArea.id,
                                                    spaces: spaces
                                                })
                                            }
                                            return (
                                                <div key={inde}>
                                                    <SpotCard
                                                        spot={spot}
                                                        deleteSpot={deleteSpot}
                                                        changeSpot={changeSpot}
                                                        changeSpotAmount={changeSpotAmount}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                    <button
                                        className={styles.addBedButton}
                                        onClick={() => addBed({
                                            campAreaId: campArea.id,
                                            spaceId: space.id,
                                            spaces: campArea.spaces
                                        })}
                                    >
                                        +
                                    </button>
                                    {space.spots.length > 0 ?
                                        <button
                                            className={styles.pricingButton}
                                            onClick={() => {
                                                const spaces = campArea.spaces?.map((rm) => ({ ...rm, spots: space.spots }))
                                                updateSpaceAreaSpaces({
                                                    campAreaId: campArea.id,
                                                    spaces: spaces
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

export default CampAreaCard;