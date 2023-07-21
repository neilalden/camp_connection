"use client"
import { addLead } from "@/services/redux/slice/leads";
import { RootState } from "@/services/redux/store";
import { AppointmentType, ArgFunction } from "@/types";
import { generateColor } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeadsColumn.module.css"

type Props = {
    customOnDrag?: ArgFunction
}

const LeadsColumn = ({ customOnDrag }: Props) => {
    const dispatch = useDispatch();
    const leads = useSelector((state: RootState) => state.Leads.leads)
    const onDrag = (e: React.DragEvent, data: AppointmentType) => {
        const widgetType = JSON.stringify(data)
        e.dataTransfer.setData("widgetType", widgetType)
    }

    const openAddLead = () => {
        const name = prompt("Enter Name", "John Doe");
        if (!name) return;
        const checkInDays = prompt("How Many Days Are Going To Stay?", "5");
        if (!checkInDays || isNaN(Number(checkInDays))) return alert("Number Of Days Stay Is Invalid")
        const zipCode = prompt("What's Your Area Code?", "1234");
        if (!zipCode || isNaN(Number(zipCode))) return alert("Area Code Is Invalid");
        const groupSize = prompt("How Many People Are Going?", "20");
        if (!groupSize || isNaN(Number(groupSize))) return alert("Number Of Group Size Is Invalid");
        const status = confirm("Are You Going To Pay Now?");
        const lead: AppointmentType =
        {
            id: String(name),
            color: generateColor(),
            groupName: `${String(name).split(" ").at(-1)}'s group`,
            status: status === true ? "Booked" : "Reserved",
            reservedBy: {
                id: String(name),
                name: String(name),
                contactNumber: "+639 123 456",
                email: `${name?.replaceAll(" ", ".")}@email.com`,
            },
            amenities: [],
            meals: [],
            rooms: [],
            groupSize: Number(groupSize),
            checkInDays: Number(checkInDays),
            zipCode: Number(zipCode)
        }
        dispatch(addLead(lead))
    }

    return (
        <div className={styles.leadscolumn}>
            <div>
                <h3 className={styles.leadsTitle}>Leads</h3>
                {
                    leads && leads.map((lead) => {
                        return (
                            <div key={lead.id} className={styles.leadCard} style={{ border: `3px solid ${lead.color}` }} draggable onDragStart={(e) => customOnDrag ? customOnDrag({ event: e, data: lead }) : onDrag(e, lead)}>
                                <p className={styles.leadName} style={{ color: lead.color }}>{lead.groupName}</p>
                                <p>{lead.reservedBy.name}</p>
                                <p>{lead.reservedBy.contactNumber}</p>
                                <p>{lead.zipCode}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <button type='button' className={styles.addLead} onClick={openAddLead}>New Lead</button>
            </div>
        </div>
    )
}

export default LeadsColumn;