import Images from "@/common/images"
import { RootState } from "@/services/redux/store"
import { ActivityType, ArgFunction, Activity } from "@/types"
import Image from "next/image"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./ActivityPicker.module.css"

const ActivityPicker = ({
    activity,
    deleteActivity,
    changeActivityClass,
    changeActivityAmount,
}: {
    activity: ActivityType,
    deleteActivity: ArgFunction,
    changeActivityClass: ArgFunction,
    changeActivityAmount: ArgFunction,
}) => {
    const dispatch = useDispatch()
    const activitystyles = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.activityStyles)
    const [showActivityStyleOptions, setShowActivityStyleOptions] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [toEditActivityStyle, setToEditActivityStyle] = useState<ActivityType | undefined>()
    return (
        <div className={styles.activityCard} onClick={(e) => { e.stopPropagation(); setShowActivityStyleOptions(prev => !prev) }}>
            {showActivityStyleOptions ? <div className={styles.darkBackground} onClick={(e) => { e.stopPropagation(); setShowActivityStyleOptions(false); }} /> : null}
            {
                showActivityStyleOptions ? (
                    <div style={{ position: "relative" }} onClick={() => setShowActivityStyleOptions(false)}>
                        <div
                            className={styles.activityStyleOptionsContainer}
                            onClick={() => setShowActivityStyleOptions(prev => prev ? false : true)}

                        >
                            {
                                Object.keys(Activity)?.map((activitystyle, i) => {
                                    const currentActivity = activitystyle === activity.class
                                    return (
                                        <div
                                            key={i}
                                            className={styles.activityStyleOption}
                                            style={{ width: "90%" }}
                                            onClick={(e) => {
                                                changeActivityClass({ ...activity, class: activitystyle, name: activitystyle });
                                                setShowActivityStyleOptions(false)
                                            }}

                                        >
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    changeActivityClass({ ...activity, class: activitystyle, name: activitystyle });
                                                    setShowModal(true)
                                                    setShowActivityStyleOptions(false)
                                                }}
                                                style={{
                                                    marginTop: "5px",
                                                    marginLeft: activitystyle === "Custom" ? "5px" : 0
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                <Image src={Images[activitystyle] ?? Images["ic_logo"]} alt="Activity icon" height={activitystyle === "Custom" ? 20 : 30} width={activitystyle === "Custom" ? 20 : 30} onError={e => console.error(e)} />
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.optionActivityButton}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    changeActivityClass({ ...activity, class: activitystyle, name: activitystyle });
                                                    setShowActivityStyleOptions(false)
                                                }}
                                                style={{
                                                    color: currentActivity ? "#000" : "#999",
                                                    marginLeft: activitystyle === "Custom" ? "5px" : 0
                                                }}
                                            >
                                                {activitystyle} {currentActivity ? "▴" : ""}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    // @ts-ignore
                    <Image src={Images[String(activity.class)] ?? Images["ic_logo"]} alt="Activity icon" height={30} width={30} onError={e => console.error(e)} />
                )
            }
        </div>
    )
}

export default ActivityPicker;