"use client"
import { addLead } from "@/services/redux/slice/leads";
import { RootState } from "@/services/redux/store";
import { AppointmentType, ArgFunction, HTMLEvent } from "@/types";
import { debounce, generateColor } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeadsColumn.module.css"
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";

type Props = {
    customOnDrag?: ArgFunction
    leadCardOnClick?: ArgFunction
}

const LeadsColumn = (props: Props) => {
    const { customOnDrag, leadCardOnClick } = props
    const dispatch = useDispatch();
    const leads = useSelector((state: RootState) => state.Leads.leads)
    const [rerenderingLeads, setRerenderingnLeads] = useState(leads)
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        if (searchString === "") { setRerenderingnLeads(leads); return; }
        const result = leads?.filter(lead =>
            lead.reservedBy.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
            lead.reservedBy.lastName.toLowerCase().includes(searchString.toLowerCase()) ||
            lead.groupName.toLowerCase().includes(searchString.toLowerCase())
        )
        setRerenderingnLeads(result)
    }, [searchString, leads])
    const onDrag = ({ event, data }: { event: React.DragEvent<HTMLDivElement>; data: AppointmentType }) => {
        const widgetType = JSON.stringify(data)
        event.dataTransfer.setData("widgetType", widgetType)
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
        const createdAt = new Date();
        const color = generateColor();
        const lead: AppointmentType =
        {
            id: `${String(name)}---${zipCode}---${color}---${createdAt.toString()}`,
            color: color,
            groupName: `${String(name).split(" ").at(-1)}'s group`,
            status: status === true ? "Booked" : "Reserved",
            reservedBy: {
                id: `${String(name)}---${createdAt.toString()}`,
                firstName: String(name.split(" ").at(0)),
                lastName: String(name.split(" ").at(-1)),
                contactNumber: "+639 123 456",
                email: `${name?.replaceAll(" ", ".")}@email.com`,
                createdAt: createdAt,
                userCategory: "camper"
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
                {leads && leads?.length >= 5 ? <TextInput value={searchString} setValue={(e) => setSearchString(e.target.value)} placeholder="Search Lead" containerClassName={styles.searchInput} /> : null}
                {
                    rerenderingLeads && rerenderingLeads.map((lead, i) => {
                        // return <LeadCard
                        //     key={i}
                        //     lead={lead}
                        //     onClick={() => leadCardOnClick && leadCardOnClick(lead)}
                        //     onDragStart={(event: React.DragEvent<HTMLDivElement>) => customOnDrag ? customOnDrag({ event: event, data: lead }) : onDrag({ event: event, data: lead })}
                        // />
                        return (
                            <div
                                draggable
                                key={i}
                                className={styles.leadCard}
                                style={{
                                    border: `3px solid ${lead.color}`,
                                }}
                                onClick={() => leadCardOnClick ? leadCardOnClick(lead) : null}
                                onDragStart={(event) => customOnDrag ? customOnDrag({ event, data: lead }) : onDrag({ event, data: lead })}>
                                <p className={styles.leadName} style={{ color: lead.color }}>{lead.groupName}</p>
                                <p>{lead.reservedBy.firstName}</p>
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
        </div >
    )
}

export default LeadsColumn;