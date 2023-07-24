import React from 'react'
import styles from "./LeadCard.module.css"
import { AppointmentType, ArgFunction } from '@/types'
type Props = {
    lead: AppointmentType;
    onDragStart: ArgFunction;
    onClick: ArgFunction;
}
const LeadCard = (props: Props) => {
    const {
        lead,
        onDragStart,
        onClick,
    } = props
    return (
        <div
            draggable
            className={styles.leadCard}
            style={{ border: `3px solid ${lead.color}` }}
            onClick={onClick}
            onDragStart={(e) => onDragStart({ event: e, data: lead })}>
            <p className={styles.leadName} style={{ color: lead.color }}>{lead.groupName}</p>
            <p>{lead.reservedBy.firstName}</p>
            <p>{lead.reservedBy.contactNumber}</p>
            <p>{lead.zipCode}</p>
        </div>
    )
}

export default LeadCard