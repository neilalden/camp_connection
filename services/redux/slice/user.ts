import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CamperUserType,
  RetreatCenterTeamType,
  CampConnectionTeamUserType,
  userSignInType,
  userSignUpType,
} from "@/types";
import { POST } from "@/services/api";
import axios from "axios";

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

export const userSignIn = createAsyncThunk(
  "user/login",
  async ({ userData, toast }: { userData: userSignInType; toast: any }) => {
    try {
      const response = await axios.post(
        "https://atsdevs.org/cc/public/api/login",
        userData
      );
      toast.success("login successful");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message[0]);
      console.log(error.response.data.message[0]);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "user/login",
  async ({ userData, toast }: { userData: userSignUpType; toast: any }) => {
    try {
      const response = await axios.post(
        "https://atsdevs.org/cc/public/api/retreatcenter",
        userData
      );
      toast.success("Register Successfull you may now Login");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  }
);

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
  extraReducers(builder) {
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser, setUserPhoto } = UserSlice.actions;

export default UserSlice.reducer;
