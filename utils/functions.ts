import { ArgFunction, VoidFunction, HTMLEvent, SetStateType, ReservationType, FilterType } from "@/types"

export const textInputSetState = (e: HTMLEvent<HTMLInputElement>, setState: SetStateType<string>) => {
    setState(e.target.value)
}
export const getDays = ({ start, end }: { start: Date, end: Date }): Array<Date> => {
    if (start > end) return []
    const days: Array<Date> = []
    while (end > start) {
        days.push(start)
        const newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
    }
    return days
}

export const arrayToMap = ({ array, key, convertTo }: { array: Array<any>, key: any, convertTo?: string }): Map<any, any> => {
    if (convertTo) return new Map(array.map(i => [i[key][convertTo](), i]));
    return new Map(array.map(i => [i[key], i]));
}

export const debounce = (func: VoidFunction | ArgFunction, delay = 1000) => {
    let timeout: any;
    return (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args)
        }, delay)
    }
}
export const trunc = (str: string, num = 20, truncString = "...") => {
    if (!str) return str
    if (str.length > num) return str.slice(0, num) + truncString;
    else return str;
}

export const filterReservation = ({ reservation, selectedFilter }: { reservation: ReservationType, selectedFilter: FilterType }) => {
    if (reservation?.rooms && selectedFilter.type === "Housing") {
        return reservation.rooms.some((room) => room.id === selectedFilter.id || room.buildingId === selectedFilter.id)
    }
    if (reservation?.amenities && selectedFilter.type === "Activity") {
        return reservation.amenities.some((amenity) => amenity.id === selectedFilter.id)
    }
    return false
}

export const generateColor = () => {
    const HEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += HEX[Math.floor(Math.random() * HEX.length)];
    }
    return color
};