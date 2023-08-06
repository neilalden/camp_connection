import { POST } from "@/services/api";
import { AppointmentType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export type AppointmentTypeWithExtraProp = {
    draggedDate: Date
} & AppointmentType

export type LeadsStateType = {
    loading: boolean;
    error?: string;
    leads?: Array<AppointmentType>
    requestToken?: string;
    draggedLead?: AppointmentTypeWithExtraProp | AppointmentType
}
const initialState: LeadsStateType = {
    loading: false,
    error: undefined,
    leads: undefined,
    requestToken: undefined,
    draggedLead: undefined
}
export const addNewLeads = createAsyncThunk("user/newleads", async (lead: any) => {
    const response = await POST(
        "http://atsdevs.org/api/users/leads/insertLeads.php",
        lead
    );
    return response;
}
);
export const Leadslice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        setLead: (state, action: PayloadAction<AppointmentType>) => {
            state.leads = state.leads?.map(lead => lead.id === action.payload.id ? action.payload : lead)
        },
        setDraggedLead: (state, action: PayloadAction<AppointmentType | undefined>) => {
            state.draggedLead = action.payload
        },
        addLead: (state, action: PayloadAction<AppointmentType>) => {
            state.leads = Array.isArray(state.leads) ? [action.payload, ...state.leads] : [action.payload]
        },
        removeLead: (state, action: PayloadAction<AppointmentType["id"]>) => {
            state.leads = state.leads?.filter(lead => lead.id !== action.payload)
        },
        clearLeads: (state) => {
            state.leads = undefined
        }
    },
})

export const { setLead, setDraggedLead, addLead, clearLeads, removeLead } = Leadslice.actions

export default Leadslice.reducer