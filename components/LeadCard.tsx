import React, { useState } from 'react'
import styles from "./LeadCard.module.css"
import { AppointmentType, ArgFunction, CamperGroupType } from '@/types'
import TextInput from './TextInput';
import Image from 'next/image';
import Images from '@/common/images';
import { useDispatch } from 'react-redux';
import { updateLead } from '@/services/redux/slice/leads';
import Colors from '@/common/colors';
import { updateCamperGroup } from '@/services/redux/slice/campergroups';
type Props = {
    lead: AppointmentType;
    group?: CamperGroupType;
    onDragStart?: ArgFunction;
    onClick?: ArgFunction;
    showZipCode?: boolean
}
const LeadCard = (props: Props) => {
    const {
        lead,
        group,
        onDragStart = () => { },
        onClick = () => { },
        showZipCode = false
    } = props
    const dispatch = useDispatch()
    const [groupSizeError, setGroupSizeError] = useState(false)
    const [checkInError, setCheckInError] = useState(false)
    if (!group) return <></>
    return (
        <div
            draggable={(!groupSizeError && !checkInError) && !!onDragStart}
            className={styles.leadCard}
            style={{
                border: `3px solid ${group.color}`,
                cursor: (!groupSizeError && !checkInError) ? "grab" : "not-allowed"
            }}
            onClick={() => onClick ? onClick(lead) : null}
            onDragStart={(e) => {
                if (lead.checkInDays && group.groupSize && onDragStart) onDragStart(e)
                else { !lead.checkInDays && setCheckInError(true); !group.groupSize && setGroupSizeError(true) }
            }}
        >
            <span style={{ position: "absolute", top: "-15px", right: "0" }}>{new Date(lead.createdAt).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            <TextInput
                placeholder='Group name...'
                containerClassName={styles.leadGroupNameContainer}
                inputClassName={styles.leadGroupName}
                inputStyle={{ color: group.color }}
                value={group.groupName}
                setValue={(e) => {
                    const value = e.target.value
                    const newGroup: CamperGroupType = { ...group, groupName: value }
                    dispatch(updateCamperGroup(newGroup))
                }}
            />
            <TextInput
                placeholder='Name...'
                inputClassName={styles.inputField}
                value={group.appointeeName}
                setValue={(e) => {
                    const value: string = e.target.value
                    const newGroup: CamperGroupType = {
                        ...group,
                        appointeeName: value
                    }
                    dispatch(updateCamperGroup(newGroup))
                }}
            />
            <TextInput
                placeholder='Phone number...'
                inputClassName={styles.inputField}
                value={group.appointeeContactNumber ?? ""}
                setValue={(e) => {
                    const value = e.target.value
                    const newGroup: CamperGroupType = {
                        ...group,
                        appointeeContactNumber: value
                    }
                    dispatch(updateCamperGroup(newGroup))
                }}
            />
            <div className={"row-between"}>
                {showZipCode ?
                    <TextInput
                        label={<Image alt='location' src={Images.ic_location} height={15} />}
                        value={group.zipCode ?? 0}
                        containerStyle={{ ...inputContainerStyle, width: "55px" }}
                        containerClassName="tooltip"
                        dataContent={"Zip Code"}
                        inputStyle={{
                            textAlign: "center",
                        }}
                        setValue={(e) => {
                            const value = e.target.value
                            if (isNaN(Number(value))) return;
                            const newGroup: CamperGroupType = { ...group, zipCode: Number(value) }
                            dispatch(updateCamperGroup(newGroup))
                        }}
                    /> : null}
                <TextInput
                    label={<Image alt='group' src={Images.ic_group} height={15} />}
                    value={group.groupSize ?? 0}
                    containerStyle={{ ...inputContainerStyle, width: "45px" }}
                    containerClassName="tooltip"
                    dataContent={"Group Size"}
                    required
                    inputStyle={{
                        textAlign: "center",
                        borderBottomColor: !groupSizeError ? "" : Colors.red500,
                        borderBottomWidth: !groupSizeError ? "" : 3,
                        color: !groupSizeError ? "" : Colors.red500,
                        fontWeight: !groupSizeError ? "normal" : 900,
                    }}
                    setValue={(e) => {
                        const value = Number(e.target.value)
                        if (isNaN(value)) return;
                        if (value > 0) setGroupSizeError(false)
                        else setGroupSizeError(true)
                        const newGroup: CamperGroupType = { ...group, groupSize: value }
                        dispatch(updateCamperGroup(newGroup))
                    }}
                />

                <TextInput
                    label={<Image alt='clock' src={Images.ic_clock} height={15} />}
                    value={lead.checkInDays ?? 0}
                    containerStyle={{ ...inputContainerStyle }}
                    containerClassName="tooltip"
                    dataContent={"Nights"}
                    required
                    inputStyle={{
                        textAlign: "center",
                        borderBottomColor: !checkInError ? "" : Colors.red500,
                        borderBottomWidth: !checkInError ? "" : 3,
                        color: !checkInError ? "" : Colors.red500,
                        fontWeight: !checkInError ? "normal" : 900,
                    }}
                    setValue={(e) => {
                        const value = Number(e.target.value)
                        if (isNaN(value)) return;
                        const newLead: AppointmentType = { ...lead, checkInDays: value }
                        dispatch(updateLead(newLead))
                        if (value > 0) setCheckInError(false)
                        else setCheckInError(true)
                    }}
                />

            </div>
        </div>
    )
}
const inputContainerStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
}

export default LeadCard