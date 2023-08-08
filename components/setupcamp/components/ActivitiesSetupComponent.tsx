import Images from "@/common/images";
import TextInput from "@/components/TextInput";
import { addActivity, setActivities } from "@/services/redux/slice/retreatcenters";
import { RootState } from "@/services/redux/store";
import { ActivityType, RetreatCenterType } from "@/types";
import { ActivityGenerator, IDGenerator } from "@/utils/functions";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ActivitiesSetupComponent.module.css"
import ActivityPicker from "./ActivityPicker";
const ActivitiesSetup = () => {
    const dispatch = useDispatch();
    const ACTIVITIES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)
    const changeCapacity = (value: string, activityId: ActivityType["id"]) => {
        if (isNaN(Number(value))) return
        if (!ACTIVITIES) return;
        const newActivities: Array<ActivityType> = [...ACTIVITIES].map((activity) => {
            if (activity.id === activityId) return { ...activity, capacity: Number(value) }
            return activity
        })
        dispatch(setActivities(newActivities))
    }
    const changeName = (value: string, activityId: ActivityType["id"]) => {
        if (!ACTIVITIES) return;
        const newActivities: Array<ActivityType> = [...ACTIVITIES].map((activity) => {
            if (activity.id === activityId) return { ...activity, name: (value) }
            return activity
        })
        dispatch(setActivities(newActivities))
    }
    const changeActivityAvailability = (paramactivity: ActivityType) => {
        if (paramactivity.occupiedBy) return;
        if (!ACTIVITIES) return;
        const newActivities = [...ACTIVITIES].map((act) => {
            if (act.id === paramactivity.id) return { ...act, available: !paramactivity.available }
            return act
        })
        dispatch(setActivities(newActivities))
    }
    return (
        <div className={styles.setUpContainer}>
            <div className={styles.activityCardContainer}>
                {
                    ACTIVITIES && ACTIVITIES.map((activity, i) => {
                        // return (
                        //     <div key={i} className={styles.activityCard}>
                        //         <button
                        //             type="button"
                        //             className={styles.activityDeleteButtom}
                        //             onClick={() => {
                        //                 if (!Array.isArray(ACTIVITIES)) return;
                        //                 let newPricing: RetreatCenterType["amenities"]["activities"] = [...ACTIVITIES]
                        //                 newPricing.splice(i, 1);
                        //                 dispatch(setActivities(newPricing))
                        //             }}>X</button>

                        //         <TextInput
                        //             // inputClassName={styles.inputInsideBox}
                        //             // containerClassName={styles.buildingNameInputContainer}
                        //             containerClassName={styles.meetingRoomCardNameInputContainer}
                        //             inputClassName={styles.meetingRoomCardNameInput}
                        //             placeholder={ActivityGenerator()}
                        //             value={activity.name}
                        //             setValue={e => changeName(e.target.value, activity.id)}
                        //         />
                        //         <TextInput
                        //             containerClassName={styles.meetingRoomCardCapacityInputContainer}
                        //             inputClassName={styles.meetingRoomCardCapacityInput}
                        //             labelClassName={styles.capacityLabelClassName}
                        //             label="Capacity"
                        //             value={activity.capacity}
                        //             setValue={(e) => changeCapacity(e.target.value, activity.id)}
                        //         />
                        //         <button className={[activity.available ? styles.available : styles.unavailable, "texthover"].join(" ")} onClick={() => changeActivityAvailability(activity)}>
                        //             <Image alt="availability" src={activity.available ? Images["ic_check_green"] : Images["ic_close_red"]} height={20} width={20} />
                        //             <span >{activity.available ? "available" : "unavailable"}</span>
                        //         </button>
                        //     </div>
                        // )
                        return (
                            <div key={i} className={styles.activityCard}>
                                {/* <button
                                    type="button"
                                    className={styles.activityDeleteButtom}
                                    onClick={() => {
                                        if (!Array.isArray(ACTIVITIES)) return;
                                        let newPricing: RetreatCenterType["amenities"]["activities"] = [...ACTIVITIES]
                                        newPricing.splice(i, 1);
                                        dispatch(setActivities(newPricing))
                                    }}>X</button> */}
                                <ActivityPicker activity={activity} changeBed={() => { }} changeBedAmount={() => { }} deleteBed={() => { }} />
                                <TextInput
                                    // inputClassName={styles.inputInsideBox}
                                    // containerClassName={styles.buildingNameInputContainer}
                                    containerClassName={styles.meetingRoomCardNameInputContainer}
                                    inputClassName={styles.meetingRoomCardNameInput}
                                    placeholder={ActivityGenerator()}
                                    value={activity.name}
                                    setValue={e => changeName(e.target.value, activity.id)}
                                />
                                <TextInput
                                    containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                    inputClassName={styles.meetingRoomCardCapacityInput}
                                    labelClassName={styles.capacityLabelClassName}
                                    label="Capacity"
                                    value={activity.capacity}
                                    setValue={(e) => changeCapacity(e.target.value, activity.id)}
                                />
                                <button className={[activity.available ? styles.available : styles.unavailable, "texthover"].join(" ")} onClick={() => changeActivityAvailability(activity)}>
                                    <Image alt="availability" src={activity.available ? Images["ic_check_green"] : Images["ic_close_red"]} height={20} width={20} />
                                    <span >{activity.available ? "available" : "unavailable"}</span>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <button
                className={styles.addActivitiesButton}
                onClick={
                    () => {
                        const activity = ActivityGenerator()
                        dispatch(addActivity({
                            id: IDGenerator(),
                            name: activity,
                            available: true,
                            capacity: 10,
                            class: activity,
                            occupiedBy: undefined,
                        }))
                    }
                }
            >
                +
            </button>
        </div>
    )
}

export default ActivitiesSetup;