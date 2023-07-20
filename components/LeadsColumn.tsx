"use client"
import { addLead } from "@/services/redux/slice/leads";
import { RootState } from "@/services/redux/store";
import { AppointmentType } from "@/types";
import { generateColor } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeadsColumn.module.css"

// import { store, persistor } from "@/services/redux/store"
// import { Provider } from "react-redux"
// import { PersistGate } from "redux-persist/integration/react"
// const Wrapper = () => {
//     return (
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//                 <LeadsColumn />
//             </PersistGate>
//         </Provider>
//     )
// }

const LeadsColumn = () => {
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
            checkInDays: Number(checkInDays)
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
                            <div key={lead.id} className={styles.leadCard} style={{ border: `3px solid ${lead.color}` }} draggable onDragStart={(e) => onDrag(e, lead)}>
                                <p className={styles.leadName} style={{ color: lead.color }}>{lead.groupName}</p>
                                <p>{lead.reservedBy.name}</p>
                                <p>{lead.reservedBy.contactNumber}</p>
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