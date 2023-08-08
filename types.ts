export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLEvent<T> = React.ChangeEvent<T>;
export type VoidFunction = () => void;
export type ArgFunction = (...arg: any) => void;
export type ScreenProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  userCategory: "camper" | "retreatcenter" | "campconnectionteam";
  photo?: string;
  middleName?: string;
  birthDate?: Date;
  contactNumber?: string;
  email?: string;
  organization?: string;
};
export interface CamperUserType extends User {
  userType?:
  | "Group Leader"
  | "Group Member"
  | "Camper Gaurdian/Parent"
  | "Individual Camper";
  groupName?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  checkInDays?: Number;
}
export interface RetreatCenterUserType extends User {
  userType?: "Admin" | "Hospitality" | "Sales" | "Food" | "Group Coordinator";
  position?: "Leader" | "Member" | "Assistant";
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
export type MeetingRoomType = {
  id: string;
  name: string;
  capacity: number;
  occupiedBy?: AppointmentType;
  available: boolean
}
export type PricingType = {
  nights: number | "*";
  price: number;
}

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
  reservedBy: CamperUserType | RetreatCenterUserType | CampConnectionTeamUserType;
  reservee: CamperUserType
  status?: "Reserved" | "Booked";
  checkInDays: number;
  groupName: string;
  color: string;
  groupSize?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  amenities?: Array<AmenityType>;
  meals?: Array<MealType>;
  rooms?: Array<RoomType>;
  meetingRooms?: Array<MeetingRoomType>;
  zipCode?: number;
  createdAt: Date;
};

export type FileType = {
  url: string;
  name: string;
};
export type ScheduleType = {
  label: string;
  value: boolean;
  editMode: boolean;
  from: string;
  to: string;
};
export type LevelType = {
  id: string;
  name: string;
  rooms?: Array<RoomType>;
};
export type ItemType = {
  id: string;
  name: string;
  amount: number
}
export type DiagramType = {
  id: string;
  name: string;
  photo?: string;
  items: Array<ItemType>
}
export type BedType = {
  id: string;
  name: string;
  capacity: number;
  amount: number;
  pricing: PricingType | Array<PricingType>
}
export type SpotType = {
  id: string;
  name: string;
  capacity: number;
  amount: number;
  pricing: PricingType | Array<PricingType>
}
export type RoomType = {
  id: string;
  name: string;
  buildingId?: string;
  level?: string;
  beds: Array<BedType>;
  capacity: number;
  occupiedBy?: AppointmentType;
  available: boolean
};
export type SpaceType = {
  id: string;
  name: string;
  campAreaId?: string;
  level?: string;
  spots: Array<SpotType>
};

export type CampAreaType = {
  spaces?: Array<SpaceType>;
} & FilterType;
export type BuildingType = {
  // levels?: Array<LevelType>;
  rooms?: Array<RoomType>;
} & FilterType;
export type ActivityType = {
  class: "pool" | "paintball" | "zipline" | "canoe";
} & FilterType;
export type FacilitiesType = {
  housing: {
    buildings?: Array<BuildingType>;
    campAreas?: Array<CampAreaType>
  };
  amenities: {
    activities?: Array<ActivityType>;
  };
  meetingRooms?: Array<MeetingRoomType>;
};
export type RetreatCenterType = {
  id: string;
  name: string;
  zipCode: string;
  photo?: string;
  capacity?: number;
  timezone?: string;
  state?: string;
  city?: string;
  street?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  meals?: Array<MealType>;
  bedStyles: Array<BedType>
  spotStyles: Array<SpotType>;
  itemStyles: Array<ItemType>;
  diagramStyles: Array<DiagramType>;
  appointments: Array<AppointmentType>;
} & FacilitiesType;