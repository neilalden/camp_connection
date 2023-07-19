import Colors from "@/common/colors";
import { FilterType, ReservationType } from "@/types";
import { getDays } from "./functions";
export type RoomType = {
    id: string;
    name: string;
    singleBed?: number;
    doubleBed?: number;
    queenBed?: number;
    kingBed?: number;
    bunkBed?: number;
}
export type LevelType = {
    id: string;
    name: string;
    rooms?: Array<RoomType>
}
export type BuildingType = {
    levels?: Array<LevelType>
    rooms?: Array<RoomType>
} & FilterType;
export type ActivityType = {
} & FilterType;
export type FacilitiesType = {
    housing: {
        buildings: Array<BuildingType>
    };
    amenities: {
        activities: Array<ActivityType>
    } & FilterType;
    meetingrooms: {} & FilterType;
    groups: {} & FilterType;
}
export const FacilitiesSampleData: FacilitiesType = {
    housing: {
        buildings: [
            {
                id: "buildingA",
                name: "Building A",
                type: "Housing",
                levels: [
                    {
                        id: "buildingAlevel1",
                        name: "Level 1",
                        rooms: [
                            {
                                id: "buildingAlevel1room1",
                                name: "room101",
                                singleBed: 4
                            },
                            {
                                id: "buildingAlevel1room2",
                                name: "room102",
                                singleBed: 2,
                                doubleBed: 2
                            }
                        ]
                    },
                    {
                        id: "buildingAlevel2",
                        name: "Level 2",
                        rooms: [
                            {
                                id: "level2room1",
                                name: "room201",
                                queenBed: 2
                            },
                            {
                                id: "level2room2",
                                name: "room202",
                                queenBed: 2
                            }
                        ]
                    }]
            }
        ]
    },
    amenities: {
        id: "activities",
        name: "activities",
        type: "Activity",
        activities: [
            {
                id: "pool1",
                name: "Pool A",
                type: "Activity"
            },
            {
                id: "paintballA",
                name: "Paintball A",
                type: "Activity"
            }
        ]

    },
    meetingrooms: {
        id: "Meeting room",
        name: "Meeting room",
        type: "Meeting room"

    },
    groups: {
        id: "Groups",
        name: "Groups",
        type: "Group"
    }
}
export const DaysSampleData = getDays({ start: new Date("July 01 2023"), end: new Date("August 01 2023") });
export const selectedFiltersSampleData: Array<FilterType> = [
    {
        id: "buildingA",
        name: "Building A",
        type: "Housing"
    },
    {
        id: "pool1",
        name: "Pool",
        type: "Activity"
    },
];

export const reservationsSampleData: Array<ReservationType> = [
    {
        id: "reservation1",
        reservedBy: {
            id: "string",
            name: "Jane Doe",
            contactNumber: "+639 123 456",
            email: "jane.doe@email.com",
        },
        groupSize: 12,
        color: Colors.green300,
        groupName: "Jane's group",
        status: "Reserved",
        checkInDate: new Date("July 05 2023"),
        checkOutDate: new Date("July 10 2023"),
        checkInDays: 3,
        amenities: [
            {
                id: "pool1",
                name: "pool"
            },
            {
                id: "hiking1",
                name: "hiking"
            }
        ],
        meals: [],
        rooms: []
    },
    {
        id: "reservation2",
        groupName: "Pearson Hardman",
        reservedBy: {
            id: "2",
            name: "Mike Ross",
            contactNumber: "+639 123 456",
            email: "mike.ross@email.com",
        },
        groupSize: 12,
        color: Colors.red400,
        status: "Booked",
        checkInDate: new Date("July 06 2023"),
        checkOutDate: new Date("July 14 2023"),
        checkInDays: 7,
        amenities: [],
        meals: [],
        rooms: [
            {
                id: "301",
                name: "301",
                single: 4,
                buildingId: "buildingA",
            },
            {
                id: "302",
                name: "302",
                single: 4,
                buildingId: "buildingA",
            },
            {
                id: "303",
                name: "303",
                single: 4,
                buildingId: "buildingA",
            },
            {
                id: "304",
                name: "304",
                single: 4,
                buildingId: "buildingA",
            },
        ]
    },

]