"use client"
import Image from "next/image";
import styles from "./styles.module.css"
import Images from "@/common/images";
import TextInput from "@/components/TextInput";
import { useEffect, useState } from "react";
import { ArgFunction, BedType, DiagramType, HTMLEvent, MeetingRoomType, RoomType } from "@/types";
import Divider from "@/components/Divider";
import FileUpload from "@/components/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { addBedPriceDay, addBedStyle, addHouse, editBedStyleCapacity, editBedStyleName, setBedPrice, setBedStyle, setBedStyles, setBuildingName, setBuildingNumberRooms, setBuildingRooms, setRoomBeds } from "@/services/redux/slice/retreatcenter";
import RadioButton from "@/components/RadioButton";
import CheckBox from "@/components/CheckBox";
import DropDown from "@/components/DropDown";
import { IDGenerator, arrayToMap } from "@/utils/functions";
import { BuildingType } from "@/utils/sampleData";
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
    const BEDS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.bedStyles)
    return (
        <div className={styles.setUpContainer}>
            <div className={styles.BedStylesCardContainer}>
                {
                    BEDS && BEDS.map((bedStyle, i) => {
                        return (
                            <div key={i} className={styles.meetingRoomCard}>
                                <div className="row">
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardNameInputContainer}
                                        inputClassName={styles.meetingRoomCardNameInput}
                                        placeholder={`King bed ${i + 1}`}
                                        value={bedStyle.name}
                                        setValue={e => {
                                        }}
                                    />
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                        inputClassName={styles.meetingRoomCardCapacityInput}
                                        labelClassName={styles.capacityLabelClassName}
                                        label="Sleep"
                                        bottomLabel="Each"
                                        value={bedStyle.capacity}
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
                    () => dispatch(addBedStyle({
                        id: String(BEDS ? BEDS.length + 1 : 1),
                        name: `King bed ${BEDS ? BEDS.length + 1 : 1}`,
                        capacity: 3,
                        pricing: 10
                    }))
                }
            >
                +
            </button>
        </div>
    )
}
const BedStylesSetup = () => {
    const dispatch = useDispatch()
    const BEDS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.bedStyles);
    const [showPricing, setShowPricing] = useState(false)
    return (
        <div>
            {/* {
                    BEDS && BEDS.map((bedstyle, i) => {
                        return (
                            <div key={i} className={styles.meetingRoomCard}>
                                <div className="row">
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardNameInputContainer}
                                        inputClassName={styles.meetingRoomCardNameInput}
                                        placeholder={`King bed`}
                                        value={bedstyle.name}
                                        setValue={e => dispatch(editBedStyleName({
                                            id: bedstyle.id,
                                            name: e.target.value
                                        }))}
                                    />
                                    <TextInput
                                        containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                        inputClassName={styles.meetingRoomCardCapacityInput}
                                        labelClassName={styles.capacityLabelClassName}
                                        label="Sleep"
                                        bottomLabel="Each"
                                        value={bedstyle.capacity}
                                        setValue={e => dispatch(editBedStyleCapacity({
                                            id: bedstyle.id,
                                            capacity: Number(e.target.value)
                                        }))}
                                    />
                                </div>
                                <button
                                    className={styles.pricingButton}
                                    onClick={() => setShowPricing(prev => !prev)}
                                >
                                    <span>Price list</span>
                                </button>
                                {showPricing ?
                                    <div className={styles.pricingContainer}>
                                        <div className={styles.pricingCardContainer}>
                                            {
                                                Array.isArray(bedstyle.pricing) ? bedstyle.pricing.map((price, priceIndex) => {
                                                    return (
                                                        <div
                                                            key={priceIndex}
                                                            className={styles.pricingCard}
                                                        >
                                                            <button
                                                                type="button"
                                                                className={styles.deletePriceButton}
                                                                onClick={() => {
                                                                    let newPrice = Array.isArray(bedstyle.pricing) ? [...bedstyle.pricing] : bedstyle.pricing
                                                                    if (Array.isArray(newPrice) && newPrice.length > 1) {
                                                                        newPrice.splice(priceIndex, 1);
                                                                        newPrice = newPrice.map((p, ix) => ({ ...p, nights: ix + 1 }))
                                                                    }
                                                                    dispatch(setBedPrice({
                                                                        id: bedstyle.id,
                                                                        price: newPrice
                                                                    }))
                                                                }}>X</button>
                                                            <TextInput
                                                                containerClassName="row-reverse no-wrap"
                                                                label={`$  per ${priceIndex + 1} night`}
                                                                value={price.price}
                                                                setValue={(e) => {
                                                                    const value = Number(e.target.value);
                                                                    if (isNaN(value)) return alert("Price is not a number")
                                                                    if (!Array.isArray(bedstyle.pricing)) return;
                                                                    const newPrice = bedstyle.pricing.map(pr => pr.nights === price.nights ? { nights: price.price, price: value } : pr)
                                                                    dispatch(setBedPrice({
                                                                        id: bedstyle.id,
                                                                        price: newPrice
                                                                    }))
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                }) : (
                                                    <div className={styles.pricingCard}>
                                                        <TextInput
                                                            containerClassName="row-reverse no-wrap"
                                                            label={`per night`}
                                                            value={bedstyle.pricing.price}
                                                            setValue={(e) => {
                                                                const value = Number(e.target.value);
                                                                if (isNaN(value)) return alert("Price is not a number")
                                                                dispatch(setBedPrice({
                                                                    id: bedstyle.id,
                                                                    price: {
                                                                        nights: i + 1,
                                                                        price: value
                                                                    }
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                )

                                            }
                                        </div>


                                        <button
                                            className={styles.addMeetingRoomButton}
                                            onClick={
                                                () => dispatch(addBedPriceDay({
                                                    id: bedstyle.id,
                                                    price: {
                                                        nights: Array.isArray(bedstyle.pricing) ? bedstyle.pricing.length + 1 : 2,
                                                        price: 90
                                                    }
                                                }))
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    : null}
                            </div>
                        )
                    })
                } */}
            {/* <button
                className={styles.addMeetingRoomButton}
                onClick={
                    () => dispatch(addBedStyle({
                        id: String(BEDS ? BEDS.length + 1 : 1),
                        name: `King bed`,
                        capacity: 3,
                        pricing: {
                            nights: "*",
                            pricing: 80
                        }
                    }))
                }
            >
                +
            </button> */}
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
        id: String(prev.length + 1),
        name: `Meeting room ${prev.length + 1}`,
        capacity: 0
    }])

    const addDiagram = () => setDiagrams(prev => [...prev,
    {
        id: String(prev.length + 1),
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
            <div className={styles.housingCardsContainer}>

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
    const dispatch = useDispatch()
    const BEDSTYLES = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.bedStyles)
    const BUILDINGS = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.housing.buildings)

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
    const bedStylesMap = arrayToMap({ array: BEDSTYLES ?? [], key: "id" })
    return (
        <div className={styles.setUpContainer}>
            {
                BUILDINGS && BUILDINGS.map((building, i) => {
                    return (
                        <div key={i} className={styles.buildingCard}>
                            <div className="row-between">
                                <TextInput
                                    label="House name"
                                    placeholder="Building A"
                                    value={building.name}
                                    setValue={(e) => dispatch(setBuildingName({ id: building.id, name: e.target.value }))} />
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
                                        room.beds.reduce((acc, bed) => acc + (bedStylesMap.get(bed.id)["capacity"] * bed.amount), accu), 0)
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
                    )
                })
            }
            <button
                className={styles.addHousingButton}
                onClick={() => {
                    dispatch(addHouse({
                        id: IDGenerator(),
                        name: "",
                        type: "Housing",
                        rooms: []
                    }))
                }}
            >
                +
            </button>
        </div>
    )
}
const BedCard = ({
    bed,
    deleteBed,
    changeBed,
    changeBedAmount,
}: {
    bed: BedType,
    deleteBed: ArgFunction,
    changeBed: ArgFunction,
    changeBedAmount: ArgFunction,
}) => {
    const dispatch = useDispatch()
    const bedstyles = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.bedStyles)
    const [showBedStyleOptions, setShowBedStyleOptions] = useState(false)
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowBedStyleOptions(false)
            }
            if (event.key === 'Enter') {
                setShowBedStyleOptions(false)
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);


    const changeBedCapacity = (value: number, parambed: BedType) => {
        if (isNaN(value)) return;
        const newBedStyles = bedstyles?.map((bedstyle) => bedstyle.id === parambed.id ? ({ ...bedstyle, capacity: value }) : bedstyle)
        dispatch(setBedStyles(newBedStyles))
    }
    const changeBedName = (value: string, parambed: BedType) => {
        const newBedStyles = bedstyles?.map((bedstyle) => bedstyle.id === parambed.id ? ({ ...bedstyle, name: value }) : bedstyle)
        dispatch(setBedStyles(newBedStyles))
    }

    return (
        <div className={styles.bedCard}>
            <div className="row-between" style={{ margin: "10px 5px 5px 5px", position: "relative" }}>
                <button
                    type="button"
                    className={styles.deletePriceButton}
                    onClick={() => {
                        deleteBed()
                        // let newPrice = Array.isArray(bed.pricing) ? [...bed.pricing] : bed.pricing
                        // if (Array.isArray(newPrice) && newPrice.length > 1) {
                        //     newPrice.splice(priceIndex, 1);
                        //     newPrice = newPrice.map((p, ix) => ({ ...p, nights: ix + 1 }))
                        // }
                        // dispatch(setBedPrice({
                        //     id: bed.id,
                        //     price: newPrice
                        // }))
                    }}>X</button>
                {
                    showBedStyleOptions ? (
                        <div
                            className={styles.bedStyleOptionsContainer}
                            onClick={(e) => { e.stopPropagation(); setShowBedStyleOptions(false) }}

                        >
                            {
                                bedstyles?.map((bedstyle, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={styles.bedStyleOption}
                                            style={{ width: "90%" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                changeBed({ ...bedstyle, amount: bed.amount });
                                                setShowBedStyleOptions(false)
                                            }}

                                        >
                                            <button
                                                className={styles.optionBedButton}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    changeBed({ ...bedstyle, amount: bed.amount })
                                                    setShowBedStyleOptions(false)
                                                }}
                                                style={{
                                                    color: bedstyle.name === bed.name ? "#000" : "#999"
                                                }}
                                            >
                                                <TextInput
                                                    onClick={(e) => { e.stopPropagation(); changeBed({ ...bedstyle, amount: bed.amount }) }}
                                                    containerClassName={styles.bedInputStyle}
                                                    value={bedstyle.name}
                                                    setValue={(e) => changeBedName(e.target.value, bedstyle)}
                                                />
                                            </button>
                                            <TextInput
                                                onClick={(e) => { e.stopPropagation(); changeBed({ ...bedstyle, amount: bed.amount }) }}
                                                inputClassName={styles.bedCapacityInput}
                                                labelClassName={styles.capacityLabelClassName}
                                                value={bedstyle.capacity}
                                                setValue={(e) => changeBedCapacity(Number(e.target.value), bedstyle)}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <button
                                className={styles.addMeetingRoomButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(addBedStyle({
                                        id: IDGenerator(),
                                        name: `King bed`,
                                        capacity: 3,
                                        pricing: 10
                                    }))
                                }}
                            >+</button>
                        </div>
                    ) : (
                        <button className={styles.selectBedButton} onClick={() => setShowBedStyleOptions(prev => !prev)}>
                            {bed.name}
                        </button>
                    )
                }
                <div className={styles.amountControlContainer}>
                    <TextInput
                        containerClassName={styles.bedCapacityInputContainer}
                        inputClassName={styles.bedCapacityInput}
                        value={bed.amount}
                        setValue={(e) => changeBedAmount(Number(e.target.value), bed)}
                    />
                </div>
            </div>
            <button className={styles.pricingButton}>pricing</button>
        </div>
    )
}
export default (Userprofile);