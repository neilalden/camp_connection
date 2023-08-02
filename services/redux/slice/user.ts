import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CamperUserType,
  RetreatCenterUserType,
  CampConnectionTeamUserType,
} from "@/types";

export type UserStateType = {
  loading: boolean;
  error?: string;
  user?: CamperUserType | RetreatCenterUserType | CampConnectionTeamUserType;
  requestToken?: string;
};
const initialState: UserStateType = {
  loading: false,
  error: undefined,
  user: undefined,
  requestToken: undefined,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStateType["user"]>) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<string>) => {
      if (state.user) state.user.photo = action.payload;
    },
  },
});

export const { setUser, setUserProfile } = UserSlice.actions;

export default UserSlice.reducer;
