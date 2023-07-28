import { AppointmentType } from "@/types";
import { ArrayRCSD, RetreatCenterType } from "@/utils/sampleData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RetreatCenterStateType = {
    loading: boolean;
    error?: string;
    retreatCenters: Array<RetreatCenterType>
}
export type AddAppointmentPayload = {
    retreatCenterId: RetreatCenterType["id"];
    appointment: AppointmentType
}
const initialState: RetreatCenterStateType = {
    loading: false,
    error: undefined,
    retreatCenters: ArrayRCSD,
}

export const RetreatCentersSlice = createSlice({
    name: "retreatcenter",
    initialState,
    reducers: {
        addRetreatCenter: (state, action: PayloadAction<RetreatCenterType>) => {
            const retreatCenter = action.payload;
            state.retreatCenters = {
                ...state.retreatCenters,
                [retreatCenter.id]: retreatCenter
            }
        },
        addAppointment: (state, action: PayloadAction<AddAppointmentPayload>) => {
            const { retreatCenterId, appointment } = action.payload
            state.retreatCenters.map(rc => {
                if (retreatCenterId === rc.id) {
                    rc.appointments = rc.appointments ? [...rc.appointments, appointment] : [appointment]
                    return rc
                }
                return rc
            })
        },
        cancelAppointment: (state, action: PayloadAction<{ retreatCenterId: RetreatCenterType["id"], appointmentId: AppointmentType["id"] }>) => {
            const { retreatCenterId, appointmentId } = action.payload;
            state.retreatCenters = state.retreatCenters.map((rc) => {
                if (rc.id === retreatCenterId) {
                    let newRc = { ...rc }
                    newRc.appointments = rc.appointments.filter(a => a.id !== appointmentId)
                    return newRc
                }

                return rc
            })

        },
        clearAppointments: (state) => {
            state.retreatCenters = state.retreatCenters.map(rc => ({ ...rc, appointments: [] }))
        }
    },
})

export const { addRetreatCenter, addAppointment, clearAppointments, cancelAppointment } = RetreatCentersSlice.actions

export default RetreatCentersSlice.reducer