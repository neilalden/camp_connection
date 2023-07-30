"use client"
import Image from "next/image";
import styles from "./styles.module.css"
import Images from "@/common/images";
import TextInput from "@/components/TextInput";
import { useEffect, useState } from "react";
import { MeetingRoomType, RoomType } from "@/types";
import Divider from "@/components/Divider";
import FileUpload from "@/components/FileUpload";
const Userprofile = () => {
    const [showHousing, setShowHousing] = useState(false)
    const [showRvAndTent, setShowRvAndTent] = useState(false)
    const [showActivities, setShowActivities] = useState(false)
    const [showMeetingRooms, setShowMeetingRooms] = useState(false)
    const [showBedStyles, setShowBedStyles] = useState(false)
    return (
        <div className={styles.container}>
            <button type="button" className={styles.collapsableSection} onClick={() => setShowHousing(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Housing</h3>
                <Image src={showHousing ? Images.ic_chevron_up : Images.ic_chevron_down} alt="chevron down" height={15} />
            </button>
            {showHousing ? <HousingSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowRvAndTent(prev => !prev)}>
                <h3 className={styles.sectionTitle}>RV & Tent</h3>
                <Image src={showRvAndTent ? Images.ic_chevron_up : Images.ic_chevron_down} alt="chevron down" height={15} />
            </button>
            {showRvAndTent ? <RVAndTenntSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowActivities(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Activities</h3>
                <Image src={showActivities ? Images.ic_chevron_up : Images.ic_chevron_down} alt="chevron down" height={15} />
            </button>
            {showActivities ? <ActivitiesSetup /> : null}

            <button type="button" className={styles.collapsableSection} onClick={() => setShowMeetingRooms(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Meeting Rooms</h3>
                <Image src={showMeetingRooms ? Images.ic_chevron_up : Images.ic_chevron_down} alt="chevron down" height={15} />
            </button>
            {showMeetingRooms ? <MeetingRoomsSetup /> : null}


            <button type="button" className={styles.collapsableSection} onClick={() => setShowBedStyles(prev => !prev)}>
                <h3 className={styles.sectionTitle}>Bed Styles</h3>
                <Image src={showBedStyles ? Images.ic_chevron_up : Images.ic_chevron_down} alt="chevron down" height={15} />
            </button>
            {showBedStyles ? <MeetingRoomsSetup /> : null}

            <Divider style={{ padding: 100, background: "none" }} />

        </div>
    )
}
const MeetingRoomsSetup = () => {
    const [meetingRooms, setMeetingRooms] = useState<Array<MeetingRoomType>>([])
    const [diagrams, setDiagrams] = useState<Array<RoomType>>([])
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
    const addMeetingRoom = () => setMeetingRooms((prev) => [...prev,
    {
        id: String(prev.length + 1),
        name: `Meeting room ${prev.length + 1}`,
        capacity: 0
    }
    ])
    return (
        <div className={styles.meetingSetupContainer}>
            <div className={styles.meetingRoomCardsContainer}>
                {
                    meetingRooms.map((meetingRoom, i) => {
                        return (
                            <div key={meetingRoom.id} className={styles.meetingRoomCard}>
                                <TextInput
                                    placeholder={`Meeting Room ${i + 1}`}
                                    value={meetingRoom.name}
                                    setValue={(e) => changeName(e.target.value, meetingRoom.id)}
                                />
                                <TextInput
                                    label="Capacity"
                                    value={meetingRoom.capacity}
                                    setValue={(e) => changeValue(e.target.value, meetingRoom.id)}
                                />
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
                    diagrams.map((diagram) => {
                        return (
                            <div key={diagram.id}>

                            </div>
                        )
                    })
                }
                <button className={styles.addMeetingRoomButton}>
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
    const [numberOfSpots, setNumberOfSpots] = useState(0)
    const [file, setFile] = useState()
    const [spots, setSpots] = useState<Array<RoomType>>([])

    useEffect(() => {
        if (isNaN(numberOfSpots) || numberOfSpots < 0) return
        const spotObject = {
            id: "",
            name: "",
            beds: []
        }
        const spotArray = Array(Number(numberOfSpots)).fill(spotObject)
        setSpots(spotArray.map((spot, i) => ({ ...spot, id: i, name: `Spot ${i + 1}` })))

    }, [numberOfSpots])
    const changeName = (name: string, meetingRoomId: string) => {
        const newRooms = spots.map((spot) => {
            if (spot.id === meetingRoomId) return { ...spot, name }
            return spot
        })
        setSpots(newRooms)
    }

    const setRoomName = (name: string) => {

    }
    return (
        <div className={styles.setUpContainer}>
            <div className="row-between">
                <TextInput
                    inputClassName="box-shadow"
                    label="Number of spots"
                    type="number"
                    placeholder="8"
                    value={numberOfSpots}
                    setValue={(e) => setNumberOfSpots(Number(e.target.value))}


                />
                <FileUpload
                    label="RV & Tent Contract"
                    inputClassName="box-shadow"
                    setValue={setFile}
                />
            </div>
            <div className={styles.cardsContainer}>

                {spots.map((spot) => {
                    return (
                        <div key={spot.id} className={styles.roomCard}>
                            <TextInput
                                inputClassName={styles.inputInsideBox}
                                placeholder={spot.name}
                                value={spot.name}
                                setValue={(e) => changeName(e.target.value, spot.id)}
                            />
                            <button className={styles.addBedButton}>
                                +
                            </button>
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}
const HousingSetup = () => {
    const [buildingName, setBuildingName] = useState("")
    const [numberOfRooms, setNumberOfRooms] = useState(0)
    const [capacity, setCapacity] = useState("")
    const [rooms, setRooms] = useState<Array<RoomType>>([])

    useEffect(() => {
        if (isNaN(numberOfRooms) || numberOfRooms < 0) return
        const roomObject = {
            id: "",
            name: "",
            beds: []
        }
        const roomArray = Array(Number(numberOfRooms)).fill(roomObject)
        setRooms(roomArray.map((room, i) => (
            {
                ...room,
                id: i,
                name: `Room 1${i + 1 > 9 ? i + 1 : "0" + (i + 1)}`
            }
        )))

    }, [numberOfRooms])
    const changeName = (name: string, meetingRoomId: string) => {
        const newRooms = rooms.map((mr) => {
            if (mr.id === meetingRoomId) return { ...mr, name }
            return mr
        })
        setRooms(newRooms)
    }
    return (
        <div className={styles.setUpContainer}>
            <TextInput
                containerClassName={styles.buildingName}
                inputClassName="box-shadow"
                label="House/building name"
                placeholder="Building A"
                value={buildingName}
                setValue={(e) => setBuildingName(e.target.value)} />
            <div className="row-between">
                <TextInput
                    type="number"
                    inputClassName="box-shadow"
                    label="Number of rooms"
                    placeholder="8"
                    value={numberOfRooms}
                    setValue={(e) => setNumberOfRooms(Number(e.target.value))}
                />
                <TextInput
                    disabled
                    inputClassName="box-shadow"
                    label="Capacity"
                    value={capacity}
                    setValue={(e) => setCapacity(e.target.value)}
                />
            </div>
            <div className={styles.housingCardsContainer}>

                {rooms.map((room) => {
                    return (
                        <div key={room.id} className={styles.roomCard}>
                            <TextInput
                                inputClassName={styles.inputInsideBox}
                                placeholder={room.name}
                                value={room.name}
                                setValue={(e) => changeName(e.target.value, room.id)}
                            />

                            <button className={styles.addBedButton}>
                                +
                            </button>
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}

export default (Userprofile);