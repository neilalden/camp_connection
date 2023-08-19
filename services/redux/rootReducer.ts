// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import AppointmentsReducer from "./slice/appointments"; // Import your individual slice reducers
import CamperGroupsReducer from "./slice/campergroups";
import LeadsReducer from "./slice/leads";
import RetreatCentersReducer from "./slice/retreatcenters";
import UserReducer from "./slice/user";

// Define RootState type
type RootState = {
  Appointments: ReturnType<typeof AppointmentsReducer>;
  CamperGroups: ReturnType<typeof CamperGroupsReducer>;
  Leads: ReturnType<typeof LeadsReducer>;
  RetreatCenters: ReturnType<typeof RetreatCentersReducer>;
  User: ReturnType<typeof UserReducer>;
};

// Combine the individual slice reducers into the rootReducer
const rootReducer = combineReducers({
  Appointments: AppointmentsReducer,
  CamperGroups: CamperGroupsReducer,
  Leads: LeadsReducer,
  RetreatCenters: RetreatCentersReducer,
  User: UserReducer,
});

export default rootReducer;
export type { RootState };
