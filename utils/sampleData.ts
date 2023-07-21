import Colors from "@/common/colors";
import { FilterType, AppointmentType, MealType } from "@/types";
import { generateColor, getDays } from "./functions";
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
        buildings?: Array<BuildingType>
    };
    amenities: {
        activities?: Array<ActivityType>
    }
    meetingrooms?: {}
    groups?: {}
}
export type RetreatCenterType = {
    id: string;
    name: string;
    zipCode: number;
    capacity?: number;
    meals?: Array<MealType>
} & FacilitiesType
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
    }
}

export const DaysSampleData = getDays({ start: new Date("July 01 2023"), end: new Date("August 01 2023") });
export const RetreatCenterSsampleData: Array<RetreatCenterType> = [
    {
        id: "Eatern Point Retreat House",
        name: "Eatern Point Retreat House",
        zipCode: 1234,
        capacity: 30,
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
        }
    },
    {
        id: "Art of Living Retreat Center",
        name: "Art of Living Retreat Center",
        zipCode: 5678,
        capacity: 50,
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
        }
    },
    {
        id: "Marianist Family Retreat Center",
        name: "Marianist Family Retreat Center",
        zipCode: 8234,
        capacity: 100,
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
        }
    },
    {
        id: "Isabella Freedman Jewish Retreat Center",
        name: "Isabella Freedman Jewish Retreat Center",
        zipCode: 7654,
        capacity: 20,
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
        }
    },
    {
        id: "Abbey of Gethsemani",
        name: "Abbey of Gethsemani",
        zipCode: 2134,
        capacity: 70,
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
        }
    },
    {
        id: "Saint John’s Abbey",
        name: "Saint John’s Abbey",
        zipCode: 5843,
        capacity: 170,
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
        }
    },
];

export const leadsSampleData: Array<AppointmentType> = [
    {
        id: "John Doe",
        color: generateColor(),
        groupName: "Doe's group",
        status: "Reserved",
        reservedBy: {
            id: "string",
            name: "John Doe",
            contactNumber: "+639 123 456",
            email: "john.doe@email.com",
        },
        zipCode: 4030,
        groupSize: 20,
        checkInDays: 5,
        amenities: [],
        meals: [],
        rooms: [],
    }
]

export const appointmentsSampleData: Array<AppointmentType> = [
    {
        id: "appointment1",
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
        id: "appointment2",
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