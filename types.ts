export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLEvent<T> = React.ChangeEvent<T>;
export type VoidFunction = () => void;
export type ArgFunction = (arg?: any) => void;
export type ScreenProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

export type User = {
  id: string;
  photo?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: Date;
  contactNumber?: string;
  email?: string;
  organization?: string;
  createdAt: Date;
  userCategory: "camper" | "retreatcenter" | "campconnectionteam";
};
export interface CamperUserType extends User {
  userType?:
    | "Group Leader"
    | "Group Member"
    | "Camper Gaurdian/Parent"
    | "Individual Camper";
  groupName?: string;
  camperTeam?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  checkInDays?: Number;
}
export interface RetreatCenterUserType extends User {
  userType?: "Admin" | "Hospitality" | "Sales" | "Food" | "Group Coordinator";
}
export interface CampConnectionTeamUserType extends User {
  userType?: "Admin" | "Sales" | "Support";
}
export type FilterType = {
  id: string;
  name: string;
  type: "Housing" | "Meeting room" | "Activity" | "Group";
  // [key: string]: any
};
export type RoomType = {
  id: string;
  name: string;
  buildingId?: string;
  level?: string;
  single?: number;
  double?: number;
  queen?: number;
  king?: number;
  bunk?: string;
};
export type AmenityType = {
  id: string;
  name: string;
};
export type MealType = {
  id: string;
  name: string;
};
export type AppointmentType = {
  id: string;
  reservedBy: CamperUserType;
  status: "Reserved" | "Booked";
  checkInDays: number;
  groupName: string;
  color: string;
  groupSize?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  amenities?: Array<AmenityType>;
  meals?: Array<MealType>;
  rooms?: Array<RoomType>;
  zipCode?: number;
};

export type FileType = {
  url: string;
  name: string;
};
