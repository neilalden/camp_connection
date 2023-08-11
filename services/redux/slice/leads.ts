import { POST } from "@/services/api";
import { AppointmentType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// export type AppointmentTypeWithExtraProp = {
//     draggedDate: Date
// } & AppointmentType

export type LeadsStateType = {
    loading: boolean;
    error?: string;
    leads: Array<AppointmentType>
    currentLead?: AppointmentType
}
const initialState: LeadsStateType = {
    loading: false,
    error: undefined,
    leads: [],
    currentLead: undefined
}
export const createNewLead = createAsyncThunk("user/newlead", async (lead: any) => {
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
        createLead: (state, action: PayloadAction<AppointmentType>) => {
            state.leads = [action.payload, ...state.leads]
        },
        updateLead: (state, action: PayloadAction<AppointmentType>) => {
            state.leads = state.leads?.map(lead => lead.id === action.payload.id ? action.payload : lead)
        },
        deleteLead: (state, action: PayloadAction<AppointmentType["id"]>) => {
            state.leads = state.leads?.filter(lead => lead.id !== action.payload)
        },
        setCurrentLead: (state, action: PayloadAction<AppointmentType | undefined>) => {
            state.currentLead = action.payload
        },
        clearLeads: (state) => {
            state.leads = []
        }
    },
})

export const { updateLead, setCurrentLead, createLead, clearLeads, deleteLead } = Leadslice.actions

export default Leadslice.reducer