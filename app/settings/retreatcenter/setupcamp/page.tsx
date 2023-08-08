"use client"
import Image from "next/image";
import styles from "./styles.module.css"
import Images from "@/common/images";
import TextInput from "@/components/TextInput";
import { useEffect, useState } from "react";
import { ArgFunction, BedType, DiagramType, HTMLEvent, MeetingRoomType, RoomType, CampAreaType, BuildingType, RetreatCenterType } from "@/types";
import Divider from "@/components/Divider";
import FileUpload from "@/components/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { addMeetingRoom, addItemStyle, addDiagramStyle, setDiagramStyles, setMeetingRooms, setRoomBeds, } from "@/services/redux/slice/retreatcenters";
import RadioButton from "@/components/RadioButton";
import CheckBox from "@/components/CheckBox";
import DropDown from "@/components/DropDown";
import { IDGenerator, arrayToMap, ItemGenerator } from "@/utils/functions";
import HousingSetup from "@/components/setupcamp/components/HousingSetup";
import SpotCard from "@/components/setupcamp/components/SpotCard";
import RVAndTentSetup from "@/components/setupcamp/components/RVAndTentSetup";
import ItemsSetup from "@/components/setupcamp/components/ItemsSetupComponent";
import DiagramCard from "@/components/setupcamp/components/DiagramCard";
import ActivitiesSetup from "@/components/setupcamp/components/ActivitiesSetupComponent";
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
            {showRvAndTent ? <RVAndTentSetup /> : null}

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

const MeetingRoomsSetup = () => {
    const dispatch = useDispatch()
    const MEETINGROOMS = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.meetingRooms)
    const DIAGRAMSTYLES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.diagramStyles)
    const changeMeetingRoomName = (name: string, meetingRoomId: string) => {
        if (!MEETINGROOMS) return;
        const newRooms = [...MEETINGROOMS].map((mr) => {
            if (mr.id === meetingRoomId) return { ...mr, name }
            return mr
        })
        dispatch(setMeetingRooms(newRooms))
    }
    const changeMeetingRoomCapacity = (value: string, meetingRoomId: string) => {
        if (isNaN(Number(value))) return
        if (!MEETINGROOMS) return;
        const newRooms = [...MEETINGROOMS].map((mr) => {
            if (mr.id === meetingRoomId) return { ...mr, capacity: Number(value) }
            return mr
        })
        dispatch(setMeetingRooms(newRooms))
    }
    const addMeetingRoomClick = () => {
        dispatch(addMeetingRoom({
            id: IDGenerator(),
            name: `Meeting room ${MEETINGROOMS ? MEETINGROOMS.length + 1 : 1}`,
            capacity: 10,
            occupiedBy: undefined,
            available: true
        }))
    }
    const addDiagramStyleClick = () => {
        dispatch(addDiagramStyle(
            {
                id: IDGenerator(),
                name: `Diagram ${DIAGRAMSTYLES ? DIAGRAMSTYLES.length + 1 : 1}`,
                items: [
                    {
                        id: IDGenerator(),
                        name: "T.V.",
                        amount: 5
                    }
                ]
            }
        ))
    }

    const changeMeetingRoomAvailability = (paramroom: MeetingRoomType) => {
        if (paramroom.occupiedBy) return;
        if (!MEETINGROOMS) return;
        const newRooms = [...MEETINGROOMS].map((mr) => {
            if (mr.id === paramroom.id) return { ...mr, available: !paramroom.available }
            return mr
        })
        dispatch(setMeetingRooms(newRooms))
    }
    return (
        <div className={styles.meetingSetupContainer}>
            <div className={styles.meetingRoomCardsContainer}>
                {
                    MEETINGROOMS && [...MEETINGROOMS].map((meetingRoom, i) => {
                        return (
                            <div key={meetingRoom.id} className={styles.meetingRoomCard}>
                                <div className="row">
                                    <button
                                        type="button"
                                        className={styles.itemDeleteButtom}
                                        onClick={() => {
                                            if (!Array.isArray(MEETINGROOMS)) return;
                                            let newMeetingRooms: RetreatCenterType["meetingRooms"] = [...MEETINGROOMS]
                                            newMeetingRooms.splice(i, 1);
                                            dispatch(setMeetingRooms(newMeetingRooms))
                                        }}>X</button>
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardNameInputContainer}
                                        inputClassName={styles.meetingRoomCardNameInput}
                                        placeholder={`Meeting Room ${i + 1}`}
                                        value={meetingRoom.name}
                                        setValue={(e) => changeMeetingRoomName(e.target.value, meetingRoom.id)}
                                    />
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                        inputClassName={styles.meetingRoomCardCapacityInput}
                                        labelClassName={styles.capacityLabelClassName}
                                        label="Capacity"
                                        value={meetingRoom.capacity}
                                        setValue={(e) => changeMeetingRoomCapacity(e.target.value, meetingRoom.id)}
                                    />

                                    <button className={[meetingRoom.available ? styles.available : styles.unavailable, "texthover"].join(" ")} onClick={() => changeMeetingRoomAvailability(meetingRoom)}>
                                        <Image alt="availability" src={meetingRoom.available ? Images["ic_check_green"] : Images["ic_close_red"]} height={20} width={20} />
                                        <span >{meetingRoom.available ? "available" : "unavailable"}</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                <button
                    className={styles.addMeetingRoomButton}
                    onClick={addMeetingRoomClick}
                >
                    +
                </button>
            </div>
            <div className={styles.diagramCardsContainer}>
                {
                    DIAGRAMSTYLES && [...DIAGRAMSTYLES].map((diagram, i) => {
                        return (
                            <DiagramCard key={i} diagram={diagram} index={i} />
                        )
                    })
                }
                <button
                    className={styles.addMeetingRoomButton}
                    onClick={addDiagramStyleClick}
                >
                    +
                </button>
            </div>
        </div>
    )
}
export default (Userprofile);