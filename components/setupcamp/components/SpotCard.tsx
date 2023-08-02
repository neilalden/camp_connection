import TextInput from "@/components/TextInput";
import { setBedStyles, addSpotStyle } from "@/services/redux/slice/retreatcenter";
import { RootState } from "@/services/redux/store";
import { BedType, SpotType } from "@/types";
import { IDGenerator } from "@/utils/functions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SpotCard.module.css"
const SpotCard = ({
    spot,
    deleteSpot,
    changeSpot,
    changeSpotAmount,
}: {
    spot: BedType,
    deleteSpot: VoidFunction,
    changeSpot: (spot: SpotType) => void,
    changeSpotAmount: (value: number, spot: SpotType) => void,
}) => {
    const dispatch = useDispatch()
    const spotStyles = useSelector((state: RootState) => state.RetreatCenter.retreatCenter.spotStyles)
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
        const newBedStyles = spotStyles?.map((spotStyle) => spotStyle.id === parambed.id ? ({ ...spotStyle, capacity: value }) : spotStyle)
        dispatch(setBedStyles(newBedStyles))
    }
    const changeBedName = (value: string, parambed: BedType) => {
        const newBedStyles = spotStyles?.map((spotStyle) => spotStyle.id === parambed.id ? ({ ...spotStyle, name: value }) : spotStyle)
        dispatch(setBedStyles(newBedStyles))
    }

    return (
        <div className={styles.spotCard}>
            <div className="row-between" style={{ margin: "10px 5px 5px 5px", position: "relative" }}>
                <button
                    type="button"
                    className={styles.deletePriceButton}
                    onClick={deleteSpot}>X</button>
                {
                    showBedStyleOptions ? (
                        <div
                            className={styles.bedStyleOptionsContainer}
                            onClick={(e) => { e.stopPropagation(); setShowBedStyleOptions(false) }}

                        >
                            {
                                spotStyles?.map((spotStyle, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={styles.bedStyleOption}
                                            style={{ width: "90%" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                changeSpot({ ...spotStyle, amount: spot.amount });
                                                setShowBedStyleOptions(false)
                                            }}

                                        >
                                            <button
                                                className={styles.optionBedButton}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    changeSpot({ ...spotStyle, amount: spot.amount })
                                                    setShowBedStyleOptions(false)
                                                }}
                                                style={{
                                                    color: spotStyle.name === spot.name ? "#000" : "#999"
                                                }}
                                            >
                                                <TextInput
                                                    onClick={(e) => { e.stopPropagation(); changeSpot({ ...spotStyle, amount: spot.amount }) }}
                                                    containerClassName={styles.bedInputStyle}
                                                    value={spotStyle.name}
                                                    setValue={(e) => changeBedName(e.target.value, spotStyle)}
                                                />
                                            </button>
                                            <TextInput
                                                onClick={(e) => { e.stopPropagation(); changeSpot({ ...spotStyle, amount: spot.amount }) }}
                                                inputClassName={styles.bedCapacityInput}
                                                labelClassName={styles.capacityLabelClassName}
                                                value={spotStyle.capacity}
                                                setValue={(e) => changeBedCapacity(Number(e.target.value), spotStyle)}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <button
                                className={styles.addMeetingRoomButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(addSpotStyle({
                                        id: IDGenerator(),
                                        name: `RV Spot`,
                                        capacity: 3,
                                        pricing: {
                                            nights: "*",
                                            price: 20
                                        },
                                        amount: 5
                                    }))
                                }}
                            >+</button>
                        </div>
                    ) : (
                        <button className={styles.selectBedButton} onClick={() => setShowBedStyleOptions(prev => !prev)}>
                            {spot.name}
                        </button>
                    )
                }
                <div className={styles.amountControlContainer}>
                    <TextInput
                        containerClassName={styles.bedCapacityInputContainer}
                        inputClassName={styles.bedCapacityInput}
                        value={spot.amount}
                        setValue={(e) => changeSpotAmount(Number(e.target.value), spot)}
                    />
                </div>
            </div>
            <button className={styles.pricingButton}>pricing</button>
        </div>
    )
}

export default SpotCard