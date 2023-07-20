import { AppointmentType } from "@/types";
import { appointmentsSampleData } from "@/utils/sampleData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppointmentStateType = {
    loading: boolean;
    error?: string;
    appointments?: Array<AppointmentType>
    requestToken?: string;
}
const initialState: AppointmentStateType = {
    loading: false,
    error: undefined,
    appointments: undefined,
    requestToken: undefined
}

export const AppointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        addAppointment: (state, action: PayloadAction<AppointmentType>) => {
            state.appointments = Array.isArray(state.appointments) ? [...state.appointments, action.payload] : [action.payload]
        },
        clearAppointments: (state) => {
            state.appointments = undefined
        }
    },
})

export const { addAppointment, clearAppointments } = AppointmentSlice.actions

export default AppointmentSlice.reducer