"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Images from "@/common/images";
import { ArrayRCSD, UsersSampleData } from "@/utils/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import TextInput from "@/components/TextInput";
import { StatesInUSA, StatesWithCitiesAPI, TimeZones, weekdays } from "@/utils/variables";
import { GET } from "@/services/api";
import { default as statesWithCities } from "@/utils/statesWithCities.json";
import DropDown, { OptionType } from "@/components/DropDown";
import DropDownUsers, { UsersOptionType } from "@/components/DropDownUsers";
import CheckBox from "@/components/CheckBox";
import FileUpload from "@/components/FileUpload";
import FileButton from "@/components/FileButton";
import RadioButton from "@/components/RadioButton";
import { usaStatesFull } from 'typed-usa-states';
import ZipcodeToTimezone from "zipcode-to-timezone"
import { ScheduleType } from "@/types";
import { sortArrayOfObjects } from "@/utils/functions";
import Divider from "@/components/Divider";
import { setRetreatCenterName, setRetreatCenterPhoto } from "@/services/redux/slice/retreatcenter";
import Colors from "@/common/colors";
const options = StatesInUSA.map(state => ({ label: state, value: state }))
const Userprofile = () => {
    const dispatch = useDispatch()
    const retreatcenter = useSelector((state: RootState) => state.RetreatCenter.retreatCenter)
    const [retreatCenterName, setRetreatCenterNameUseState] = useState<string | undefined>(undefined)
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [timezone, setTimezone] = useState("")
    const [representative, setRepresentative] = useState<UsersOptionType>()
    const [isAceeptingGroups, setIsAcceptingGroups] = useState<boolean>(false)
    const [isAceeptingRVTent, setIsAcceptingRVTent] = useState<boolean>(false)
    const [isRecievingCCLeads, setIsRecievingCCLeads] = useState<boolean>(false)
    const [stateOptions] = useState<Array<OptionType>>(Object.keys(statesWithCities).map(s => ({ label: s, value: s })))
    // @ts-ignore
    const cityOptions: Array<OptionType> = Array.isArray(statesWithCities[state]) ? statesWithCities[state].map(c => ({ label: c, value: c })) : []
    // const timeZoneOptions: Array<OptionType> = TimeZones.map(tz => ({ label: tz, value: tz }))
    const userOptions: Array<UsersOptionType> = UsersSampleData.map(user => ({ label: `${user.firstName} ${user.lastName} • ${user.userType}`, value: user.id, user: user }))

    useEffect(() => {
        if (!zipcode) {
            setState("")
            setCity("")
            setTimezone("")
            return
        }
        setTimezone(String(ZipcodeToTimezone.lookup(zipcode)))
        const stateFull = usaStatesFull.find((state) => state.zipCodes && state.zipCodes.some(zcItem => zcItem.some(zc => String(zc) === zipcode)))
        if (!stateFull) return;
        setState(stateFull.name)
    }, [zipcode])
    useEffect(() => {
        if (retreatCenterName === undefined) return
        dispatch(setRetreatCenterName(retreatCenterName))
    }, [retreatCenterName])

    const fileInputRef = useRef<HTMLInputElement>(null);
    const campPhoto = useSelector(
        (state: RootState) => state.RetreatCenter.retreatCenter?.photo
    );
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            dispatch(setRetreatCenterPhoto(imageUrl));
        }
    };
    return (
        <div className={styles.container}>
            <div className={["card", styles.headerContainer].join(" ")}>
                <div className={styles.logoContainer}>
                    <Image
                        src={campPhoto ? campPhoto : Images.ic_logo}
                        alt="Compant Logo"
                        className={styles.logo}
                        height={150}
                        width={150}
                        style={{ objectFit: "contain" }}
                    />
                    <div className={styles.overlay} onClick={handleEditClick}></div>
                    <p className={styles.editText}>Edit</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                    />
                </div>
                <div className={styles.campName}>
                    <TextInput placeholder="Camp name..." value={String(retreatcenter?.name)} setValue={(e) => setRetreatCenterNameUseState(e.target.value)} containerClassName={styles.campNameInputStyle} />
                    <p className={styles.stateText}>
                        {state}
                    </p>
                </div>
                <div className={styles.videoIntro}>

                </div>
            </div>
            <div className="row-between" style={{ width: "100%" }}>

                <div className={["card", styles.addressAndContactInfoContainer].join(" ")}>
                    <h4 className={styles.cardTitle}>Address</h4>
                    <form>
                        <TextInput label="Zipcode" value={zipcode} setValue={(e) => setZipcode(e.target.value)} containerClassName={styles.inputStyle} />
                        <TextInput label="State" value={state} setValue={(e) => setState(e.target.value)} containerClassName={styles.inputStyle} disabled />
                        <TextInput label="City" value={city} setValue={(e) => setCity(e.target.value)} containerClassName={styles.inputStyle} />
                        <TextInput label="Street" value={street} setValue={(e) => setStreet(e.target.value)} containerClassName={styles.inputStyle} />
                    </form>
                </div>
                <div className={["card", styles.availabilityContainer].join(" ")}>
                    <h4 className={styles.cardTitle}>Contact Info</h4>
                    <form>
                        <TextInput label="Phone Number" type="tel" value={phoneNumber} setValue={(e) => setPhoneNumber(e.target.value)} containerClassName={styles.inputStyle} />
                        <TextInput label="Email" type="email" value={email} setValue={(e) => setEmail(e.target.value)} containerClassName={styles.inputStyle} />
                        <TextInput label="Website" type="url" value={website} setValue={(e) => setWebsite(e.target.value)} containerClassName={styles.inputStyle} />
                        <TextInput label="Timezone" value={timezone} setValue={(e) => setTimezone(e.target.value)} containerClassName={styles.inputStyle} disabled />
                        {/* <DropDown htmlFor="Time Zone" options={timeZoneOptions} value={timezone} setValue={setTimezone} containerClassName={styles.inputStyle} /> */}
                    </form>
                </div>
                <div className={["card", styles.general].join(" ")}>
                    <h4 className={styles.cardTitle}>General</h4>
                    <form>
                        <DropDownUsers htmlFor="Representative" options={userOptions} value={representative} setValue={setRepresentative} containerClassName={styles.inputStyle} />
                        <CheckBox value={isAceeptingGroups} onChange={() => setIsAcceptingGroups(prev => !prev)} label="Do you accept groups?" containerClassName={styles.inputStyle} />
                        <CheckBox value={isAceeptingRVTent} onChange={() => setIsAcceptingRVTent(prev => !prev)} label="Do you accept RV/Tent Camping?" containerClassName={styles.inputStyle} />
                        <CheckBox value={isRecievingCCLeads} onChange={() => setIsRecievingCCLeads(prev => !prev)} label="Receive Camp Connection Leads?" containerClassName={styles.inputStyle} />
                        <span className="mini-link">Learn more</span>
                        {/* <div className={["row-around", styles.inputStyle].join(" ")}>
                            <FileButton text="Contract for RV" containerClassName={styles.inputStyle} />
                            <FileButton text="Contract for tent" containerClassName={styles.inputStyle} />
                        </div> */}
                    </form>
                </div>
            </div>

            <div className={["card", styles.scheduleContainer].join(" ")}>
                <h4 className={styles.cardTitle}>Office Schedule</h4>
                <div className="row-between">
                    <SchedulePicker season={"Winter"} />
                    <SchedulePicker season={"Spring"} />
                    <SchedulePicker season={"Summer"} />
                    <SchedulePicker season={"Fall"} />
                </div>
            </div>
            <Divider className={styles.bottomSpace} />
        </div>
    );
};
const SchedulePicker = ({ season = "all" }: { season?: string }) => {
    const schedule: Array<ScheduleType> = weekdays.map(wd => ({
        label: wd,
        value: false,
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
        timeValue += (hours >= 12) ? " P.M." : " A.M.";
        return (timeValue)

    }

    return (
        <div className={styles.scheduleCard}>
            <h3 className={styles.scheduleCardTitle}>{season}</h3>
            <form className={styles.scheduleForm}>
                <RadioButton
                    name={`isOpenAnytime---${season}`}
                    label="Open anytime"
                    value={isOpenAnytime}
                    onChange={() => setIsOpenAnytime(true)}
                    containerClassName={styles.inputStyle} />
                <RadioButton
                    name={`!isOpenAnytime---${season}`}
                    label="Specific Hours"
                    value={!isOpenAnytime}
                    onChange={() => setIsOpenAnytime(false)}
                    containerClassName={styles.inputStyle} />
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
                                                htmlFor={`${season}---${sched.label}`}
                                                onChange={() => onChange(sched)}
                                                containerStyle={{ width: "65px", alignSelf: "center" }}
                                            />
                                            {
                                                sched.editMode ?
                                                    (
                                                        <div className={styles.schedContainer}>
                                                            <div className={["row", styles.timeInputContainer].join(" ")}>
                                                                {/* <DropDown options={Array(12).fill(0).map(i => i + 1)} value={String(sched.from.hour)} setValue={setHour} /> */}
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
                                            htmlFor={`${season}---${sched.label}`}
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

export default (Userprofile);