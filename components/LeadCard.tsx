import React, { useState } from 'react'
import styles from "./LeadCard.module.css"
import { AppointmentType, ArgFunction } from '@/types'
import TextInput from './TextInput';
import Image from 'next/image';
import Images from '@/common/images';
import { useDispatch } from 'react-redux';
import { setLead } from '@/services/redux/slice/leads';
import Colors from '@/common/colors';
type Props = {
    lead: AppointmentType;
    onDragStart: ArgFunction;
    onClick?: ArgFunction;
    showZipCode?: boolean
}
const LeadCard = (props: Props) => {
    const {
        lead,
        onDragStart,
        onClick,
        showZipCode = false
    } = props
    const dispatch = useDispatch()
    const [error,setError] = useState(false)
    return (

        <div
            draggable={!error}
            className={styles.leadCard}
            style={{
                border: `3px solid ${lead.color}`,
                cursor: !error ? "grab" : "not-allowed"
            }}
            onClick={() =>  onClick ? onClick(lead) : null}
            onDragStart={(e)=>{
                if(lead.checkInDays)onDragStart(e)
                else setError(true)
            }}
        >
            {/* <p className={styles.leadName} style={{ color: lead.color }}>{lead.groupName}</p> */}
            <TextInput
                placeholder='Group name...'
                containerClassName={styles.leadGroupNameContainer}
                inputClassName={styles.leadGroupName}
                inputStyle={{ color: lead.color }}
                value={lead.groupName}
                setValue={(e) => {
                    const value = e.target.value
                    const newLead: AppointmentType = { ...lead, groupName: value }
                    dispatch(setLead(newLead))
                }}
            />
            <TextInput
                placeholder='Name...'
                inputClassName={styles.inputField}
                value={lead.reservee.firstName}
                setValue={(e) => {
                    const value: string = e.target.value
                    const newLead: AppointmentType = {
                        ...lead, reservee: {
                            ...lead.reservee,
                            firstName: value
                        }
                    }
                    dispatch(setLead(newLead))
                }}
            />
            <TextInput
                placeholder='Phone number...'
                inputClassName={styles.inputField}
                value={lead.reservee.contactNumber ?? ""}
                setValue={(e) => {
                    const value = e.target.value
                    const newLead: AppointmentType = {
                        ...lead, reservee: {
                            ...lead.reservee,
                            contactNumber: value
                        }
                    }
                    dispatch(setLead(newLead))
                }}
            />
            <div className={"row-between"}>
                {showZipCode ?
                    <TextInput
                    data-content="hello world"
                        label={<Image alt='location' src={Images.ic_location} height={15} />}
                        value={lead.zipCode ?? 0}
                        containerStyle={{ ...inputContainerStyle, width: "55px" }}
                        containerClassName="tooltip"
                        dataContent={"Zip Code"}
                        inputStyle={{
                            textAlign: "center",
                        }}
                        setValue={(e) => {
                            const value = e.target.value
                            if (isNaN(Number(value))) return;
                            const newLead: AppointmentType = { ...lead, zipCode: Number(value) }
                            dispatch(setLead(newLead))
                        }}
                    /> : null}
                <TextInput
                    label={<Image alt='group' src={Images.ic_group} height={15} />}
                    value={lead.groupSize ?? 0}
                    containerStyle={{...inputContainerStyle, width: "45px" }}
                    containerClassName="tooltip"
                    dataContent={"Group Size"}
                    inputStyle={{
                        textAlign: "center",
                    }}
                    setValue={(e) => {
                        const value = e.target.value
                        if (isNaN(Number(value))) return;
                        const newLead: AppointmentType = { ...lead, groupSize: Number(value) }
                        dispatch(setLead(newLead))
                    }}
                />

                <TextInput
                    label={<Image alt='clock' src={Images.ic_clock} height={15} />}
                    value={lead.checkInDays ?? 0}
                    containerStyle={{ ...inputContainerStyle}}
                    containerClassName="tooltip"
                    dataContent={"Days"}
                    required
                    inputStyle={{
                        textAlign: "center",
                        borderBottomColor: !error? "":Colors.red500,
                        borderBottomWidth: !error? "": 3,
                        color: !error? "":Colors.red500,
                        fontWeight: !error? "normal":900,
                    }}
                    setValue={(e) => {
                        const value = e.target.value
                        if (isNaN(Number(value))) return;
                        const newLead: AppointmentType = { ...lead, checkInDays: Number(value) }
                        dispatch(setLead(newLead))
                        if(Number(value) > 0) setError(false)
                        else setError(true)
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