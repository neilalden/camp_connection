"use client"
import Image from "next/image";
import styles from "./styles.module.css"
import Images from "@/common/images";
import TextInput from "@/components/TextInput";
import { useEffect, useState } from "react";
import { ArgFunction, BedType, DiagramType, HTMLEvent, MeetingRoomType, RoomType, SpotType } from "@/types";
import Divider from "@/components/Divider";
import FileUpload from "@/components/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { addBedPriceDay, addBedStyle, addHouse, addItemType, addSpotStyle, editBedStyleCapacity, editBedStyleName, setBedPrice, setBedStyle, setBedStyles, setBuildingName, setBuildingNumberRooms, setBuildingRooms, setRoomBeds, setSpots } from "@/services/redux/slice/retreatcenter";
import RadioButton from "@/components/RadioButton";
import CheckBox from "@/components/CheckBox";
import DropDown from "@/components/DropDown";
import { IDGenerator, arrayToMap } from "@/utils/functions";
import { BuildingType, RetreatCenterType } from "@/utils/sampleData";
import HousingSetup from "@/components/setupcamp/components/HousingSetup";
import SpotCard from "@/components/setupcamp/components/SpotCard";
const Userprofile = () => {
    const [showHousing, setShowHousing] = useState(false)
    const [showRvAndTent, setShowRvAndTent] = useState(false)
    const [showActivities, setShowActivities] = useState(false)
    const [showMeetingRooms, setShowMeetingRooms] = useState(false)
    const [showItems, setShowItems] = useState(false)
    return (
        <div className={styles.container}>
            <button type="button" className={styles.collapsableSection} onClick={() => setShowHousing(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Housing</h3>
                <Image alt="chevron down" src={showHousing ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {showHousing ? <HousingSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowRvAndTent(prev => !prev)}>
                <h3 className={styles.sectionTitle}>RV & Tent</h3>
                <Image alt="chevron down" src={showRvAndTent ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {showRvAndTent ? <RVAndTenntSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowActivities(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Activities</h3>
                <Image alt="chevron down" src={showActivities ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {showActivities ? <ActivitiesSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowMeetingRooms(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Meeting Rooms</h3>
                <Image alt="chevron down" src={showMeetingRooms ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </button>
            {showMeetingRooms ? <MeetingRoomsSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowItems(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Items</h3>
                <Image src={showItems ? Images.ic_chevron_up : Images.ic_chevron_down} alt="chevron down" height={15} />
            </button>
            {showItems ? <ItemsSetup /> : null}

            <Divider style={{ padding: 100, background: "none" }} />

        </div>
    )
}
const ItemsSetup = () => {
    const dispatch = useDispatch()
    const ITEMS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.items)
    return (
        <div className={styles.setUpContainer}>
            <div className={styles.BedStylesCardContainer}>
                {
                    ITEMS && ITEMS.map((item, i) => {
                        return (
                            <div key={i} className={styles.spotCard}>
                                <div className="row">
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardNameInputContainer}
                                        inputClassName={styles.meetingRoomCardNameInput}
                                        placeholder={`King bed ${i + 1}`}
                                        value={item.name}
                                        setValue={e => {
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button
                className={styles.addMeetingRoomButton}
                onClick={
                    () => dispatch(addItemType({
                        id: IDGenerator(),
                        name: `Camp Item ${ITEMS ? ITEMS.length + 1 : 1}`,
                        amount: 10
                    }))
                }
            >
                +
            </button>
        </div>
    )
}
const MeetingRoomsSetup = () => {
    const [meetingRooms, setMeetingRooms] = useState<Array<MeetingRoomType>>([])
    const [diagrams, setDiagrams] = useState<Array<DiagramType>>([])
    const changeName = (name: string, meetingRoomId: string) => {
        const newRooms = meetingRooms.map((mr) => {
            if (mr.id === meetingRoomId) return { ...mr, name }
            return mr
        })
        setMeetingRooms(newRooms)
    }
    const changeValue = (value: string, meetingRoomId: string) => {
        if (isNaN(Number(value))) return
        const newRooms = meetingRooms.map((mr) => {
            if (mr.id === meetingRoomId) return { ...mr, capacity: Number(value) }
            return mr
        })
        setMeetingRooms(newRooms)
    }
    const addMeetingRoom = () => setMeetingRooms((prev) => [...prev, {
        id: IDGenerator(),
        name: `Meeting room ${prev.length + 1}`,
        capacity: 0
    }])

    const addDiagram = () => setDiagrams(prev => [...prev,
    {
        id: IDGenerator(),
        name: `Meeting room ${prev.length + 1}`,
    }])
    return (
        <div className={styles.meetingSetupContainer}>
            <div className={styles.meetingRoomCardsContainer}>
                {
                    meetingRooms.map((meetingRoom, i) => {
                        return (
                            <div key={meetingRoom.id} className={styles.meetingRoomCard}>
                                <div className="row">

                                    <TextInput
                                        containerClassName={styles.meetingRoomCardNameInputContainer}
                                        inputClassName={styles.meetingRoomCardNameInput}
                                        placeholder={`Meeting Room ${i + 1}`}
                                        value={meetingRoom.name}
                                        setValue={(e) => changeName(e.target.value, meetingRoom.id)}
                                    />
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                        inputClassName={styles.meetingRoomCardCapacityInput}
                                        labelClassName={styles.capacityLabelClassName}
                                        label="Capacity"
                                        value={meetingRoom.capacity}
                                        setValue={(e) => changeValue(e.target.value, meetingRoom.id)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <button
                    className={styles.addMeetingRoomButton}
                    onClick={addMeetingRoom}
                >
                    +
                </button>
            </div>
            <div className={styles.diagramCardsContainer}>
                {
                    diagrams.map((diagram, i) => {
                        return (
                            <div key={diagram.id} className={styles.diagramCard}>

                                <TextInput
                                    placeholder={`Meeting Room ${i + 1}`}
                                    value={diagram.name}
                                    setValue={(e) => changeName(e.target.value, diagram.id)}
                                />
                                <TextInput
                                    label="Capacity"
                                    value={diagram.name}
                                    setValue={(e) => changeValue(e.target.value, diagram.id)}
                                />
                            </div>
                        )
                    })
                }
                <button
                    className={styles.addMeetingRoomButton}
                    onClick={addDiagram}
                >
                    +
                </button>
            </div>
        </div>
    )
}
const ActivitiesSetup = () => {
    return (<div className={styles.setUpContainer}></div>
    )
}
const RVAndTenntSetup = () => {
    const dispatch = useDispatch()
    const SPOTS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.spots)
    const SPOTSSTYLES = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.spotStyles)
    const [file, setFile] = useState()

    const updateSpots = (spots: RetreatCenterType["spots"]) => {
        dispatch(setSpots({
            spots: spots,
        }))
    }

    return (

        <div className={styles.setUpContainer}>
            <div className="row-between">
                <TextInput
                    inputClassName="box-shadow"
                    label="Number of spots"
                    type="number"
                    placeholder="8"
                    value={Number(SPOTS?.length ?? 0)}
                    setValue={(e) => {
                        const value = Number(e.target.value)
                        if (isNaN(value) || value < 0) return
                        const spotObject: SpotType = SPOTSSTYLES ? SPOTSSTYLES[0] : {
                            id: IDGenerator(),
                            name: `RV Spot`,
                            capacity: 3,
                            pricing: {
                                nights: "*",
                                price: 20
                            },
                            amount: 5
                        }
                        const newSpots = Array(Number(value)).fill(spotObject)
                        updateSpots(newSpots)
                    }}

                />
                <FileUpload
                    label="RV & Tent Contract"
                    inputClassName="box-shadow"
                    setValue={setFile}
                />
            </div>
            <div className={styles.housingCardsContainer}>

                {
                    SPOTS && SPOTS.map((spot, i) => {
                        const deleteSpot = () => {
                            let spots = [...SPOTS]
                            spots.splice(i, 1)
                            updateSpots(spots)
                        }
                        const changeSpot = (spot: SpotType) => {
                            let spots = [...SPOTS]
                            spots[i] = spot
                            updateSpots(spots)
                        }
                        const changeSpotAmount = (value: number, spot: SpotType) => {
                            if (isNaN(value)) return;
                            const spots = [...SPOTS]?.map((sp) => sp.id == spot.id ? { ...spot, amount: value } : sp)
                            updateSpots(spots)
                        }
                        return (
                            <SpotCard key={i}
                                spot={spot}
                                changeSpot={changeSpot}
                                changeSpotAmount={changeSpotAmount}
                                deleteSpot={deleteSpot}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}
export default (Userprofile);