import TextInput from "@/components/TextInput";
import { setBedStyles, addBedStyle } from "@/services/redux/slice/retreatcenters";
import { RootState } from "@/services/redux/store";
import { ActivityType, ArgFunction } from "@/types";
import { IDGenerator } from "@/utils/functions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ActivityPicker.module.css"
import Images from "@/common/images";
import Image from "next/image";
import Modal from "./Modal";
import AddBedStyleComponent from "./AddBedStyleComponent";

const ActivityPicker = ({
    activity,
    deleteBed,
    changeBed,
    changeBedAmount,
}: {
    activity: ActivityType,
    deleteBed: ArgFunction,
    changeBed: ArgFunction,
    changeBedAmount: ArgFunction,
}) => {
    const dispatch = useDispatch()
    const activitystyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.activityStyles)
    const [showBedStyleOptions, setShowBedStyleOptions] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [toEditBedStyle, setToEditBedStyle] = useState<ActivityType | undefined>()

    return (
        <div className={styles.bedCard}
            onClick={() => setShowBedStyleOptions(prev => prev ? true : false)}
        >
            {/* {showModal ? <Modal setIsVisible={setShowModal} component={<AddBedStyleComponent BedStyle={toEditBedStyle} setIsVisible={setShowModal} />} /> : null} */}
            <div className="row-between" style={{ margin: "10px 5px", position: "relative" }}
                onClick={() => setShowBedStyleOptions(false)}
            >
                {
                    showBedStyleOptions ? (
                        <React.Fragment>
                            <div className={styles.darkBackground} onClick={() => setShowBedStyleOptions(false)} />

                            <div
                                className={styles.bedStyleOptionsContainer}
                                onClick={() => setShowBedStyleOptions(prev => prev ? false : true)}

                            >
                                {
                                    activitystyles?.map((bedstyle, i) => {
                                        const currentBed = bedstyle.id === activity.id
                                        return (
                                            <div
                                                key={i}
                                                className={styles.bedStyleOption}
                                                style={{ width: "90%" }}
                                                onClick={(e) => {
                                                    changeBed({ ...bedstyle, capacity: activity.capacity });
                                                    setShowBedStyleOptions(prev => prev ? false : true)
                                                }}

                                            >
                                                <button
                                                    type="button"
                                                    className={styles.optionBedButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        changeBed({ ...bedstyle, capacity: activity.capacity })
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
                            <Image src={Images[String(activity.class)]} alt="edit icon" height={30} />
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default ActivityPicker;