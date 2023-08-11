import { POST } from "@/services/api";
import { AppointmentType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export type AppointmentTypeWithExtraProp = {
    draggedDate: Date
} & AppointmentType

export type AppointmentsStateType = {
    loading: boolean;
    error: string | false;
    appointments: Array<AppointmentType>
}
const initialState: AppointmentsStateType = {
    loading: false,
    error: false,
    appointments: [],
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
        createAppointment: (state, action: PayloadAction<AppointmentType>) => {
            state.appointments = [action.payload, ...state.appointments]
        },
        updateAppointment: (state, action: PayloadAction<AppointmentType>) => {
            state.appointments = state.appointments.map(appointment => appointment.id === action.payload.id ? action.payload : appointment)
        },
        deleteAppointment: (state, action: PayloadAction<AppointmentType["id"]>) => {
            state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload)
        },
        clearAppointments: (state) => {
            state.appointments = []
        }
    },
})

export const {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    clearAppointments,
} = Appointmentslice.actions

export default Appointmentslice.reducer