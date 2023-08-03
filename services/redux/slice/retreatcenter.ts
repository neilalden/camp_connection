import { AppointmentType, BedType, BuildingType, PricingType, RetreatCenterType, RoomType, CampAreaType, SpotType } from "@/types";
import { IDGenerator } from "@/utils/functions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RetreatCenterStateType = {
    loading: boolean;
    error?: string;
    retreatCenter: RetreatCenterType;
}
export type AddAppointmentPayload = {
    retreatCenterId: RetreatCenterType["id"];
    appointment: AppointmentType
}
export type EditBedStyleName = {
    id: BedType["id"];
    name: BedType["name"];
}
export type EditBedStyleCapacity = {
    id: BedType["id"];
    capacity: BedType["capacity"];
}
const initialState: RetreatCenterStateType = {
    loading: false,
    error: undefined,
    retreatCenter: {
        id: IDGenerator(),
        name: "",
        zipCode: "",
        photo: undefined,
        housing: {
            buildings: [
            ],
            campAreas: [],
        },
        amenities: {},
        appointments: [],
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
        ],
        items: [
            {
                id: IDGenerator(),
                name: "Projector",
                amount: 5
            },
            {
                id: IDGenerator(),
                name: "Office Chairs",
                amount: 50
            },
            {
                id: IDGenerator(),
                name: "Long table",
                amount: 2
            }
        ]
    },
}

export const RetreatCenterSlice = createSlice({
    name: "retreatcenter",
    initialState,
    reducers: {
        setRetreatCenterPhoto: (state, action: PayloadAction<string>) => {
            if (state.retreatCenter) state.retreatCenter.photo = action.payload;
        },
        setBuildings: (state, action: PayloadAction<Array<BuildingType>>) => {
            state.retreatCenter.housing.buildings = action.payload
        },
        setCampAreas: (state, action: PayloadAction<Array<CampAreaType>>) => {
            state.retreatCenter.housing.campAreas = action.payload
        },
        setSpotStyles: (state, action) => {
            state.retreatCenter.spotStyles = action.payload
        },
        setBedStyles: (state, action) => {
            state.retreatCenter.bedStyles = action.payload
        },
        setSpaceSpots: (state, action: PayloadAction<{ campAreaId: CampAreaType["id"], spaces: CampAreaType["spaces"] }>) => {
            const { campAreaId, spaces } = action.payload;
            if (!state.retreatCenter.housing.campAreas) return;
            state.retreatCenter.housing.campAreas = state.retreatCenter.housing.campAreas?.map((campArea) => {
                if (campArea.id === campAreaId) {
                    return {
                        ...campArea,
                        spaces: spaces
                    }
                }
                return campArea
            })

        },
        setRoomBeds: (state, action: PayloadAction<{ buildingId: BuildingType["id"], rooms: BuildingType["rooms"] }>) => {
            const { buildingId, rooms } = action.payload;
            if (!state.retreatCenter.housing.buildings) return;
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) => {
                if (building.id === buildingId) {
                    return {
                        ...building,
                        rooms: rooms
                    }
                }
                return building
            })

        },
        setCampAreaSpaces: (state, action: PayloadAction<{ id: CampAreaType["id"], spaces: CampAreaType["spaces"] }>) => {
            const { id, spaces } = action.payload;
            state.retreatCenter.housing.campAreas = state.retreatCenter.housing.campAreas?.map((campArea) => {
                if (campArea.id === id) {
                    return {
                        ...campArea,
                        spaces: spaces
                    }
                }
                return campArea
            })

        },
        setBuildingRooms: (state, action: PayloadAction<{ id: BuildingType["id"], rooms: BuildingType["rooms"] }>) => {
            const { id, rooms } = action.payload;
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) => {
                if (building.id === id) {
                    return {
                        ...building,
                        rooms: rooms
                    }
                }
                return building
            })

        },
        setCampAreaName: (state, action: PayloadAction<{ id: CampAreaType["id"], name: CampAreaType["name"] }>) => {
            const { id, name } = action.payload
            state.retreatCenter.housing.campAreas = state.retreatCenter.housing.campAreas?.map((campArea) =>
                campArea.id === id ? ({ ...campArea, name: name }) : campArea
            )
        },
        setBuildingName: (state, action: PayloadAction<{ id: BuildingType["id"], name: BuildingType["name"] }>) => {
            const { id, name } = action.payload
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) =>
                building.id === id ? ({ ...building, name: name }) : building
            )
        },
        addCampArea: (state, action: PayloadAction<CampAreaType>) => {
            if (!state.retreatCenter.housing.campAreas) state.retreatCenter.housing.campAreas = [action.payload]
            else state.retreatCenter.housing.campAreas = [...state.retreatCenter.housing.campAreas, action.payload]


        },
        addBuilding: (state, action: PayloadAction<BuildingType>) => {
            if (!state.retreatCenter.housing.buildings) state.retreatCenter.housing.buildings = [action.payload]
            else state.retreatCenter.housing.buildings = [...state.retreatCenter.housing.buildings, action.payload]


        },
        addBedPriceDay: (state, action: PayloadAction<{ id: BedType["id"], price: PricingType }>) => {
            const { id, price } = action.payload
            if (!state.retreatCenter.bedStyles) return;
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) {
                    return {
                        ...bedstyle,
                        pricing: Array.isArray(bedstyle.pricing) ? [...bedstyle.pricing, price] : [bedstyle.pricing, price]
                    }
                }
                return bedstyle
            })
        },
        setBedPrice: (state, action: PayloadAction<{ id: BedType["id"], price: BedType["pricing"] }>) => {
            const { id, price } = action.payload
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) {
                    return {
                        ...bedstyle,
                        pricing: price
                    }
                }
                return bedstyle
            })
        },
        setBedStyle: (state, action: PayloadAction<Array<BedType>>) => {
            state.retreatCenter.bedStyles = action.payload
        },
        addCampAreastyle: (state, action: PayloadAction<SpotType>) => {
            if (!Array.isArray(state.retreatCenter.spotStyles)) {
                state.retreatCenter.spotStyles = [action.payload]
                return;
            }
            state.retreatCenter.spotStyles = [...state.retreatCenter.spotStyles, action.payload]
        },
        addSpotStyle: (state, action) => {
            if (!Array.isArray(state.retreatCenter.spotStyles)) {
                state.retreatCenter.spotStyles = action.payload
                return;
            }
            state.retreatCenter.spotStyles = [...state.retreatCenter.spotStyles, action.payload]
        },
        addBedStyle: (state, action) => {
            if (!Array.isArray(state.retreatCenter.bedStyles)) {
                state.retreatCenter.bedStyles = action.payload
                return;
            }
            state.retreatCenter.bedStyles = [...state.retreatCenter.bedStyles, action.payload]
        },
        addItemType: (state, action) => {
            if (!Array.isArray(state.retreatCenter.items)) {
                state.retreatCenter.items = action.payload
                return;
            }
            state.retreatCenter.items = [...state.retreatCenter.items, action.payload]
        },
        editBedStyleName: (state, action: PayloadAction<EditBedStyleName>) => {
            const { id, name } = action.payload
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) return { ...bedstyle, name: name }
                return bedstyle
            })
        },
        editBedStyleCapacity: (state, action: PayloadAction<EditBedStyleCapacity>) => {
            const { id, capacity } = action.payload
            if (isNaN(capacity)) return console.error("Capacity is not a number")
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) return { ...bedstyle, capacity: capacity }
                return bedstyle
            })
        },
        setRetreatCenterName: (state, action: PayloadAction<string>) => {
            if (!state.retreatCenter) {
                state.retreatCenter = {
                    id: new Date().toString(),
                    name: action.payload,
                    zipCode: "",
                    housing: {},
                    amenities: {},
                    appointments: []
                }
                return
            }
            state.retreatCenter.name = action.payload
        },
        setRetreatCenterZipCode: (state, action: PayloadAction<string>) => {
            if (!state.retreatCenter) {
                return
            }
            state.retreatCenter.zipCode = action.payload
        },
        cancelAppointment: (state, action: PayloadAction<{ appointmentId: AppointmentType["id"] }>) => {
            const { appointmentId } = action.payload;
            if (!state.retreatCenter?.appointments) return;
            state.retreatCenter.appointments = state.retreatCenter?.appointments.filter(appointment => appointment.id !== appointmentId)

        },
        clearAppointments: (state) => {
            if (!state.retreatCenter?.appointments) return;
            state.retreatCenter.appointments = []
        }
    },
});

export const {
    setRetreatCenterName,
    setRetreatCenterZipCode,
    clearAppointments,
    cancelAppointment,
    addBedStyle,
    editBedStyleName,
    editBedStyleCapacity,
    setBedStyle,
    setBedPrice,
    addBedPriceDay,
    addBuilding,
    setBuildingName,
    setBuildingRooms,
    setRoomBeds,
    setBedStyles,
    setCampAreas,
    addCampAreastyle,
    addItemType,
    setBuildings,
    addCampArea,
    setCampAreaName,
    addSpotStyle,
    setCampAreaSpaces,
    setSpaceSpots,
    setSpotStyles,
    setRetreatCenterPhoto
}
    = RetreatCenterSlice.actions
export default RetreatCenterSlice.reducer
