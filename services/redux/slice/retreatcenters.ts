import { AppointmentType } from "@/types";
import { ArrayRCSD, RetreatCenterSsampleData, RetreatCentersType, RetreatCenterType } from "@/utils/sampleData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RetreatCenterStateType = {
    loading: boolean;
    error?: string;
    retreatCenters: Array<RetreatCenterType>
    requestToken?: string;
}
export type AddAppointmentPayload = {
    retreatCenterId: RetreatCenterType["id"];
    appointment: AppointmentType
}
const initialState: RetreatCenterStateType = {
    loading: false,
    error: undefined,
    retreatCenters: ArrayRCSD,
    requestToken: undefined
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
            // const retreatCenter = state.retreatCenters[retreatCenterId]
            // if (retreatCenter.appointments !== undefined) retreatCenter.appointments.push(appointment)
            // else retreatCenter.appointments = [appointment]
            // // state.retreatCenters[retreatCenterId] = retreatCenter
            // const copy = {
            //     ...state.retreatCenters,
            //     [retreatCenterId]: retreatCenter
            // }
            // state.retreatCenters = copy
            state.retreatCenters.map(rc => {
                if (retreatCenterId === rc.id) {
                    rc.appointments = rc.appointments ? [...rc.appointments, appointment] : [appointment]
                    return rc
                }
                return rc
            })
        }
    },
})

export const { addRetreatCenter, addAppointment } = RetreatCentersSlice.actions

export default RetreatCentersSlice.reducer