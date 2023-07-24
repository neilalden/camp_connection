import { AppointmentType } from "@/types";
import { generateColor } from "@/utils/functions";
import { leadsSampleData } from "@/utils/sampleData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LeadsStateType = {
    loading: boolean;
    error?: string;
    leads?: Array<AppointmentType>
    requestToken?: string;
}
const initialState: LeadsStateType = {
    loading: false,
    error: undefined,
    leads: undefined,
    requestToken: undefined
}

export const Leadslice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        addLead: (state, action: PayloadAction<AppointmentType>) => {
            state.leads = Array.isArray(state.leads) ? [...state.leads, action.payload] : [action.payload]
        },
        removeLead: (state, action: PayloadAction<AppointmentType["id"]>) => {
            state.leads = state.leads?.filter(lead => lead.id !== action.payload)
        },
        clearLeads: (state) => {
            state.leads = undefined
        }
    },
})

export const { addLead, clearLeads, removeLead } = Leadslice.actions

export default Leadslice.reducer