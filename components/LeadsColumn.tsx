"use client"
import { addLead, addNewLeads, removeLead, setDraggedLead } from "@/services/redux/slice/leads";
import { RootState } from "@/services/redux/store";
import { AppointmentType, ArgFunction, HTMLEvent } from "@/types";
import { IDGenerator, debounce, generateColor, onDragOver } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeadsColumn.module.css"
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import { cancelAppointment } from "@/services/redux/slice/retreatcenters";

type Props = {
    customOnDrag?: ArgFunction
    leadCardOnClick?: ArgFunction
    showZipCode?: boolean
}

const LeadsColumn = (props: Props) => {
    const { customOnDrag, leadCardOnClick, showZipCode = false } = props
    const dispatch = useDispatch<any>();
    const leads = useSelector((state: RootState) => state.Leads.leads)
    const user = useSelector((state: RootState) => state.User.user)
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
    if (!user) return null;
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
        dispatch(setDraggedLead(data))
    }

    const openAddLead = async () => {

        const checkInDays = ""
        const zipCode = ""
        const groupSize = ""
        const createdAt = new Date();
        const color = generateColor();
        const lead: AppointmentType =
        {
            id: IDGenerator(),
            reservedBy: user,
            reservee: {
                id: IDGenerator(),
                firstName: "",
                lastName: "",
                createdAt: new Date(),
                userCategory: "camper",
            },
            color: color,
            groupName: "",
            amenities: [],
            meals: [],
            rooms: [],
            groupSize: Number(groupSize),
            checkInDays: Number(checkInDays),
            zipCode: Number(zipCode),
            createdAt: createdAt
        }
        dispatch(addLead(lead))
    }

    const onDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        if (!widgetType) return;
        const parsed: AppointmentType = JSON.parse(widgetType)
        const isALead = leads?.find((lead) => lead.id === parsed.id)
        if (isALead) dispatch(removeLead(parsed.id))
        else dispatch(cancelAppointment({
            appointmentId: parsed.id
        }))
        dispatch(addLead({ ...parsed, status: undefined, rooms: [] }))

    }
    return (
        <div
            className={styles.leadscolumn}
        >
            <div
                style={{ height: "100%", overflowY: "hidden" }}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <h3 className={styles.leadsTitle}>Leads</h3>
                {leads && leads?.length >= 5 ? <TextInput value={searchString} setValue={(e) => setSearchString(e.target.value)} placeholder="Search Lead" containerClassName={styles.searchInput} /> : null}
                <div className={styles.leadsContainer}>
                    {
                        rerenderingLeads && rerenderingLeads.map((lead, i) => {
                            return (
                                <LeadCard
                                    showZipCode={showZipCode}
                                    key={i}
                                    lead={lead}
                                    onClick={() => leadCardOnClick ? leadCardOnClick(lead) : null}
                                    onDragStart={(event) => customOnDrag ? customOnDrag({ event, data: lead }) : onDrag({ event, data: lead })}
                                />)
                        })
                    }
                </div>
            </div>
            <div style={{ minHeight: "50px" }}>
                <button type='button' className={styles.addLead} onClick={openAddLead}>New Lead</button>
            </div>
        </div >
    )
}

export default LeadsColumn;