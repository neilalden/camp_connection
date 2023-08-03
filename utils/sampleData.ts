import Colors from "@/common/colors";
import {
  FilterType,
  AppointmentType,
  MealType,
  CampConnectionTeamUserType,
  CamperUserType,
  RetreatCenterUserType,
  BedType,
  ItemType,
  RoomType,
  FacilitiesType,
  RetreatCenterType,
} from "@/types";
import { generateColor, getDays } from "./functions";
import { URL } from "url";
import Images from "@/common/images";
export const FacilitiesSampleData: FacilitiesType = {
  housing: {
    buildings: [
      {
        id: "buildingA",
        name: "Building A",
        type: "Housing",
        rooms: [
          {
            id: "buildingAlevel1room1",
            name: "room101",
            beds: []
          },
          {
            id: "buildingAlevel1room2",
            name: "room102",
            beds: []
          },
        ],
      },
    ],
  },
  amenities: {
    activities: [
      {
        id: "Zipline1",
        name: "Zipline A",
        type: "Activity",
        class: "zipline",
      },
      {
        id: "CanoeA",
        name: "Canoe A",
        type: "Activity",
        class: "canoe",
      },
      {
        id: "pool1",
        name: "Pool A",
        type: "Activity",
        class: "pool",
      },
      {
        id: "paintballA",
        name: "Paintball A",
        type: "Activity",
        class: "paintball",
      },
    ],
  },
  meetingRooms: {
    id: "Meeting room",
    name: "Meeting room",
    type: "Meeting room",
  },
  appointments: [],
};

export const DaysSampleData = getDays({
  start: new Date("July 01 2023"),
  end: new Date("August 01 2023"),
});

export const UsersSampleData: Array<
  CamperUserType | RetreatCenterUserType | CampConnectionTeamUserType
> = [
    {
      photo: "https://thispersondoesnotexist.com/",
      firstName: "John",
      lastName: "Doe",
      id: "1",
      createdAt: new Date(),
      userCategory: "retreatcenter",
      userType: "Sales",
      contactNumber: "+123 456 789",
      email: "John.Doe@campconnetion.net",
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
      email: "Mike.Ross@campconnetion.net",
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
      email: "Jessica.Pearson@campconnetion.net",
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
      email: "Louis.Litt@campconnetion.net",
    },
  ];

export const ArrayRCSD: Array<RetreatCenterType> = [
  {
    id: "Eatern Point Retreat House",
    name: "Eatern Point Retreat House",
    state: "California",
    image: Images["ic_logo"],
    zipCode: "2143",
    capacity: 30,
    housing: {
      buildings: [
        {
          id: "buildingA",
          name: "Building A",
          type: "Housing",
          // levels: [
          //   {
          //     id: "buildingAlevel1",
          //     name: "Level 1",
          //     rooms: [
          //       {
          //         id: "buildingAlevel1room1",
          //         name: "room101",
          //         singleBed: 4,
          //       },
          //       {
          //         id: "buildingAlevel1room2",
          //         name: "room102",
          //         singleBed: 2,
          //         doubleBed: 2,
          //       },
          //     ],
          //   },
          //   {
          //     id: "buildingAlevel2",
          //     name: "Level 2",
          //     rooms: [
          //       {
          //         id: "level2room1",
          //         name: "room201",
          //         queenBed: 2,
          //       },
          //       {
          //         id: "level2room2",
          //         name: "room202",
          //         queenBed: 2,
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    amenities: {
      activities: [
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
      ],
    },
    meetingRooms: {
      id: "Meeting room",
      name: "Meeting room",
      type: "Meeting room",
    },
    appointments: [],
  },
  {
    id: "Art of Living Retreat Center",
    name: "Art of Living Retreat Center",
    zipCode: "5678",
    capacity: 50,
    image: Images["ic_logo"],
    housing: {
      buildings: [
        {
          id: "buildingA",
          name: "Building A",
          type: "Housing",
          // levels: [
          //   {
          //     id: "buildingAlevel1",
          //     name: "Level 1",
          //     rooms: [
          //       {
          //         id: "buildingAlevel1room1",
          //         name: "room101",
          //         singleBed: 4,
          //       },
          //       {
          //         id: "buildingAlevel1room2",
          //         name: "room102",
          //         singleBed: 2,
          //         doubleBed: 2,
          //       },
          //     ],
          //   },
          //   {
          //     id: "buildingAlevel2",
          //     name: "Level 2",
          //     rooms: [
          //       {
          //         id: "level2room1",
          //         name: "room201",
          //         queenBed: 2,
          //       },
          //       {
          //         id: "level2room2",
          //         name: "room202",
          //         queenBed: 2,
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    amenities: {
      activities: [
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
      ],
    },
    meetingRooms: {
      id: "Meeting room",
      name: "Meeting room",
      type: "Meeting room",
    },

    appointments: [],
  },
  {
    id: "Marianist Family Retreat Center",
    name: "Marianist Family Retreat Center",
    zipCode: "8234",
    capacity: 100,
    image: Images["ic_logo"],
    housing: {
      buildings: [
        {
          id: "buildingA",
          name: "Building A",
          type: "Housing",
          // levels: [
          //   {
          //     id: "buildingAlevel1",
          //     name: "Level 1",
          //     rooms: [
          //       {
          //         id: "buildingAlevel1room1",
          //         name: "room101",
          //         singleBed: 4,
          //       },
          //       {
          //         id: "buildingAlevel1room2",
          //         name: "room102",
          //         singleBed: 2,
          //         doubleBed: 2,
          //       },
          //     ],
          //   },
          //   {
          //     id: "buildingAlevel2",
          //     name: "Level 2",
          //     rooms: [
          //       {
          //         id: "level2room1",
          //         name: "room201",
          //         queenBed: 2,
          //       },
          //       {
          //         id: "level2room2",
          //         name: "room202",
          //         queenBed: 2,
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    amenities: {
      activities: [
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
      ],
    },
    meetingRooms: {
      id: "Meeting room",
      name: "Meeting room",
      type: "Meeting room",
    },

    appointments: [],
  },
  {
    id: "Isabella Freedman Jewish Retreat Center",
    name: "Isabella Freedman Jewish Retreat Center",
    zipCode: "7654",
    capacity: 20,
    image: Images["ic_logo"],
    housing: {
      buildings: [
        {
          id: "buildingA",
          name: "Building A",
          type: "Housing",
          // levels: [
          //   {
          //     id: "buildingAlevel1",
          //     name: "Level 1",
          //     rooms: [
          //       {
          //         id: "buildingAlevel1room1",
          //         name: "room101",
          //         singleBed: 4,
          //       },
          //       {
          //         id: "buildingAlevel1room2",
          //         name: "room102",
          //         singleBed: 2,
          //         doubleBed: 2,
          //       },
          //     ],
          //   },
          //   {
          //     id: "buildingAlevel2",
          //     name: "Level 2",
          //     rooms: [
          //       {
          //         id: "level2room1",
          //         name: "room201",
          //         queenBed: 2,
          //       },
          //       {
          //         id: "level2room2",
          //         name: "room202",
          //         queenBed: 2,
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    amenities: {
      activities: [
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
      ],
    },
    meetingRooms: {
      id: "Meeting room",
      name: "Meeting room",
      type: "Meeting room",
    },

    appointments: [],
  },
  {
    id: "Saint John’s Abbey",
    name: "Saint John’s Abbey",
    zipCode: "5843",
    capacity: 170,
    image: Images["ic_logo"],
    housing: {
      buildings: [
        {
          id: "buildingA",
          name: "Building A",
          type: "Housing",
          // levels: [
          //   {
          //     id: "buildingAlevel1",
          //     name: "Level 1",
          //     rooms: [
          //       {
          //         id: "buildingAlevel1room1",
          //         name: "room101",
          //         singleBed: 4,
          //       },
          //       {
          //         id: "buildingAlevel1room2",
          //         name: "room102",
          //         singleBed: 2,
          //         doubleBed: 2,
          //       },
          //     ],
          //   },
          //   {
          //     id: "buildingAlevel2",
          //     name: "Level 2",
          //     rooms: [
          //       {
          //         id: "level2room1",
          //         name: "room201",
          //         queenBed: 2,
          //       },
          //       {
          //         id: "level2room2",
          //         name: "room202",
          //         queenBed: 2,
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    amenities: {
      activities: [
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
      ],
    },
    meetingRooms: {
      id: "Meeting room",
      name: "Meeting room",
      type: "Meeting room",
    },

    appointments: [],
  },
  {
    id: "Abbey of Gethsemani",
    name: "Abbey of Gethsemani",
    zipCode: "2134",
    capacity: 70,
    image: Images["ic_logo"],
    housing: {
      buildings: [
        {
          id: "buildingA",
          name: "Building A",
          type: "Housing",
          // levels: [
          //   {
          //     id: "buildingAlevel1",
          //     name: "Level 1",
          //     rooms: [
          //       {
          //         id: "buildingAlevel1room1",
          //         name: "room101",
          //         singleBed: 4,
          //       },
          //       {
          //         id: "buildingAlevel1room2",
          //         name: "room102",
          //         singleBed: 2,
          //         doubleBed: 2,
          //       },
          //     ],
          //   },
          //   {
          //     id: "buildingAlevel2",
          //     name: "Level 2",
          //     rooms: [
          //       {
          //         id: "level2room1",
          //         name: "room201",
          //         queenBed: 2,
          //       },
          //       {
          //         id: "level2room2",
          //         name: "room202",
          //         queenBed: 2,
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    amenities: {
      activities: [
        {
          id: "Zipline1",
          name: "Zipline A",
          type: "Activity",
          class: "zipline",
        },
        {
          id: "CanoeA",
          name: "Canoe A",
          type: "Activity",
          class: "canoe",
        },
        {
          id: "pool1",
          name: "Pool A",
          type: "Activity",
          class: "pool",
        },
        {
          id: "paintballA",
          name: "Paintball A",
          type: "Activity",
          class: "paintball",
        },
      ],
    },
    meetingRooms: {
      id: "Meeting room",
      name: "Meeting room",
      type: "Meeting room",
    },
    appointments: [],
  },
];

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
      userCategory: "camper",
    },
    groupSize: 12,
    color: Colors.green300,
    groupName: "Jane's group",
    status: "Reserved",
    checkInDate: new Date("July 05 2023"),
    checkOutDate: new Date("July 10 2023"),
    checkInDays: 3,
    createdAt: new Date(),
    amenities: [
      {
        id: "pool1",
        name: "pool",
      },
      {
        id: "hiking1",
        name: "hiking",
      },
    ],
    meals: [],
    rooms: [],
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
      userCategory: "camper",
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
    ],
    createdAt: new Date(),
  },
];

export const RetreatCenterUserData: RetreatCenterUserType = {
  photo: "https://thispersondoesnotexist.com/",
  firstName: "John",
  lastName: "Doe",
  middleName: "Doe",
  id: "1",
  createdAt: new Date(),
  userCategory: "retreatcenter",
  userType: "Sales",
  position: "Assistant",
  contactNumber: "+123 456 789",
  email: "John.Doe@campconnetion.net",
};
