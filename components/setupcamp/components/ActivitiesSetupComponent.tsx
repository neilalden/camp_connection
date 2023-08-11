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
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ActivitiesSetupComponent.module.css"
import ActivityPicker from "./ActivityPicker";
const ActivitiesSetup = () => {
    const dispatch = useDispatch();
    const ACTIVITIES = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
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
    const updateActivity = (activity: ActivityType) => {
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, paramactivity: ActivityType) => {
        console.log(e, paramactivity)
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            // dispatch(setUserPhoto(imageUrl)); // Dispatch the action to update the Redux state
            const newActivity: ActivityType = {
                ...paramactivity,
                feature: imageUrl
            }
            console.log(newActivity)
            updateActivity(newActivity)
        }
    };
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
                                            <ActivityPicker activity={activity} changeActivityClass={updateActivity} changeActivityAmount={() => { }} deleteActivity={() => { }} />
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
                                    <div className="row-between" style={{ margin: "20px 10px 0 10px" }}>
                                        <div className="row" >
                                            <p data-content="How many guests can use this activity at the same time" className={styles.info}>i</p>
                                            <TextInput
                                                inputClassName={styles.meetingRoomCardCapacityInput}
                                                labelClassName={styles.capacityLabelClassName}
                                                label="Capacity"
                                                value={activity.capacity}
                                                setValue={(e) => changeCapacity(e.target.value, activity.id)}
                                            />
                                        </div>
                                        <div className="row-evenly" >
                                            <div className="mh-20px">
                                                <h6 >Release form</h6>
                                                <FileUpload onChange={() => { }} label="Upload img/mp4" />
                                            </div>
                                            <div>
                                                <h6 >Refund Policy</h6>
                                                <FileUpload onChange={() => { }} label="Upload img/mp4" />

                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row-between">
                                        <div className="row" style={{ width: "40%" }}>
                                            <div className={styles.detailsContainer} style={{ width: "100%" }}>
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
                                                <h5 className="no-wrap">Seasons Avail.</h5>

                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Winter</span>} name={"Winter" + activity.id} value={!!activity.seasonsAvailable.find(sa => sa === "Winter")} onChange={() => {
                                                    const found = !!activity.seasonsAvailable.find(s => s === "Winter");
                                                    updateActivity({
                                                        ...activity,
                                                        seasonsAvailable: found ? activity.seasonsAvailable.filter(sa => sa !== "Winter") : [...activity.seasonsAvailable, "Winter"]
                                                    })
                                                }} />
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Spring</span>} name={"Spring" + activity.id} value={!!activity.seasonsAvailable.find(sa => sa === "Spring")} onChange={() => {
                                                    const found = !!activity.seasonsAvailable.find(s => s === "Spring");
                                                    updateActivity({
                                                        ...activity,
                                                        seasonsAvailable: found ? activity.seasonsAvailable.filter(sa => sa !== "Spring") : [...activity.seasonsAvailable, "Spring"]
                                                    })
                                                }} />
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Summer</span>} name={"Summer" + activity.id} value={!!activity.seasonsAvailable.find(sa => sa === "Summer")} onChange={() => {
                                                    const found = !!activity.seasonsAvailable.find(s => s === "Summer");
                                                    updateActivity({
                                                        ...activity,
                                                        seasonsAvailable: found ? activity.seasonsAvailable.filter(sa => sa !== "Summer") : [...activity.seasonsAvailable, "Summer"]
                                                    })
                                                }} />
                                                <CheckBox containerStyle={{ width: "90px" }} label={<span style={{ fontSize: "12px" }}>Fall</span>} name={"Fall" + activity.id} value={!!activity.seasonsAvailable.find(sa => sa === "Fall")} onChange={() => {
                                                    const found = !!activity.seasonsAvailable.find(s => s === "Fall");
                                                    updateActivity({
                                                        ...activity,
                                                        seasonsAvailable: found ? activity.seasonsAvailable.filter(sa => sa !== "Fall") : [...activity.seasonsAvailable, "Fall"]
                                                    })
                                                }} />
                                            </div>
                                        </div>
                                        <div className={styles.detailsContainer} >
                                            <h5>Feature</h5>
                                            {
                                                activity.feature ? (
                                                    <div className={styles.featureLogoContainer}>
                                                        <Image
                                                            className={styles.logo}
                                                            alt={activity.name}
                                                            src={activity.feature}
                                                            height={100}
                                                            width={100}
                                                            style={{ objectFit: "contain" }}
                                                        />
                                                        <div className={styles.overlay} onClick={handleEditClick}></div>
                                                        <p className={styles.editText}>Edit</p>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleImageChange(e, activity)}
                                                            ref={fileInputRef}
                                                            style={{ display: "none" }}
                                                        />
                                                    </div>
                                                ) :
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange(e, activity)}
                                                        ref={fileInputRef}
                                                    />
                                            }
                                        </div>

                                    </div>
                                    <div style={{ width: "100%", height: "100%", minHeight: "100%", marginTop: "40px" }}>
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
                                    </div>
                                </div>
                                <div className={styles.preview}>
                                    {
                                        activity.feature ?
                                            <div className={styles.logoContainer}>
                                                <Image
                                                    className={styles.logo}
                                                    alt={activity.name}
                                                    src={activity.feature}
                                                    height={100}
                                                    width={100}
                                                    style={{ objectFit: "contain" }}
                                                />
                                                <div className={styles.overlay} onClick={handleEditClick}></div>
                                                <p className={styles.editText}>Edit</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(e, activity)}
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                />
                                            </div> : null
                                    }
                                    <div className="ck-content" style={{ padding: "10px 20px" }} dangerouslySetInnerHTML={{ __html: activity.description }} />
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
                            description: undefined,
                            pricing: [
                                {
                                    per: "Head",
                                    price: 20,
                                }
                            ],
                            seasonsAvailable: ["Winter", "Spring", "Summer", "Fall"],
                            releaseForm: "",
                            refundPolicy: ""
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