import { POST } from "@/services/api";
import { CamperGroupType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CamperGroupsStateType = {
    loading: boolean;
    error?: string;
    camperGroups: Array<CamperGroupType>
    currentCamperGroup?: CamperGroupType
}
const initialState: CamperGroupsStateType = {
    loading: false,
    error: undefined,
    camperGroups: [],
    currentCamperGroup: undefined
}
export const createNewCamperGroup = createAsyncThunk("user/newcampergroup", async (camperGroup: any) => {
    const response = await POST(
        "http://atsdevs.org/api/users/camperGroups/insertCamperGroups.php",
        camperGroup
    );
    return response;
}
);
export const CamperGroupslice = createSlice({
    name: "campergroups",
    initialState,
    reducers: {
        createCamperGroup: (state, action: PayloadAction<CamperGroupType>) => {
            state.camperGroups = [action.payload, ...state.camperGroups]
        },
        updateCamperGroup: (state, action: PayloadAction<CamperGroupType>) => {
            state.camperGroups = state.camperGroups.map(camperGroup => camperGroup.id === action.payload.id ? action.payload : camperGroup)
        },
        deleteCamperGroup: (state, action: PayloadAction<CamperGroupType["id"]>) => {
            state.camperGroups = state.camperGroups.filter(camperGroup => camperGroup.id !== action.payload)
        },
        setCurrentCamperGroup: (state, action: PayloadAction<CamperGroupType | undefined>) => {
            state.currentCamperGroup = action.payload
        },
        clearCamperGroups: (state) => {
            state.camperGroups = []
        }
    },
})

export const { updateCamperGroup, setCurrentCamperGroup, createCamperGroup, clearCamperGroups, deleteCamperGroup } = CamperGroupslice.actions

export default CamperGroupslice.reducer