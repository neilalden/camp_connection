import Images from "@/common/images";
import CheckBox from "@/components/CheckBox";
import Editor from "@/components/Editor";
import FileUpload from "@/components/FileUpload";
import RadioButton from "@/components/RadioButton";
import TextInput from "@/components/TextInput";
import { POST } from "@/services/api";
import { addActivity, setActivities } from "@/services/redux/slice/retreatcenters";
import { RootState } from "@/services/redux/store";
import { ActivityType, RetreatCenterType } from "@/types";
import { ActivityGenerator, IDGenerator } from "@/utils/functions";
import { weekdays } from "@/utils/variables";
import Image from "next/image";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ActivitiesSetupComponent.module.css"
import ActivityCard from "./ActivityCard";
import ActivityPicker from "./ActivityPicker";
const ActivitiesSetup = () => {
    const dispatch = useDispatch();
    const Activities = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)

    const changeCapacity = (value: string, activityId: ActivityType["id"]) => {
        if (isNaN(Number(value))) return
        if (!Activities) return;
        const newActivities: Array<ActivityType> = [...Activities].map((activity) => {
            if (activity.id === activityId) return { ...activity, capacity: Number(value) }
            return activity
        })
        dispatch(setActivities(newActivities))
    }
    const changeName = (value: string, activityId: ActivityType["id"]) => {
        if (!Activities) return;
        const newActivities: Array<ActivityType> = [...Activities].map((activity) => {
            if (activity.id === activityId) return { ...activity, name: (value) }
            return activity
        })
        dispatch(setActivities(newActivities))
    }
    const updateActivity = (activity: ActivityType) => {
        if (!Activities) return;
        const newActivities: Array<ActivityType> = [...Activities].map((act) => {
            if (act.id === activity.id) return activity
            return act
        })
        dispatch(setActivities(newActivities))
    }
    const changeActivityAvailability = (paramactivity: ActivityType) => {
        if (paramactivity.occupiedBy) return;
        if (!Activities) return;
        const newActivities = [...Activities].map((act) => {
            if (act.id === paramactivity.id) return { ...act, available: !paramactivity.available }
            return act
        })
        dispatch(setActivities(newActivities))
    }
    const changeActivityDescription = (paramactivity: ActivityType) => {
        if (!Activities) return;
        const newActivities = [...Activities].map((act) => {
            if (act.id === paramactivity.id) return { ...act, description: paramactivity.description }
            return act
        })
        dispatch(setActivities(newActivities))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, paramactivity: ActivityType) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            // dispatch(setUserPhoto(imageUrl)); // Dispatch the action to update the Redux state
            const newActivity: ActivityType = {
                ...paramactivity,
                feature: imageUrl
            }
            updateActivity(newActivity)
        }
    };
    return (
        <div className={styles.setUpContainer}>
            <div className={styles.activityCardContainer}>
                {
                    Activities && Activities.map((activity, i) => {
                        return (
                            <ActivityCard
                                key={i}
                                index={i}
                                activity={activity}
                                changeCapacity={changeCapacity}
                                changeName={changeName}
                                updateActivity={updateActivity}
                                changeActivityAvailability={changeActivityAvailability}
                                handleImageChange={handleImageChange}
                                changeActivityDescription={changeActivityDescription}
                            />
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
                            capacity: 50,
                            class: activity,
                            occupiedBy: undefined,
                            description: undefined,
                            photos: [],
                            duration: {
                                time: 30,
                                interval: "minutes"
                            },
                            pricing: [
                                {
                                    per: "Person",
                                    price: 20,
                                }
                            ],
                            dailyAvailable: weekdays.map(wd => ({
                                day: wd,
                                isChecked: true,
                                editMode: false,
                                from: "09:00",
                                to: "17:00"
                            })),
                            seasonsAvailable: ["Winter", "Spring", "Summer", "Fall"],
                            releaseForm: "",
                            refundPolicy: "",
                            contracts: [],
                            learnMoreUrl: "campconnection.net",
                            feature: "https://campconnection.net/wp-content/uploads/2023/02/videoplayback.mp4",
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