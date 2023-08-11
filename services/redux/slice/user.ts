import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CamperUserType,
  RetreatCenterTeamType,
  CampConnectionTeamUserType,
} from "@/types";

export type UserStateType = {
  loading: boolean;
  error?: string;
  user?: CamperUserType | RetreatCenterTeamType | CampConnectionTeamUserType;
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
    setUserPhoto: (state, action: PayloadAction<string>) => {
      if (state.user) state.user.photo = action.payload;
    },
  },
});

export const { setUser, setUserPhoto } = UserSlice.actions;

export default UserSlice.reducer;
