import { AppointmentType } from "@/types";
import { ArrayRCSD, RetreatCenterType } from "@/utils/sampleData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RetreatCenterStateType = {
    loading: boolean;
    error?: string;
    retreatCenter?: RetreatCenterType;
}
export type AddAppointmentPayload = {
    retreatCenterId: RetreatCenterType["id"];
    appointment: AppointmentType
}
const initialState: RetreatCenterStateType = {
    loading: false,
    error: undefined,
    retreatCenter: {
        id: new Date().toString(),
        name: "",
        zipCode: "",
        housing: {},
        amenities: {},
        appointments: []
    },
}

export const RetreatCentersSlice = createSlice({
    name: "retreatcenter",
    initialState,
    reducers: {
        setRetreatCenterName: (state, action: PayloadAction<string>) => {
            if (!state.retreatCenter) {
                state.retreatCenter = {
                    id: new Date().toString(),
                    name: action.payload,
                    zipCode: "",
                    housing: {},
                    amenities: {},
                    appointments: []
                }
                return
            }
            state.retreatCenter.name = action.payload
        },
        setRetreatCenterZipCode: (state, action: PayloadAction<string>) => {
            if (!state.retreatCenter) {
                return
            }
            state.retreatCenter.zipCode = action.payload
        },
        cancelAppointment: (state, action: PayloadAction<{ appointmentId: AppointmentType["id"] }>) => {
            const { appointmentId } = action.payload;
            if (!state.retreatCenter?.appointments) return;
            state.retreatCenter.appointments = state.retreatCenter?.appointments.filter(appointment => appointment.id !== appointmentId)

        },
        clearAppointments: (state) => {
            if (!state.retreatCenter?.appointments) return;
            state.retreatCenter.appointments = []
        }
    },
});

export const { setRetreatCenterName, setRetreatCenterZipCode, clearAppointments, cancelAppointment } = RetreatCentersSlice.actions
