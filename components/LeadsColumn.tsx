"use client"
import { createLead, deleteLead, setCurrentLead } from "@/services/redux/slice/leads";
import { RootState } from "@/services/redux/store";
import { AppointmentType, ArgFunction, CamperGroupType, HTMLEvent } from "@/types";
import { IDGenerator, debounce, generateColor, onDragOver, sortArrayOfObjects } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeadsColumn.module.css"
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import { deleteAppointment } from "@/services/redux/slice/appointments";
import { createCamperGroup, setCurrentCamperGroup } from "@/services/redux/slice/campergroups";

type Props = {
    customOnDrag?: ArgFunction
    leadCardOnClick?: ArgFunction
    showZipCode?: boolean
}

const LeadsColumn = (props: Props) => {
    const { customOnDrag, leadCardOnClick, showZipCode = false } = props
    const dispatch = useDispatch<any>();
    const CamperGroups = useSelector((state: RootState) => state.CamperGroups.camperGroups)
    const Leads = useSelector((state: RootState) => state.Leads.leads)
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
    const [rerenderingLeads, setRerenderingnLeads] = useState(Leads)
    const [searchString, setSearchString] = useState("")
    useEffect(() => {
        if (searchString === "") { setRerenderingnLeads(Leads); return; }
        const result = Leads.filter(lead => {
            const group = CamperGroups.find((cg) => cg.id === lead.groupId);
            return group?.groupName.toLowerCase().includes(searchString.toLowerCase()) ||
                group?.appointeeName?.toLowerCase().includes(searchString.toLowerCase()) ||
                group?.appointeeEmail?.toLowerCase().includes(searchString.toLowerCase()) ||
                group?.appointeeContactNumber?.toLowerCase().includes(searchString.toLowerCase())
        })
        setRerenderingnLeads(result)
    }, [searchString, Leads])
    const onDrag = ({ event, data }: { event: React.DragEvent<HTMLDivElement>; data: AppointmentType }) => {
        const widgetType = JSON.stringify(data)
        event.dataTransfer.setData("widgetType", widgetType)
        const group = CamperGroups.find((cg) => cg.id === data.groupId);
        dispatch(setCurrentLead(data))
        dispatch(setCurrentCamperGroup(group))
    }

    const openCreateLead = async () => {
        const appointmentId = IDGenerator()
        const group: CamperGroupType = {
            id: IDGenerator(),
            appointmentId: appointmentId,
            campers: [],
            color: generateColor(),
            groupName: "Group " + (CamperGroups.length + 1),
            groupSize: 0,
            zipCode: 0,
        }
        const lead: AppointmentType =
        {
            id: appointmentId,
            createdAt: new Date(),
            retreatCenterId: RetreatCenter.id,
            groupId: group.id,
            status: "Lead",
            checkInDays: 0,
            activitySchedule: [],
            mealSchedule: [],
            meetingRoomSchedule: [],
            roomSchedule: [],
        }
        dispatch(createCamperGroup(group))
        dispatch(createLead(lead))
    }

    const onDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        const data = JSON.parse(widgetType)
        if (!widgetType) return;
        const parsed: AppointmentType = Array.isArray(data) ? data[0] : data;
        const isALead = parsed && parsed.status === "Lead"
        if (isALead) dispatch(deleteLead(parsed.id))
        else dispatch(deleteAppointment(parsed.id))
        dispatch(createLead({
            ...parsed,
            checkInDate: parsed.checkInDate ? new Date(parsed.checkInDate) : undefined,
            checkOutDate: parsed.checkOutDate ? new Date(parsed.checkOutDate) : undefined,
            createdAt: new Date(parsed.createdAt),
            status: "Lead",
            activitySchedule: [],
            mealSchedule: [],
            meetingRoomSchedule: [],
            roomSchedule: [],
        }))
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
                {Leads.length >= 5 ? <TextInput value={searchString} setValue={(e) => setSearchString(e.target.value)} placeholder="Search Lead" containerClassName={styles.searchInput} /> : null}
                <div className={styles.leadsContainer}>
                    {
                        sortArrayOfObjects(rerenderingLeads, "createdAt").map((lead, i) => {
                            return (
                                <LeadCard
                                    showZipCode={showZipCode}
                                    key={i}
                                    lead={lead}
                                    group={CamperGroups.find(cg => cg.id === lead.groupId)}
                                    onClick={() => leadCardOnClick ? leadCardOnClick(lead) : null}
                                    onDragStart={(event) => customOnDrag ? customOnDrag({ event, data: lead }) : onDrag({ event, data: lead })}
                                />)
                        })
                    }
                </div>
            </div>
            <div style={{ minHeight: "50px" }}>
                <button type='button' className={styles.createLead} onClick={openCreateLead}>New Lead</button>
            </div>
        </div >
    )
}

export default LeadsColumn;