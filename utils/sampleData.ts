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
import { generateColor, getDays, IDGenerator } from "./functions";
import { URL } from "url";
import Images from "@/common/images";
export const FacilitiesSampleData: FacilitiesType = {
  housing: {
    buildings: [
      {
        id: "buildingA",
        name: "Building A",
        rooms: [
          {
            id: "buildingAlevel1room1",
            name: "room101",
            beds: [{
              id: IDGenerator(),
              name: "Bunk Bed",
              amount: 2,
              capacity: 4,
              pricing: {
                nights: "*",
                price: 100
              }
            }],
            available: true,
            capacity: (2 * 4)
          },
          {
            id: "buildingAlevel1room2",
            name: "room102",
            beds: [{
              id: IDGenerator(),
              name: "Bunk Bed",
              amount: 2,
              capacity: 4,
              pricing: {
                nights: "*",
                price: 100
              }
            }],
            available: true,
            capacity: (2 * 4)
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
        class: "Zipline",
        available: true,
        capacity: 10,
      },
      {
        id: "CanoeA",
        name: "Canoe A",
        class: "Canoe",
        available: true,
        capacity: 10,
      },
      {
        id: "pool1",
        name: "Pool A",
        class: "Pool",
        available: true,
        capacity: 10,
      },
      {
        id: "paintballA",
        name: "Paintball A",
        class: "Paintball",
        available: true,
        capacity: 10,
      },
    ],
  },
  meetingRooms: [{
    id: "Meeting room",
    name: "Meeting room",
    capacity: 100,
    available: true
  }],
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
    photo: "",
    zipCode: "",
    capacity: 30,
    activityStyles: [],
    spotStyles: [
      {
        id: IDGenerator(),
        name: "RV Spot",
        capacity: 10,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Tent Spot",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    bedStyles: [
      {
        id: IDGenerator(),
        name: "Bunk Bed",
        capacity: 2,
        amount: 5,
        pricing: {
          nights: "*",
          price: 50
        }
      },
      {
        id: IDGenerator(),
        name: "Queen Bed",
        capacity: 3,
        amount: 5,
        pricing: {
          nights: "*",
          price: 90
        }
      },
      {
        id: IDGenerator(),
        name: "King Bed",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Single Bed",
        capacity: 1,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],

    itemStyles: [
      {
        id: IDGenerator(),
        name: "T.V.",
        amount: 5
      },
      {
        id: IDGenerator(),
        name: "Office Chairs",
        amount: 50
      },
      {
        id: IDGenerator(),
        name: "Long Table",
        amount: 2
      }
    ],
    housing: {
      buildings: [
      ],
    },
    amenities: {
      activities: [
      ],
    },
    meetingRooms: [],
    appointments: [],
    diagramStyles: [],
  },
  {
    id: "Art of Living Retreat Center",
    name: "Art of Living Retreat Center",
    zipCode: "",
    capacity: 50,
    activityStyles: [],

    itemStyles: [
      {
        id: IDGenerator(),
        name: "T.V.",
        amount: 5
      },
      {
        id: IDGenerator(),
        name: "Office Chairs",
        amount: 50
      },
      {
        id: IDGenerator(),
        name: "Long Table",
        amount: 2
      }
    ],
    photo: "",
    spotStyles: [
      {
        id: IDGenerator(),
        name: "RV Spot",
        capacity: 10,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Tent Spot",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    bedStyles: [
      {
        id: IDGenerator(),
        name: "Bunk Bed",
        capacity: 2,
        amount: 5,
        pricing: {
          nights: "*",
          price: 50
        }
      },
      {
        id: IDGenerator(),
        name: "Queen Bed",
        capacity: 3,
        amount: 5,
        pricing: {
          nights: "*",
          price: 90
        }
      },
      {
        id: IDGenerator(),
        name: "King Bed",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Single Bed",
        capacity: 1,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    housing: {
      buildings: [
      ],
    },
    amenities: {
      activities: [
      ],
    },
    meetingRooms: [],
    appointments: [],
    diagramStyles: [],
  },
  {
    id: "Marianist Family Retreat Center",
    name: "Marianist Family Retreat Center",
    zipCode: "",
    capacity: 100,
    photo: "",
    activityStyles: [],

    itemStyles: [
      {
        id: IDGenerator(),
        name: "T.V.",
        amount: 5
      },
      {
        id: IDGenerator(),
        name: "Office Chairs",
        amount: 50
      },
      {
        id: IDGenerator(),
        name: "Long Table",
        amount: 2
      }
    ],
    housing: {
      buildings: [
      ],
    },
    amenities: {
      activities: [
      ],
    },
    meetingRooms: [],
    appointments: [],
    diagramStyles: [],
    spotStyles: [
      {
        id: IDGenerator(),
        name: "RV Spot",
        capacity: 10,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Tent Spot",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    bedStyles: [
      {
        id: IDGenerator(),
        name: "Bunk Bed",
        capacity: 2,
        amount: 5,
        pricing: {
          nights: "*",
          price: 50
        }
      },
      {
        id: IDGenerator(),
        name: "Queen Bed",
        capacity: 3,
        amount: 5,
        pricing: {
          nights: "*",
          price: 90
        }
      },
      {
        id: IDGenerator(),
        name: "King Bed",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Single Bed",
        capacity: 1,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
  },
  {
    id: "Isabella Freedman Jewish Retreat Center",
    name: "Isabella Freedman Jewish Retreat Center",
    zipCode: "7654",
    capacity: 20,
    photo: "",
    activityStyles: [],

    itemStyles: [
      {
        id: IDGenerator(),
        name: "T.V.",
        amount: 5
      },
      {
        id: IDGenerator(),
        name: "Office Chairs",
        amount: 50
      },
      {
        id: IDGenerator(),
        name: "Long Table",
        amount: 2
      }
    ],
    housing: {
      buildings: [
      ],
    },
    amenities: {
      activities: [
      ],
    },
    meetingRooms: [],
    appointments: [],
    diagramStyles: [],
    spotStyles: [
      {
        id: IDGenerator(),
        name: "RV Spot",
        capacity: 10,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Tent Spot",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    bedStyles: [
      {
        id: IDGenerator(),
        name: "Bunk Bed",
        capacity: 2,
        amount: 5,
        pricing: {
          nights: "*",
          price: 50
        }
      },
      {
        id: IDGenerator(),
        name: "Queen Bed",
        capacity: 3,
        amount: 5,
        pricing: {
          nights: "*",
          price: 90
        }
      },
      {
        id: IDGenerator(),
        name: "King Bed",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Single Bed",
        capacity: 1,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
  },
  {
    id: "Saint John’s Abbey",
    name: "Saint John’s Abbey",
    zipCode: "5843",
    capacity: 170,
    activityStyles: [],
    photo: "",
    spotStyles: [
      {
        id: IDGenerator(),
        name: "RV Spot",
        capacity: 10,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Tent Spot",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    bedStyles: [
      {
        id: IDGenerator(),
        name: "Bunk Bed",
        capacity: 2,
        amount: 5,
        pricing: {
          nights: "*",
          price: 50
        }
      },
      {
        id: IDGenerator(),
        name: "Queen Bed",
        capacity: 3,
        amount: 5,
        pricing: {
          nights: "*",
          price: 90
        }
      },
      {
        id: IDGenerator(),
        name: "King Bed",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Single Bed",
        capacity: 1,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    housing: {
      buildings: [
      ],
    },
    amenities: {
      activities: [
      ],
    },
    meetingRooms: [],
    appointments: [],

    itemStyles: [
      {
        id: IDGenerator(),
        name: "T.V.",
        amount: 5
      },
      {
        id: IDGenerator(),
        name: "Office Chairs",
        amount: 50
      },
      {
        id: IDGenerator(),
        name: "Long Table",
        amount: 2
      }
    ],
    diagramStyles: []
  },
  {
    id: "Abbey of Gethsemani",
    name: "Abbey of Gethsemani",
    zipCode: "2134",
    capacity: 70,
    activityStyles: [],
    photo: "",
    spotStyles: [
      {
        id: IDGenerator(),
        name: "RV Spot",
        capacity: 10,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Tent Spot",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    bedStyles: [
      {
        id: IDGenerator(),
        name: "Bunk Bed",
        capacity: 2,
        amount: 5,
        pricing: {
          nights: "*",
          price: 50
        }
      },
      {
        id: IDGenerator(),
        name: "Queen Bed",
        capacity: 3,
        amount: 5,
        pricing: {
          nights: "*",
          price: 90
        }
      },
      {
        id: IDGenerator(),
        name: "King Bed",
        capacity: 4,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
      {
        id: IDGenerator(),
        name: "Single Bed",
        capacity: 1,
        amount: 5,
        pricing: {
          nights: "*",
          price: 100
        }
      },
    ],
    housing: {
      buildings: [
      ],
    },
    amenities: {
      activities: [
      ],
    },
    meetingRooms: [],
    appointments: [],

    itemStyles: [
      {
        id: IDGenerator(),
        name: "T.V.",
        amount: 5
      },
      {
        id: IDGenerator(),
        name: "Office Chairs",
        amount: 50
      },
      {
        id: IDGenerator(),
        name: "Long Table",
        amount: 2
      }
    ],
    diagramStyles: []
  },
];

// export const appointmentsSampleData: Array<AppointmentType> = [
//   {
//     id: "appointment1",
//     reservedBy: {
//       id: "string",
//       firstName: "Jane",
//       lastName: "Doe",
//       contactNumber: "+639 123 456",
//       email: "jane.doe@email.com",
//       createdAt: new Date(),
//       userCategory: "camper",
//     },
//     groupSize: 12,
//     color: Colors.green300,
//     groupName: "Jane's group",
//     status: "Reserved",
//     checkInDate: new Date("July 05 2023"),
//     checkOutDate: new Date("July 10 2023"),
//     checkInDays: 3,
//     createdAt: new Date(),
//     amenities: [
//       {
//         id: "pool1",
//         name: "pool",
//       },
//       {
//         id: "hiking1",
//         name: "hiking",
//       },
//     ],
//     meals: [],
//     rooms: [],
//   },
//   {
//     id: "appointment2",
//     groupName: "Pearson Hardman",
//     reservedBy: {
//       id: "2",
//       firstName: "Mike",
//       lastName: "Ross",
//       contactNumber: "+639 123 456",
//       email: "mike.ross@email.com",
//       createdAt: new Date(),
//       userCategory: "camper",
//     },
//     groupSize: 12,
//     color: Colors.red400,
//     status: "Booked",
//     checkInDate: new Date("July 06 2023"),
//     checkOutDate: new Date("July 14 2023"),
//     checkInDays: 7,
//     amenities: [],
//     meals: [],
//     rooms: [
//     ],
//     createdAt: new Date(),
//   },
// ];

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
