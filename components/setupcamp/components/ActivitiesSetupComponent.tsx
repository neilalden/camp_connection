import Images from "@/common/images";
import CheckBox from "@/components/CheckBox";
import Editor from "@/components/Editor";
import FileUpload from "@/components/FileUpload";
import RadioButton from "@/components/RadioButton";
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
    const changeActivityClass = (activity: ActivityType) => {
        if (!ACTIVITIES) return;
        const newActivities: Array<ActivityType> = [...ACTIVITIES].map((act) => {
            if (act.id === activity.id) return activity
            return act
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
    const changeActivityDescription = (paramactivity: ActivityType) => {
        if (!ACTIVITIES) return;
        const newActivities = [...ACTIVITIES].map((act) => {
            if (act.id === paramactivity.id) return { ...act, description: paramactivity.description }
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
                            <div key={i} className="row" style={{ width: "100%" }}>
                                <div className={styles.activityCard}>
                                    <div className="row-between" >
                                        <button
                                            type="button"
                                            className={styles.activityDeleteButtom}
                                            onClick={() => {
                                                if (!Array.isArray(ACTIVITIES)) return;
                                                let newPricing: RetreatCenterType["amenities"]["activities"] = [...ACTIVITIES]
                                                newPricing.splice(i, 1);
                                                dispatch(setActivities(newPricing))
                                            }}>X</button>
                                        <div className="row">
                                            <ActivityPicker activity={activity} changeActivityClass={changeActivityClass} changeActivityAmount={() => { }} deleteActivity={() => { }} />
                                            <TextInput
                                                containerClassName={styles.meetingRoomCardNameInputContainer}
                                                inputClassName={styles.meetingRoomCardNameInput}
                                                placeholder={ActivityGenerator()}
                                                value={activity.name}
                                                setValue={e => changeName(e.target.value, activity.id)}
                                            /></div>
                                        <button className={[activity.available ? styles.available : styles.unavailable, "texthover"].join(" ")} onClick={() => changeActivityAvailability(activity)}>
                                            <Image alt="availability" src={activity.available ? Images["ic_check_green"] : Images["ic_close_red"]} height={20} width={20} />
                                            <span >{activity.available ? "available" : "unavailable"}</span>
                                        </button>
                                    </div>
                                    <div className="row-between">
                                        <div className="row" >
                                            <p data-content="How many guests can use this activity at the same time" className={styles.info}>i</p>
                                            <TextInput
                                                // containerClassName={styles.meetingRoomCardCapacityInputContainer}
                                                inputClassName={styles.meetingRoomCardCapacityInput}
                                                labelClassName={styles.capacityLabelClassName}
                                                label="Capacity"
                                                value={activity.capacity}
                                                setValue={(e) => changeCapacity(e.target.value, activity.id)}
                                            />
                                        </div>
                                        <div className="row-evenly mv-auto">
                                            <h6 style={{ marginTop: "20px", marginRight: "5px" }}>Release form ?</h6>
                                            <RadioButton labelTop={<span>yes</span>} name={"release-form" + activity.id} value={false} onChange={() => { }} />
                                            <RadioButton labelTop={<span>no</span>} name={"release-form" + activity.id} value={true} onChange={() => { }} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row-between">
                                        <div className={styles.detailsContainer}>
                                            <h5>Pricing</h5>
                                            <div className="row" >
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Per person</span>} name={"Per person" + activity.id} value={false} onChange={() => { }} />
                                                <TextInput inputStyle={{ fontSize: "12px", padding: "0px" }} containerStyle={{ width: "24px", height: "12px", padding: "0px" }} />
                                            </div>
                                            <div className="row" >
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Per group</span>} name={"Per group" + activity.id} value={false} onChange={() => { }} />
                                                <TextInput inputStyle={{ fontSize: "12px", padding: "0px" }} containerStyle={{ width: "24px", height: "12px", padding: "0px" }} />
                                            </div>

                                            <div className="row" >
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Per hour</span>} name={"Per hour" + activity.id} value={false} onChange={() => { }} />
                                                <TextInput inputStyle={{ fontSize: "12px", padding: "0px" }} containerStyle={{ width: "24px", height: "12px", padding: "0px" }} />
                                            </div>
                                            <div className="row" >
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Per day</span>} name={"Per day" + activity.id} value={false} onChange={() => { }} />
                                                <TextInput inputStyle={{ fontSize: "12px", padding: "0px" }} containerStyle={{ width: "24px", height: "12px", padding: "0px" }} />
                                            </div>
                                        </div>

                                        <div className={styles.detailsContainer}>
                                            <h5>Seasons Avail.</h5>

                                            <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Winter</span>} name={"Winter" + activity.id} value={false} onChange={() => { }} />
                                            <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Spring</span>} name={"Spring" + activity.id} value={false} onChange={() => { }} />
                                            <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Summer</span>} name={"Summer" + activity.id} value={false} onChange={() => { }} />
                                            <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Fall</span>} name={"Fall" + activity.id} value={false} onChange={() => { }} />
                                        </div>
                                        <div className={styles.detailsContainer}>
                                            <h5>Media</h5>
                                            <FileUpload onChange={() => { }} label="Upload img/mp4" />
                                        </div>

                                    </div>
                                    <div style={{ width: "100%", minHeight: "200px" }}>
                                        <h5>Description</h5>
                                        <Editor
                                            data={activity.description}
                                            setData={(data: any) => {
                                                changeActivityDescription({
                                                    ...activity,
                                                    description: data
                                                })
                                            }}
                                        />
                                        {/* <textarea
                                            style={{
                                                width: "80%",
                                                height: "80%",
                                                resize: "none",
                                                padding: "5px"
                                            }}
                                        /> */}
                                    </div>
                                </div>
                                <div className={styles.preview}>
                                    <div className="ck-content" dangerouslySetInnerHTML={{ __html: activity.description }} />
                                </div>
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
                            description: undefined
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