import { POST } from "@/services/api";
import { AppointmentType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export type AppointmentTypeWithExtraProp = {
    draggedDate: Date
} & AppointmentType

export type AppointmentsStateType = {
    loading: boolean;
    error?: string;
    appointments?: Array<AppointmentType>
    requestToken?: string;
}
const initialState: AppointmentsStateType = {
    loading: false,
    error: undefined,
    appointments: undefined,
    requestToken: undefined,
}
export const addNewAppointments = createAsyncThunk("user/newappointments", async (appointment: any) => {
    const response = await POST(
        "http://atsdevs.org/api/users/appointments/insertAppointments.php",
        appointment
    );
    return response.json()
}
);
export const Appointmentslice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAppointment: (state, action: PayloadAction<AppointmentType>) => {
            state.appointments = state.appointments?.map(appointment => appointment.id === action.payload.id ? action.payload : appointment)
        },
        addAppointment: (state, action: PayloadAction<AppointmentType>) => {
            state.appointments = Array.isArray(state.appointments) ? [action.payload, ...state.appointments] : [action.payload]
        },
        removeAppointment: (state, action: PayloadAction<AppointmentType["id"]>) => {
            state.appointments = state.appointments?.filter(appointment => appointment.id !== action.payload)
        },
        clearAppointments: (state) => {
            state.appointments = undefined
        }
    },
})

export const {
    setAppointment,
    addAppointment,
    clearAppointments,
    removeAppointment,
} = Appointmentslice.actions

export default Appointmentslice.reducer