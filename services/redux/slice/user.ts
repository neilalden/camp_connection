import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CamperUserType, RetreatCenterUserType, CampConnectionTeamUserType } from "@/types";

export type UserStateType = {
    loading: boolean;
    error?: string;
    user?: CamperUserType | RetreatCenterUserType | CampConnectionTeamUserType;
    requestToken?: string;
}
const initialState: UserStateType = {
    loading: false,
    error: undefined,
    user: undefined,
    requestToken: undefined
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserStateType["user"]>) => {
            state.user = action.payload
        },
    },
})

export const { setUser } = UserSlice.actions

export default UserSlice.reducer