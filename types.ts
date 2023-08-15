import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLEvent<T> = React.ChangeEvent<T>;
export type VoidFunction = () => void;
export type ArgFunction = (...arg: any) => void;
export type ScreenProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  userCategory: "camper" | "retreatcenterteam" | "campconnectionteam";
  photo?: string;
  middleName?: string;
  birthDate?: Date;
  contactNumber?: string;
  email?: string;
  organization?: string;
};
export type CamperUserType = {
  userType?:
  | "Group Leader"
  | "Group Member"
  | "Camper Gaurdian/Parent"
  | "Individual Camper";
  groupName?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  checkInDays?: Number;
} & User
export type RetreatCenterTeamType = {
  retreatCenterId: RetreatCenterType["id"]
  userType?: "Admin" | "Hospitality" | "Sales" | "Food" | "Group Coordinator";
  position?: "Leader" | "Member" | "Assistant";
} & User
export type CampConnectionTeamUserType = {
  userType?: "Admin" | "Sales" | "Support";
} & User

export type RetreatCenterType = {
  id: string;
  name: string;
  zipCode: string;
  photo?: string;
  mapPhoto?: string;
  capacity?: number;
  timezone?: string;
  state?: string;
  city?: string;
  street?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  housing: {
    buildings?: Array<BuildingType>;
    campAreas?: Array<CampAreaType>
  };
  amenities: {
    activities?: Array<ActivityType>;
  };
  meals?: Array<MealType>;
  meetingRooms?: Array<MeetingRoomType>;

  bedStyles: Array<BedType>
  spotStyles: Array<SpotType>;
  activityStyles: Array<ActivityType>;
  itemStyles: Array<ItemType>;
  diagramStyles: Array<DiagramType>;
}

export type AppointmentType = {
  id: string;
  createdAt: Date;
  retreatCenterId: RetreatCenterTeamType["id"] | CampConnectionTeamUserType["id"];
  groupId: CamperGroupType["id"]
  status: "Lead" | "Reserved" | "Booked";
  checkInDays: number;

  mealSchedule: Array<MealScheduleType>;
  roomSchedule: Array<RoomScheduleType>;
  meetingRoomSchedule: Array<MeetingRoomScheduleType>;
  activitySchedule: Array<ActivityScheduleType>;

  checkInDate?: Date;
  checkOutDate?: Date;
};

export type CamperGroupType = {
  id: string;
  appointmentId: AppointmentType["id"]
  campers: Array<CamperUserType>
  color: string;
  appointeeName?: string;
  appointeeContactNumber?: string;
  appointeeEmail?: string;
  groupName: string;
  zipCode?: number;
  groupSize?: number;
}

export type MealScheduleType = {
  groupId: CamperGroupType["id"];
  time: "Breakfast" | "Lunch" | "Dinner" | Date
  meals: Array<MealType>
}

export type RoomScheduleType = {
  groupId: CamperGroupType["id"];
  checkInDays: AppointmentType["checkInDays"]
  checkInDate?: AppointmentType["checkInDate"]
  checkOutDate?: AppointmentType["checkOutDate"]
  rooms: Array<RoomType>
}

export type MeetingRoomScheduleType = {
  groupId: CamperGroupType["id"];
  scheduleId: string;
  checkInDate?: Date;
  checkInTime?: string;
  checkOutTime?: string;
  meetingRooms: Array<MeetingRoomType>;
  notes?: string
}

export type ActivityScheduleType = {
  groupId: CamperGroupType["id"];
  scheduleId: string;
  checkInDate?: Date;
  checkInTime?: string;
  checkOutTime?: string;
  activities: Array<ActivityType>;
  notes?: string
}

export type MealType = {
  id: string;
  name: string;
  serving?: number;
  price?: number
};
export type MeetingRoomType = {
  id: string;
  name: string;
  capacity: number;
  occupiedBy?: AppointmentType;
  available: boolean;
  diagram?: DiagramType;
  items?: Array<ItemType>
  notes?: string
}
export type BedType = {
  id: string;
  name: string;
  capacity: number;
  amount: number;
  pricing: PricingType | Array<PricingType>
}
export type ActivityType = {
  id: string;
  name: string;
  class: ActivityClass;
  capacity: number;
  duration: {
    time: number;
    interval: TimeIntervalClass
  };
  available: boolean;
  description: any;
  pricing: Array<PricingType>;
  seasonsAvailable: Array<SeasonClass>
  occupiedBy?: AppointmentType;
  feature?: string;
  releaseForm?: string;
  refundPolicy?: string;
  photos: Array<string | StaticImport>;
  notes?: string
};
export type SpotType = {
  id: string;
  name: string;
  capacity: number;
  amount: number;
  pricing: PricingType | Array<PricingType>
}
export type ItemType = {
  id: string;
  name: string;
  amount: number
}
export type DiagramType = {
  id: string;
  name: string;
  photo?: string | StaticImport;
  items: Array<ItemType>
}

export type EditBedStyleName = {
  id: BedType["id"];
  name: BedType["name"];
}
export type EditBedStyleCapacity = {
  id: BedType["id"];
  capacity: BedType["capacity"];
}
export type PricingType = {
  nights?: number | "*";
  per?: string;
  price: number;
}
export type AmenityType = {
  id: string;
  name: string;
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
  id: string;
  name: string;
  spaces?: Array<SpaceType>;
};
export type BuildingType = {
  id: string;
  name: string;
  rooms?: Array<RoomType>;
};
export type FilterType = {
  id: string;
  name: string;
  type: "Housing" | "Meeting room" | "Activity" | "Group";
};
export const Activity = {
  Custom: "Custom",
  Paintball: "Paintball",
  Pool: "Pool",
  Canoe: "Canoe",
  Hiking: "Hiking",
  Basketball: "Basketball",
  Zipline: "Zipline",
} as const
export type ActivityClass = (typeof Activity)[keyof typeof Activity]


export const TimeInterval = {
  minutes: "minutes",
  hours: "hours",
} as const
export type TimeIntervalClass = (typeof TimeInterval)[keyof typeof TimeInterval]

export const Season = {
  Winter: "Winter",
  Spring: "Spring",
  Summer: "Summer",
  Fall: "Fall",
} as const
export type SeasonClass = (typeof Season)[keyof typeof Season]