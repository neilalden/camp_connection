import React from 'react'
import styles from "./LeadCard.module.css"
import { AppointmentType, ArgFunction } from '@/types'
import TextInput from './TextInput';
import Image from 'next/image';
import Images from '@/common/images';
import { useDispatch } from 'react-redux';
import { setLead } from '@/services/redux/slice/leads';
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
    return (

        <div
            draggable={!!lead.checkInDays}
            className={styles.leadCard}
            style={{
                border: `3px solid ${lead.color}`,
                cursor: !!lead.checkInDays ? "grab" : "pointer"
            }}
            onClick={() => onClick ? onClick(lead) : null}
            onDragStart={lead.checkInDays ? onDragStart : () => console.error("Enter check in days")}
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
            <div className="row-between">
                {showZipCode ?
                    <TextInput
                        label={<Image alt='location' src={Images.ic_location} height={15} />}
                        value={lead.zipCode ?? 0}
                        containerStyle={{ ...inputContainerStyle, width: "55px" }}
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
                    containerStyle={inputContainerStyle}
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
                    containerStyle={{ ...inputContainerStyle, width: "30px" }}
                    inputStyle={{
                        textAlign: "center",
                    }}
                    setValue={(e) => {
                        const value = e.target.value
                        if (isNaN(Number(value))) return;
                        const newLead: AppointmentType = { ...lead, checkInDays: Number(value) }
                        dispatch(setLead(newLead))
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