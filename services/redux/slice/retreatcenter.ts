import { AppointmentType, BedType, PricingType, RoomType } from "@/types";
import { IDGenerator } from "@/utils/functions";
import { ArrayRCSD, BuildingType, FacilitiesType, RetreatCenterType } from "@/utils/sampleData";
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
        housing: {
            buildings: [
            ]
        },
        amenities: {},
        appointments: [],
        bedStyles: [
            {
                id: IDGenerator(),
                name: "King Bed",
                capacity: 4,
                amount: 0,
                pricing: {
                    nights: "*",
                    price: 100
                }
            },
            {
                id: IDGenerator(),
                name: "Queen Bed",
                capacity: 3,
                amount: 0,
                pricing: {
                    nights: "*",
                    price: 90
                }
            },
            {
                id: IDGenerator(),
                name: "Single Bed",
                capacity: 1,
                amount: 0,
                pricing: {
                    nights: "*",
                    price: 50
                }
            }
        ],
        items: []
    },
}

export const RetreatCentersSlice = createSlice({
    name: "retreatcenter",
    initialState,
    reducers: {
        setBedStyles: (state, action) => {
            state.retreatCenter.bedStyles = action.payload
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
        setBuildingNumberRooms: (state, action: PayloadAction<{ id: BuildingType["id"], rooms: number }>) => {
            const { id, rooms } = action.payload;
            if (isNaN(rooms) || rooms < 0) return
            const roomObject = {
                id: IDGenerator(),
                name: "",
                beds: []
            }
            const roomArray = Array(Number(rooms)).fill(roomObject)
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) => {
                if (building.id === id) {
                    return {
                        ...building,
                        rooms: roomArray.map((room, i) => (
                            {
                                ...room,
                                id: IDGenerator(),
                                name: `Room 1${i + 1 > 9 ? i + 1 : "0" + (i + 1)}`,
                                beds: []
                            }
                        ))
                    }
                }
                return building
            })
        },
        setBuildingName: (state, action: PayloadAction<{ id: BuildingType["id"], name: BuildingType["name"] }>) => {
            const { id, name } = action.payload
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) =>
                building.id === id ? ({ ...building, name: name }) : building
            )
        },
        addHouse: (state, action: PayloadAction<BuildingType>) => {
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
        addBedStyle: (state, action) => {
            if (!Array.isArray(state.retreatCenter.bedStyles)) {
                state.retreatCenter.bedStyles = action.payload
                return;
            }
            state.retreatCenter.bedStyles = [...state.retreatCenter.bedStyles, action.payload]
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
    addHouse,
    setBuildingName,
    setBuildingNumberRooms,
    setBuildingRooms,
    setRoomBeds,
    setBedStyles
}
    = RetreatCentersSlice.actions
