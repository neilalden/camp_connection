import Colors from '@/common/colors';
import Images from '@/common/images';
import CheckBox from '@/components/CheckBox';
import DropDown from '@/components/DropDown';
import Editor from '@/components/Editor';
import FileUpload from '@/components/FileUpload';
import RadioButton from '@/components/RadioButton';
import TextInput from '@/components/TextInput';
import { POST } from '@/services/api';
import { setActivities } from '@/services/redux/slice/retreatcenters';
import { RootState } from '@/services/redux/store';
import { ActivityType, ArgFunction, RetreatCenterType, ScheduleType, TimeInterval, TimeIntervalClass } from '@/types';
import { ActivityGenerator } from '@/utils/functions';
import { weekdays } from '@/utils/variables';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./ActivityCard.module.css"
import ActivityPicker from './ActivityPicker';
import PhotoCard from './PhotoCard';
type Props = {
    index: number;
    activity: ActivityType
    changeCapacity: ArgFunction
    changeName: ArgFunction
    updateActivity: (activity: ActivityType) => void;
    changeActivityAvailability: ArgFunction

    handleImageChange: ArgFunction
    changeActivityDescription: ArgFunction
}
const ActivityCard = (props: Props) => {
    const {
        index,
        activity,
        changeCapacity,
        changeName,
        updateActivity,
        changeActivityAvailability,

        handleImageChange,
        changeActivityDescription,
    } = props
    const dispatch = useDispatch()
    const Activities = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [openActivity, setOpenActivity] = useState(true)
    const [isOpenAnytime, setIsOpenAnytime] = useState(false)
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div style={{ width: "100%", height: "fit-content" }}>
            <div className={styles.collapsableSection} onClick={(e) => setOpenActivity(prev => !prev)}>
                <div className="row" >
                    <ActivityPicker activity={activity} changeActivityClass={updateActivity} changeActivityAmount={() => { }} deleteActivity={() => { }} />
                    <TextInput
                        placeholder="Activity name..."
                        containerClassName={styles.meetingRoomCardNameInputContainer}
                        inputClassName={styles.meetingRoomCardNameInput}
                        value={activity.name}
                        setValue={(e) => changeName(e.target.value, activity.id)}
                    />
                </div>
                <Image alt="chevron down" src={openActivity ? Images.ic_chevron_up : Images.ic_chevron_down} height={15} />
            </div>
            {
                openActivity ?

                    <div className={styles.activityCard}>
                        <div style={{ width: "70%" }}>
                            <div className="row-between w-100p" style={{ margin: "20px 0 40px 20px", paddingRight: "20px" }}>
                                <button className={[activity.available ? styles.available : styles.unavailable, "texthover"].join(" ")} onClick={() => changeActivityAvailability(activity)}>
                                    <Image alt="availability" src={activity.available ? Images["ic_check_green"] : Images["ic_close_red"]} height={20} width={20} />
                                    <span >{activity.available ? "available" : "unavailable"}</span>
                                </button>
                                <div style={{ marginTop: "5px", }}>
                                    <TextInput
                                        containerStyle={{ display: "flex", flexDirection: "row" }}
                                        inputClassName={styles.meetingRoomCardCapacityInput}
                                        labelClassName={styles.capacityLabelClassName}
                                        label={<div style={{ width: "100%", position: "relative" }} className="row tooltip" data-content="The amount of people this activity accommodate at the same time">
                                            <Image alt="info" src={Images["ic_info"]} height={10} width={10}
                                                style={{
                                                    position: "absolute",
                                                    top: "0px",
                                                    left: "-10px",
                                                }} />
                                            <p style={{ marginTop: "7px" }}>Capacity :</p></div>}
                                        value={activity.capacity}
                                        setValue={(e) => changeCapacity(e.target.value, activity.id)}
                                    />
                                    <div className="row">
                                        <label className={styles.capacityLabelClassName} style={{ marginTop: "7px" }}>Duration :</label>
                                        <TextInput
                                            containerStyle={{ display: "flex", flexDirection: "row" }}
                                            inputClassName={styles.meetingRoomCardCapacityInput}
                                            value={activity.duration.time}
                                            setValue={(e) => {
                                                const newActivity: ActivityType = {
                                                    ...activity,
                                                    duration: {
                                                        ...activity.duration,
                                                        time: Number(e.target.value)
                                                    }
                                                }
                                                updateActivity(newActivity)
                                            }}
                                        />
                                        <DropDown
                                            noSelect={true}
                                            inputStyle={{ border: "1px solid transparent" }}
                                            containerStyle={{ display: "flex", flexDirection: "row" }}
                                            value={activity.duration.interval}
                                            setValue={(value: TimeIntervalClass) => {
                                                const newActivity: ActivityType = {
                                                    ...activity,
                                                    duration: {
                                                        ...activity.duration,
                                                        interval: value
                                                    }
                                                }
                                                updateActivity(newActivity)
                                            }}
                                            // @ts-ignore
                                            options={Object.keys(TimeInterval).map((key: any) => ({ label: TimeInterval[key], value: TimeInterval[key] }))}
                                        />
                                    </div>
                                </div>
                                <div className={styles.pricingContainer} >
                                    <h5 style={{ marginRight: "95px" }}>Pricing</h5>
                                    <div>
                                        {
                                            activity.pricing.map((pricing, i) => (
                                                <div className="row-reverse" key={i}>
                                                    <TextInput
                                                        value={"$" + pricing.price}
                                                        containerStyle={{ width: "50px", marginTop: "2.5px" }}
                                                        inputStyle={{
                                                            width: "50px",
                                                            border: `1px solid ${Colors.cascade200}`,
                                                            textAlign: "center"
                                                        }}
                                                        setValue={(e) => {
                                                            const newPricing = [...activity.pricing]
                                                            newPricing.splice(i, 1, { per: pricing.per, price: Number(e.target.value.replaceAll("$", "")) })
                                                            const newActivity: ActivityType = {
                                                                ...activity,
                                                                pricing: newPricing
                                                            }
                                                            updateActivity(newActivity)
                                                        }}
                                                    />
                                                    <TextInput
                                                        containerStyle={{ width: "25%" }}
                                                        inputClassName={styles.pricingNameInput}
                                                        value={pricing.per}
                                                        setValue={(e) => {
                                                            const newPricing = [...activity.pricing]
                                                            newPricing.splice(i, 1, { per: e.target.value, price: pricing.price })
                                                            const newActivity: ActivityType = {
                                                                ...activity,
                                                                pricing: newPricing
                                                            }
                                                            updateActivity(newActivity)
                                                        }}
                                                    />
                                                    <label className={styles.capacityLabelClassName} style={{ marginTop: "7px" }}>Per</label>
                                                    {activity.pricing.length > 1 ?
                                                        <button
                                                            type="button"
                                                            className={styles.pricingDeleteButton}
                                                            onClick={() => {
                                                                const newPricing = [...activity.pricing]
                                                                newPricing.splice(i, 1)
                                                                const newActivity: ActivityType = {
                                                                    ...activity,
                                                                    pricing: newPricing
                                                                }
                                                                updateActivity(newActivity)
                                                            }}>x</button>
                                                        : null}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.addMeetingRoomButton}
                                        onClick={(e) => {
                                            const newActivity: ActivityType = {
                                                ...activity,
                                                pricing: [...activity.pricing, { per: "Group", price: 80 }]
                                            }
                                            updateActivity(newActivity)
                                        }}
                                    >+</button>
                                </div>

                            </div>
                            <br />
                            <div className="row-between">
                                <div className={styles.seasonAvailContainer}>
                                    <h5 className="no-wrap">Seasons</h5>
                                    <CheckBox containerStyle={{ width: "90px", marginTop: "10px" }} label={<span style={{ fontSize: "12px" }}>Winter</span>} name={"Winter" + activity.id} value={!!activity.seasonsAvailable.find(sa => sa === "Winter")} onChange={() => {
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

                                <div>
                                    <h5 className="no-wrap">Availability</h5>
                                    <SchedulePicker />
                                </div>

                                <div style={{ width: "33%", maxHeight: "250px" }}>
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
                                                    style={{ objectFit: "cover" }}
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

                                            <FileUpload onChange={async (e) => {
                                                handleImageChange(e, activity)
                                            }} label="Upload Feature"
                                            />
                                    }
                                </div>

                            </div>
                            <div style={{ width: "100%", margin: "40px 0 20px 20px", paddingRight: "20px" }}>
                                <h5>Images</h5>
                                <div className="row">
                                    {
                                        activity.photos.map((photo, i) => {
                                            return <PhotoCard
                                                containerStyle={{ width: "180px", height: "100px", margin: "10px 10px 0 0" }}
                                                photoStyle={{ width: "180px", height: "100px", }}
                                                key={i}
                                                src={photo}
                                                alt={"carousel" + i}
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        const selectedFile = e.target.files[0];
                                                        const imageUrl = URL.createObjectURL(selectedFile);
                                                        const newPhotos = activity.photos.map((photo, ix) => ix === i ? imageUrl : photo)
                                                        const newActivity: ActivityType = {
                                                            ...activity,
                                                            photos: newPhotos
                                                        }
                                                        updateActivity(newActivity)
                                                    }
                                                }}
                                            />
                                        })
                                    }

                                    {activity.photos.length <= 4 ?
                                        <button
                                            type="button"
                                            className={styles.addPhoto}
                                            onClick={(e) => {
                                                const newActivity: ActivityType = {
                                                    ...activity,
                                                    photos: [...activity.photos, Images["ic_logo"]]
                                                }
                                                updateActivity(newActivity)
                                            }}
                                        >+</button>
                                        : null}
                                </div>
                            </div>
                            <div style={{ width: "100%", margin: "40px 0 20px 20px", paddingRight: "20px" }}>
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

                            <button
                                type="button"
                                className={styles.activityDeleteButtom}
                                onClick={() => {
                                    if (!Array.isArray(Activities)) return;
                                    let newPricing: RetreatCenterType["amenities"]["activities"] = [...Activities]
                                    newPricing.splice(index, 1);
                                    dispatch(setActivities(newPricing))
                                }}>Delete</button>
                        </div>
                        <div style={{ width: "30%", margin: "20px" }}>
                            <div className={styles.preview}>
                                <div style={{ position: "relative" }}>
                                    <Image
                                        className={styles.previewFeature}
                                        alt={activity.name}
                                        src={activity.feature ?? Images["ic_logo"]}
                                        height={100}
                                        width={100}
                                    />
                                    <div
                                        className={styles.previewHeader}
                                        style={{ width: "100%", height: "60px", position: "absolute", bottom: "1px" }}>
                                        <h2 style={{ fontWeight: 800, margin: "25px 0 0 10px", color: Colors.blue500 }}>{activity.name}</h2>
                                        <div style={{ background: Colors.chalky500, padding: "0 10px", color: "white" }} className="col-center">
                                            <h4>${activity.pricing[0].price}</h4>
                                            <span>Per {activity.pricing[0].per}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        activity.photos.map((photo, i) => {
                                            return <Image key={i} src={photo} alt={"carousel item" + i} height={100} width={150} style={{ objectFit: "cover", width: `${100 / activity.photos.length}%` }} />
                                        })
                                    }
                                </div>
                                <div className="ck-content" style={{ padding: "10px 20px" }} dangerouslySetInnerHTML={{ __html: activity.description }} />
                            </div>

                            <div className="row-evenly mh-20px" >
                                <div className="mh-20px">
                                    <h6 >Release form</h6>
                                    <FileUpload onChange={async (e) => {
                                        // const x = await POST("https://atsdevs.org/campconnection/public/api/upload", { fileName: e.target.name })
                                    }} label="Upload form" />
                                </div>
                                <div>
                                    <h6 >Refund Policy</h6>
                                    <FileUpload onChange={(e) => { }} label="Upload policy" />

                                </div>
                            </div>
                        </div>
                    </div> :
                    null
            }

        </div>
    )
}

export default ActivityCard

const SchedulePicker = ({ }: {}) => {
    const schedule: Array<ScheduleType> = weekdays.map(wd => ({
        label: wd,
        value: true,
        editMode: false,
        from: "09:00 AM",
        to: "05:00 PM"
    }));
    const [isOpenAnytime, setIsOpenAnytime] = useState(false);
    const [weekSchedule, setWeekSchedule] = useState<Array<ScheduleType>>(schedule)
    const applyToAll = (sched: ScheduleType) => {
        const newSched = [...weekSchedule].map((day => {
            return {
                ...day,
                from: sched.from,
                to: sched.to,
                editMode: false
            }
        }))
        setWeekSchedule(newSched)
    }
    const onChange = ({ label, value }: { label: string, value: boolean }) => {
        setWeekSchedule(prev => {
            return prev.map((val) => {
                if (val.label === label) return { ...val, value: !val.value }
                return val
            })
        })
    }
    const toggleEdit = (sched: ScheduleType) => {
        setWeekSchedule(prev => {
            return prev.map((val) => {
                if (val.label === sched.label) return { ...val, editMode: !val.editMode }
                return val
            })
        })
    }
    const setHour = (value: string, property: string, label: string) => {
        const newSched = [...weekSchedule].map((day => {
            if (day.label === label) {
                return {
                    ...day,
                    [property]: toStandardTime(value)
                }
            }
            return day
        }))
        setWeekSchedule(newSched)
    }
    const toStandardTime = (time: string) => {
        let newTime = time.split(':');

        let hours = Number(newTime[0]);
        let minutes = Number(newTime[1]);
        let timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        timeValue += (hours >= 12) ? " PM" : " AM";
        return (timeValue)

    }

    return (
        <div className={styles.scheduleCard}>
            <form className={styles.scheduleForm}>
                <RadioButton
                    name={`isOpenAnytime---`}
                    label="Open anytime"
                    value={isOpenAnytime}
                    onChange={() => setIsOpenAnytime(true)}
                    containerClassName={styles.inputStyle} />
                <RadioButton
                    name={`!isOpenAnytime---`}
                    label="Specific Hours"
                    value={!isOpenAnytime}
                    onChange={() => setIsOpenAnytime(false)}
                    containerClassName={styles.inputStyle} />
                <br />
                {!isOpenAnytime ?
                    <div className={styles.scheduleCheckboxContainer}>
                        {
                            weekSchedule.map((sched, i) => {
                                if (sched.value) {
                                    return (
                                        <div key={i} className="row-between">
                                            <CheckBox
                                                label={sched.label}
                                                value={sched.value}
                                                name={`${sched.label}`}
                                                onChange={() => onChange(sched)}
                                                containerStyle={{ width: "65px", alignSelf: "center" }}
                                            />
                                            {
                                                sched.editMode ?
                                                    (
                                                        <div className={styles.schedContainer}>
                                                            <div className={["row", styles.timeInputContainer].join(" ")}>
                                                                <input type={"time"} onChange={e => setHour(e.target.value, "from", sched.label)} className={styles.timeInput} />
                                                                <h4 className={styles.timeInputTo}>to</h4>
                                                                <input type={"time"} onChange={e => setHour(e.target.value, "to", sched.label)} className={styles.timeInput} />

                                                            </div>
                                                            <button type="button" className={styles.buttonApplyToAll} onClick={() => applyToAll(sched)}>Apply to all selected days?</button>
                                                        </div>
                                                    )
                                                    :
                                                    (

                                                        <p className={styles.scheduleString}>
                                                            {`${sched.from} - ${sched.to}`}
                                                        </p>
                                                    )
                                            }
                                            <button type="button" className={styles.buttonSpan} onClick={() => toggleEdit(sched)}>{sched.editMode ? "done" : "edit"}</button>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={i} className="row">
                                        <CheckBox
                                            label={sched.label}
                                            value={sched.value}
                                            name={`${sched.label}`}
                                            onChange={() => onChange(sched)}
                                            containerStyle={{ width: "65px" }} />
                                        <span className={styles.spanClosed}>Closed</span>
                                    </div>
                                )

                            })
                        }
                    </div>
                    : null}
            </form>
        </div>
    )
}