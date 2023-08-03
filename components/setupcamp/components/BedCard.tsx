import TextInput from "@/components/TextInput";
import { setBedStyles, addBedStyle } from "@/services/redux/slice/retreatcenter";
import { RootState } from "@/services/redux/store";
import { BedType, ArgFunction } from "@/types";
import { IDGenerator } from "@/utils/functions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BedCard.module.css"
import Images from "@/common/images";
import Image from "next/image";
import Modal from "./Modal";
import AddBedStyleComponent from "./AddBedStyleComponent";

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
    const [showModal, setShowModal] = useState(false)
    const [toEditBedStyle, setToEditBedStyle] = useState<BedType | undefined>()
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

    return (
        <div className={styles.bedCard}
            onClick={() => setShowBedStyleOptions(prev => prev ? true : false)}
        >
            {showModal ? <Modal setIsVisible={setShowModal} component={<AddBedStyleComponent BedStyle={toEditBedStyle} setIsVisible={setShowModal} />} /> : null}
            <div className="row-between" style={{ margin: "10px 5px", position: "relative" }}
                onClick={() => setShowBedStyleOptions(false)}
            >
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={deleteBed}>X</button>
                {
                    showBedStyleOptions ? (
                        <React.Fragment>
                            <div className={styles.darkBackground} onClick={() => setShowBedStyleOptions(false)} />

                            <div
                                className={styles.bedStyleOptionsContainer}
                                onClick={() => setShowBedStyleOptions(prev => prev ? false : true)}

                            >
                                {
                                    bedstyles?.map((bedstyle, i) => {
                                        const currentBed = bedstyle.id === bed.id
                                        return (
                                            <div
                                                key={i}
                                                className={styles.bedStyleOption}
                                                style={{ width: "90%" }}
                                                onClick={(e) => {
                                                    changeBed({ ...bedstyle, amount: bed.amount });
                                                    setShowBedStyleOptions(prev => prev ? false : true)
                                                }}

                                            >
                                                <button
                                                    type="button"
                                                    className={styles.optionBedButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        changeBed({ ...bedstyle, amount: bed.amount })
                                                        setShowBedStyleOptions(false)
                                                    }}
                                                    style={{
                                                        color: currentBed ? "#000" : "#999"
                                                    }}
                                                >
                                                    {bedstyle.name} {currentBed ? "▴" : ""}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setToEditBedStyle(bedstyle)
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
                                        setToEditBedStyle(undefined)
                                        setShowModal(true)
                                    }}
                                >+</button>
                            </div>
                        </React.Fragment>
                    ) : (
                        <button
                            type="button" className={styles.selectBedButton} onClick={(e) => { e.stopPropagation(); setShowBedStyleOptions(true) }}>
                            {bed.name} ▾
                        </button>
                    )
                }
                <div className="row">

                    <div className={styles.amountControlContainer}>
                        <TextInput
                            containerClassName={styles.bedCapacityInputContainer}
                            inputClassName={styles.bedCapacityInput}
                            value={bed.amount}
                            setValue={(e) => { e.stopPropagation(); changeBedAmount(Number(e.target.value), bed) }}
                        />
                    </div>
                    <button
                        type="button"
                        disabled={bed.amount === 1}
                        onClick={() => changeBedAmount(bed.amount - 1, bed)}
                        className={[bed.amount === 1 && "disabled", styles.capacityPlus].join(" ")}>-</button>
                    <button
                        type="button"
                        onClick={() => changeBedAmount(bed.amount + 1, bed)}
                        className={styles.capacityPlus}>+</button>
                </div>
            </div>
        </div>
    )
}

export default BedCard;