import { ArgFunction, VoidFunction, HTMLEvent, SetStateType, AppointmentType, FilterType } from "@/types"
import { months } from "./variables"

export const getDays = ({ start, end }: { start: Date, end: Date }): Array<Date> => {
    if (start > end) return []
    const days: Array<Date> = []
    while (end > start) {
        days.push(new Date(start))
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

export const filterAppointment = ({ appointment, selectedFilter }: { appointment: AppointmentType, selectedFilter: FilterType }) => {
    if (appointment?.rooms && selectedFilter.type === "Housing") {
        return appointment.rooms.some((room) => room.id === selectedFilter.id || room.buildingId === selectedFilter.id)
    }
    if (appointment?.amenities && selectedFilter.type === "Activity") {
        return appointment.amenities.some((amenity) => amenity.id === selectedFilter.id)
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


export const dateIsScheduled = ({ date, appointments }: { date?: Date; appointments?: Array<AppointmentType> }) => {
    if (!date || !appointments) return undefined;
    let result: Array<AppointmentType> = []
    appointments.map(appointment => {
        if (appointment.checkInDate && appointment.checkOutDate && new Date(new Date(date).setDate(new Date(date).getDate() + 1)) >= new Date(appointment.checkInDate) && date < new Date(appointment.checkOutDate)) {
            if (result === undefined) result = [appointment];
            else result.push(appointment)
        }
    })
    return result.length === 0 ? undefined : result.length > 1 ? result : result[0]
}

export const sortArrayOfObjects = (array: Array<any>, property: string) => {
    return [...array].sort((a: object, b: object) => {
        // @ts-ignore
        if (a[property] < b[property]) {
            return -1;
        }
        // @ts-ignore
        if (a[property] > b[property]) {
            return 1;
        }
        return 0;
    });
};

export const ObjectToArray = (obj: any) => {
    return Object.keys(obj).map((key) => obj[key]);
}


export const getNextMonth = (m: number) => {
    if (m == 11) return 0;
    return m + 1
}
export const getPrevMonth = (m: number) => {
    if (m == 0) return 11;
    return m - 1
}

export const getEndDate = (date: Date) => {
    if (date.getMonth() === 11) return new Date(`${months[0]} 01 ${date.getFullYear() + 1}`)
    else return new Date(`${months[date.getMonth() + 1]} 01 ${date.getFullYear()}`)
}
export const onDragOver = (e: React.DragEvent) => e.preventDefault();

export const isArray = (value: any) => Array.isArray(value)


export const IDGenerator = () => Number(new Date().getTime() + Math.random() + Math.floor(Math.random() * 10000)).toString()