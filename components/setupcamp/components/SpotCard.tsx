import Images from "@/common/images";
import TextInput from "@/components/TextInput";
import { addSpotStyle, setSpotStyles, } from "@/services/redux/slice/retreatcenters";
import { RootState } from "@/services/redux/store";
import { SpotType, } from "@/types";
import { IDGenerator } from "@/utils/functions";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSpotStyleComponent from "./AddSpotStyleComponent";
import Modal from "./Modal";
import styles from "./SpotCard.module.css"
const SpotCard = ({
    spot,
    deleteSpot,
    changeSpot,
    changeSpotAmount,
}: {
    spot: SpotType,
    deleteSpot: VoidFunction,
    changeSpot: (spot: SpotType) => void,
    changeSpotAmount: (value: number, spot: SpotType) => void,
}) => {
    const dispatch = useDispatch()
    const spotStyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.spotStyles)
    const [showSpotStyleOptions, setShowSpotStyleOptions] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [toEditSpotStyle, setToEditSpotStyle] = useState<SpotType | undefined>()
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowSpotStyleOptions(false)
            }
            if (event.key === 'Enter') {
                setShowSpotStyleOptions(false)
            }
            if (event.key === 'Space') {
                setShowSpotStyleOptions(false)
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);


    const changeSpotCapacity = (value: number, paramspot: SpotType) => {
        if (isNaN(value)) return;
        const newSpotStyles = spotStyles?.map((spotStyle) => spotStyle.id === paramspot.id ? ({ ...spotStyle, capacity: value }) : spotStyle)
        dispatch(setSpotStyles(newSpotStyles))
    }
    const changeSpotName = (value: string, paramspot: SpotType) => {
        const newSpotStyles = spotStyles?.map((spotStyle) => spotStyle.id === paramspot.id ? ({ ...spotStyle, name: value }) : spotStyle)
        dispatch(setSpotStyles(newSpotStyles))
    }

    return (
        <div className={styles.spotCard}
            onClick={() => setShowSpotStyleOptions(prev => prev ? true : false)}
        >
            {showModal ? <Modal setIsVisible={setShowModal} component={<AddSpotStyleComponent SpotStyle={toEditSpotStyle} setIsVisible={setShowModal} />} /> : null}
            <div className="row-between" style={{ margin: "10px 5px 5px 5px", position: "relative" }}>
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={deleteSpot}>X</button>
                {
                    showSpotStyleOptions ? (
                        <React.Fragment>
                            <div className={styles.darkBackground} onClick={() => setShowSpotStyleOptions(false)} />
                            <div
                                className={styles.spotStyleOptionsContainer}
                                onClick={() => setShowSpotStyleOptions(prev => prev ? false : true)}

                            >
                                {
                                    spotStyles?.map((spotstyle, i) => {
                                        const currentSpot = spotstyle.id === spot.id
                                        return (
                                            <div
                                                key={i}
                                                className={styles.spotStyleOption}
                                                style={{ width: "90%" }}
                                                onClick={(e) => {
                                                    changeSpot({ ...spotstyle, amount: spot.amount });
                                                    setShowSpotStyleOptions(prev => prev ? false : true)
                                                }}

                                            >
                                                <button
                                                    type="button"
                                                    className={styles.optionSpotButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        changeSpot({ ...spotstyle, amount: spot.amount })
                                                        setShowSpotStyleOptions(false)
                                                    }}
                                                    style={{
                                                        color: currentSpot ? "#000" : "#999"
                                                    }}
                                                >
                                                    {spotstyle.name} {currentSpot ? "▴" : ""}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setToEditSpotStyle(spotstyle)
                                                        setShowModal(true)
                                                    }}
                                                    style={{ marginTop: "5px" }}
                                                >
                                                    <Image src={Images.ic_edit_gray} alt="edit icon" height={15} />
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                                <button
                                    type="button"
                                    className={styles.addMeetingRoomButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setToEditSpotStyle(undefined)
                                        setShowModal(true)
                                    }}
                                >+</button>

                            </div>
                        </React.Fragment>
                    ) : (
                        <button
                            type="button" className={styles.selectSpotButton} onClick={(e) => { e.stopPropagation(); setShowSpotStyleOptions(true) }}>
                            {spot.name} ▾
                        </button>
                    )
                }
                <div className="row">

                    <div className={styles.amountControlContainer}>
                        <TextInput
                            containerClassName={styles.spotCapacityInputContainer}
                            inputClassName={styles.spotCapacityInput}
                            value={spot.amount}
                            setValue={(e) => { e.stopPropagation(); changeSpotAmount(Number(e.target.value), spot) }}
                        />
                    </div>
                    <button
                        type="button"
                        disabled={spot.amount <= 1}
                        onClick={() => changeSpotAmount(spot.amount - 1, spot)}
                        className={[spot.amount <= 1 && "disabled", styles.capacityPlus].join(" ")}>-</button>
                    <button
                        type="button"
                        onClick={() => changeSpotAmount(spot.amount + 1, spot)}
                        className={styles.capacityPlus}>+</button>
                </div>
            </div>
        </div>
    )
}

export default SpotCard