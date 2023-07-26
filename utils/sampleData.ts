import Colors from "@/common/colors";
import { FilterType, AppointmentType, MealType, CampConnectionTeamUserType, CamperUserType, RetreatCenterUserType } from "@/types";
import { generateColor, getDays } from "./functions";
import { URL } from "url";
import Images from "@/common/images";
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
    class: "pool" | "paintball" | "zipline" | "canoe"
} & FilterType;
export type FacilitiesType = {
    housing: {
        buildings?: Array<BuildingType>
    };
    amenities: {
        activities?: Array<ActivityType>
    }
    meetingrooms?: {}

    appointments: Array<AppointmentType>
}
export type RetreatCenterType = {
    id: string;
    name: string;
    zipCode: number;
    image?: string
    capacity?: number;
    timezone?: string;
    state?: string;
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
                id: "Zipline1",
                name: "Zipline A",
                type: "Activity",
                class: "zipline"
            },
            {
                id: "CanoeA",
                name: "Canoe A",
                type: "Activity",
                class: "canoe"
            },
            {
                id: "pool1",
                name: "Pool A",
                type: "Activity",
                class: "pool"
            },
            {
                id: "paintballA",
                name: "Paintball A",
                type: "Activity",
                class: "paintball"
            }
        ]

    },
    meetingrooms: {
        id: "Meeting room",
        name: "Meeting room",
        type: "Meeting room"

    },
    appointments: []
}

export const DaysSampleData = getDays({ start: new Date("July 01 2023"), end: new Date("August 01 2023") });

export const UsersSampleData: Array<CamperUserType | RetreatCenterUserType | CampConnectionTeamUserType> = [
    {
        photo: "https://thispersondoesnotexist.com/",
        firstName: "John",
        lastName: "Doe",
        id: "1",
        createdAt: new Date(),
        userCategory: "retreatcenter",
        userType: "Sales",
        contactNumber: "+123 456 789",
        email: "John.Doe@campconnetion.net"
    },
    {
        photo: "https://thispersondoesnotexist.com/",
        firstName: "Mike",
        lastName: "Ross",
        id: "2",
        createdAt: new Date(),
        userCategory: "retreatcenter",
        userType: "Admin",
        contactNumber: "+123 456 789",
        email: "Mike.Ross@campconnetion.net"
    },
    {
        photo: "https://thispersondoesnotexist.com/",
        firstName: "Jessica",
        lastName: "Pearson",
        id: "3",
        createdAt: new Date(),
        userCategory: "retreatcenter",
        userType: "Hospitality",
        contactNumber: "+123 456 789",
        email: "Jessica.Pearson@campconnetion.net"
    },
    {
        photo: "https://thispersondoesnotexist.com/",
        firstName: "Louis",
        lastName: "Litt",
        id: "4",
        createdAt: new Date(),
        userCategory: "retreatcenter",
        userType: "Sales",
        contactNumber: "+123 456 789",
        email: "Louis.Litt@campconnetion.net"
    },
]

export const ArrayRCSD: Array<RetreatCenterType> = [
    {
        id: "Eatern Point Retreat House",
        name: "Eatern Point Retreat House",
        state: "California",
        image: Images["ic_logo"],
        zipCode: 2143,
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
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                },
                {
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                },
                {
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                }
            ]

        },
        meetingrooms: {
            id: "Meeting room",
            name: "Meeting room",
            type: "Meeting room"

        },
        appointments: []
    },
    {
        id: "Art of Living Retreat Center",
        name: "Art of Living Retreat Center",
        zipCode: 5678,
        capacity: 50,
        image: Images["ic_logo"],
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
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                }
            ]

        },
        meetingrooms: {
            id: "Meeting room",
            name: "Meeting room",
            type: "Meeting room"

        },

        appointments: []
    },
    {
        id: "Marianist Family Retreat Center",
        name: "Marianist Family Retreat Center",
        zipCode: 8234,
        capacity: 100,
        image: Images["ic_logo"],
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
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                },
                {
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                }
            ]


        },
        meetingrooms: {
            id: "Meeting room",
            name: "Meeting room",
            type: "Meeting room"

        },

        appointments: []
    },
    {
        id: "Isabella Freedman Jewish Retreat Center",
        name: "Isabella Freedman Jewish Retreat Center",
        zipCode: 7654,
        capacity: 20,
        image: Images["ic_logo"],
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
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                }
            ]

        },
        meetingrooms: {
            id: "Meeting room",
            name: "Meeting room",
            type: "Meeting room"

        },

        appointments: []
    },
    {
        id: "Saint John’s Abbey",
        name: "Saint John’s Abbey",
        zipCode: 5843,
        capacity: 170,
        image: Images["ic_logo"],
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
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                }
            ]

        },
        meetingrooms: {
            id: "Meeting room",
            name: "Meeting room",
            type: "Meeting room"

        },

        appointments: []
    },
    {
        id: "Abbey of Gethsemani",
        name: "Abbey of Gethsemani",
        zipCode: 2134,
        capacity: 70,
        image: Images["ic_logo"],
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
                    id: "Zipline1",
                    name: "Zipline A",
                    type: "Activity",
                    class: "zipline"
                },
                {
                    id: "CanoeA",
                    name: "Canoe A",
                    type: "Activity",
                    class: "canoe"
                },
                {
                    id: "pool1",
                    name: "Pool A",
                    type: "Activity",
                    class: "pool"
                },
                {
                    id: "paintballA",
                    name: "Paintball A",
                    type: "Activity",
                    class: "paintball"
                }
            ]


        },
        meetingrooms: {
            id: "Meeting room",
            name: "Meeting room",
            type: "Meeting room"

        },
        appointments: []
    },
]

export const leadsSampleData: Array<AppointmentType> = [
    {
        id: "John Doe",
        color: generateColor(),
        groupName: "Doe's group",
        status: "Reserved",
        reservedBy: {
            id: "string",
            firstName: "John",
            lastName: "Doe",
            createdAt: new Date(),
            userCategory: "camper",
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
            firstName: "Jane",
            lastName: "Doe",
            contactNumber: "+639 123 456",
            email: "jane.doe@email.com",
            createdAt: new Date(),
            userCategory: "camper"
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
            firstName: "Mike",
            lastName: "Ross",
            contactNumber: "+639 123 456",
            email: "mike.ross@email.com",
            createdAt: new Date(),
            userCategory: "camper"
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