import { RetreatCenterSsampleData, RetreatCenterType } from "@/utils/sampleData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RetreatCenterStateType = {
    loading: boolean;
    error?: string;
    retreatCenters?: Array<RetreatCenterType>
    requestToken?: string;
}
const initialState: RetreatCenterStateType = {
    loading: false,
    error: undefined,
    retreatCenters: RetreatCenterSsampleData,
    requestToken: undefined
}

export const RetreatCentersSlice = createSlice({
    name: "retreatcenter",
    initialState,
    reducers: {
        addAppointment: (state, action: PayloadAction<RetreatCenterType>) => {
            state.retreatCenters = Array.isArray(state.retreatCenters) ? [...state.retreatCenters, action.payload] : [action.payload]
        },
    },
})

export const { addAppointment } = RetreatCentersSlice.actions

export default RetreatCentersSlice.reducer