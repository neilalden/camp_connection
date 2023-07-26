"use client"
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Images from "@/common/images";
import { ArrayRCSD, RetreatCenterType, UsersSampleData } from "@/utils/sampleData";
import { useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import TextInput from "@/components/TextInput";
import { StatesInUSA, StatesWithCitiesAPI, TimeZones } from "@/utils/variables";
import { GET } from "@/services/api";
import { default as statesWithCities } from "@/utils/statesWithCities.json";
import DropDown, { OptionType } from "@/components/DropDown";
import DropDownUsers, { UsersOptionType } from "@/components/DropDownUsers";
import CheckBox from "@/components/CheckBox";
const options = StatesInUSA.map(state => ({ label: state, value: state }))
const Userprofile = () => {
    // const retreatcenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)[0]
    const retreatcenter = ArrayRCSD[0]
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
    const timeZoneOptions: Array<OptionType> = TimeZones.map(tz => ({ label: tz, value: tz }))
    const userOptions: Array<UsersOptionType> = UsersSampleData.map(user => ({ label: `${user.firstName} ${user.lastName} • ${user.userType}`, value: user.id, user: user }))

    return (
        <div className={styles.container}>
            <div className={["card", styles.headerContainer].join(" ")}>
                <Image
                    alt="Compant Logo"
                    src={Images.ic_logo}
                    className={styles.logo}
                    height={150}
                    width={150}
                    style={{ objectFit: "contain" }}
                />
                <div className={styles.campName}>
                    <h3 className={styles.campName}>
                        {retreatcenter.name}
                    </h3>
                    <p className={styles.stateText}>
                        {retreatcenter.state}
                    </p>
                </div>
                <div className={styles.videoIntro}>

                </div>
            </div>
            <div className="row-between" style={{ width: "100%" }}>

                <div className={["card", styles.addressAndContactInfoContainer].join(" ")}>
                    <h4 className={styles.cardTitle}>Address</h4>
                    <form>
                        <DropDown htmlFor="State" options={stateOptions} value={state} setValue={setState} containerClassName={styles.inputStyle} />
                        <DropDown htmlFor="City" options={cityOptions} value={city} setValue={setCity} containerClassName={styles.inputStyle} />
                        <TextInput label="Street" value={street} setValue={setStreet} containerClassName={styles.inputStyle} />
                        <TextInput label="Zipcode" value={zipcode} setValue={setZipcode} containerClassName={styles.inputStyle} />
                    </form>
                </div>
                <div className={["card", styles.availabilityContainer].join(" ")}>
                    <h4 className={styles.cardTitle}>Contact Info</h4>
                    <form>
                        <TextInput label="Phone Number" type="tel" value={phoneNumber} setValue={setPhoneNumber} containerClassName={styles.inputStyle} />
                        <TextInput label="Email" type="email" value={email} setValue={setEmail} containerClassName={styles.inputStyle} />
                        <TextInput label="Website" type="url" value={website} setValue={setWebsite} containerClassName={styles.inputStyle} />
                        <DropDown htmlFor="Time Zone" options={timeZoneOptions} value={timezone} setValue={setTimezone} containerClassName={styles.inputStyle} />
                    </form>
                </div>
                <div className={["card", styles.general].join(" ")}>
                    <h4 className={styles.cardTitle}>General</h4>
                    <form>
                        <DropDownUsers htmlFor="Representative" options={userOptions} value={representative} setValue={setRepresentative} containerClassName={styles.inputStyle} />
                        <CheckBox value={isAceeptingGroups} onChange={() => setIsAcceptingGroups(prev => !prev)} label="Do you accept groups?" containerClassName={styles.inputStyle} />
                        <CheckBox value={isAceeptingRVTent} onChange={() => setIsAcceptingRVTent(prev => !prev)} label="Do you accept RV/Tent Camping?" containerClassName={styles.inputStyle} />
                        <CheckBox value={isRecievingCCLeads} onChange={() => setIsRecievingCCLeads(prev => !prev)} label="Receive Camp Connection Leads?" containerClassName={styles.inputStyle} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Userprofile);