import React, { useEffect, useState } from 'react'
import styles from "./AppointmentModal.module.css"
import { AppointmentType, BuildingType, CamperGroupType, RetreatCenterType, SetStateType } from '@/types'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '@/common/colors';
import HousingSetup from './setupcamp/components/HousingSetup';
import { useDispatch, useSelector } from 'react-redux';
import { setBuildings } from '@/services/redux/slice/retreatcenters';
import { RootState } from '@/services/redux/store';
import BuildingCard from './BuildingCard';
import TextInput from './TextInput';
import Images from '@/common/images';
import Image from 'next/image';
import MeetingRoomCard from './MeetingRoomCard';
import { setCurrentLead } from '@/services/redux/slice/leads';
import { setCurrentCamperGroup } from '@/services/redux/slice/campergroups';
import { months } from '@/utils/variables';
import { getNumberWithOrdinal, trunc } from '@/utils/functions';
import ActivityCard from './ActivityCard';
type Props = {
    setIsVisible: SetStateType<boolean>
}
const Tabs = [
    "Booking", "Housing", "Meeting", "Activity", "Group", "Journey"
]
const AppointmentModal = (props: Props) => {
    const {
        setIsVisible = () => { }
    } = props;
    const dispatch = useDispatch()
    const group = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    const appointment = useSelector((state: RootState) => state.Leads.currentLead)
    const [activeTab, setActiveTab] = useState(Tabs[0])
    if (!group || !appointment) return null
    const modalContainer: React.CSSProperties = {
        outline: `5px solid ${group.color}`
    }
    return (
        <div>
            <div className={styles.darkBackground} onClick={() => {
                dispatch(setCurrentLead(undefined))
                dispatch(setCurrentCamperGroup(undefined))
                setIsVisible(false)
            }} />
            <div className={styles.centered}>
                <div
                    className={styles.modal}
                    style={modalContainer}
                >
                    <div className={styles.tabContainer}>
                        {
                            Tabs.map((tab) => {
                                const className = activeTab === tab ? styles.activeTab : styles.tab
                                const style = activeTab === tab ?
                                    { color: group.color, bborderBottom: `2px solid ${group.color}`, } : undefined
                                return (
                                    <button
                                        key={tab}
                                        type='button'
                                        className={className}
                                        style={style}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div >
                        {getComponent(activeTab, appointment, group)}
                    </div>
                </div>
            </div>
        </div>
    )
}

const getComponent = (tab: string, appointment: AppointmentType, group: CamperGroupType) => {
    switch (tab) {
        case "Booking":
            return <Booking appointment={appointment} group={group} />
        case "Housing":
            return <Housing appointment={appointment} group={group} />
        case "Meeting":
            return <Meeting appointment={appointment} group={group} />
        case "Activity":
            return <Activity appointment={appointment} group={group} />
        case "Group":
            return <Group appointment={appointment} group={group} />
        case "Journey":
            return <Journey appointment={appointment} group={group} />
        default:
            return <></>
    }
}
const Booking = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    return (
        <div className={styles.container}>

        </div>
    )
}
const Housing = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    const dispatch = useDispatch()
    const Buildings = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.housing.buildings)
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead)
    const CurrentGroup = useSelector((state: RootState) => state.CamperGroups.currentCamperGroup)
    if (!CurrentAppointment || !CurrentAppointment.checkInDate || !CurrentAppointment.checkOutDate) return null
    const CheckInDate = new Date(CurrentAppointment.checkInDate);
    const CheckOutDate = new Date(CurrentAppointment.checkOutDate);
    // @ts-ignore 
    const otherAppointments = Appointments.filter((a) => (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate) || new Date(CurrentAppointment.checkOutDate) <= new Date(a?.checkInDate)) && a.id !== CurrentAppointment.id)
    const unassignedGuests = Number(CurrentGroup?.groupSize) - Number(CurrentAppointment?.roomSchedule.reduce((accu, shed) => accu + shed.rooms.reduce((acc, room) => acc + room.capacity, accu), 0))

    return (
        <div className={styles.setUpContainer}>
            <div className="row-between">

                <h5 style={{ textAlign: "start", margin: "10px 0" }}>Unassigned guests : {unassignedGuests}</h5>

                <h5 style={{ textAlign: "start", margin: "10px 0" }}>{trunc(months[CheckInDate.getMonth()], 3, "")}/{getNumberWithOrdinal(CheckInDate.getDate())} - {trunc(months[CheckOutDate.getMonth()], 3, "")}/{getNumberWithOrdinal(CheckOutDate.getDate())}</h5>
            </div>
            {
                Buildings && Buildings.map((building, i) => {
                    return (
                        <BuildingCard key={i} building={building} appointment={appointment} />
                    )
                })
            }
        </div>
    )
}
const Meeting = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    const dispatch = useDispatch()
    const MEETINGROOMS = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.meetingRooms)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead)

    return (
        <div className={styles.setUpContainer}>
            {
                MEETINGROOMS && MEETINGROOMS.map((meetingroom, i) =>
                    <MeetingRoomCard key={i} meetingRoom={meetingroom} appointment={appointment} />
                )
            }
        </div>
    )
}
const Activity = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    const Activities = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.amenities.activities)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const CurrentAppointment = useSelector((state: RootState) => state.Leads.currentLead)
    if (!CurrentAppointment || !CurrentAppointment.checkInDate || !CurrentAppointment.checkOutDate) return null
    const CheckInDate = new Date(CurrentAppointment.checkInDate);
    const CheckOutDate = new Date(CurrentAppointment.checkOutDate);
    // @ts-ignore 
    const otherAppointments = Appointments.filter((a) => (new Date(CurrentAppointment.checkInDate) <= new Date(a?.checkOutDate) || new Date(CurrentAppointment.checkOutDate) <= new Date(a?.checkInDate)) && a.id !== CurrentAppointment.id)
    const unassignedGuests = Number(group.groupSize) - (appointment.roomSchedule.reduce((accu, shed) => accu + shed.rooms.reduce((acc, room) => acc + room.capacity, accu), 0) ?? 0)
    const checkInSplit = CheckInDate.toLocaleDateString().split("/")
    const checkOutSplit = CheckOutDate.toLocaleDateString().split("/")
    // @ts-ignore 
    const checkInMonth = trunc(months[checkInSplit?.at(0)], 3, "")
    const checkInDay = Number(checkInSplit?.at(1))
    // @ts-ignore 
    const checkOutMonth = trunc(months[checkOutSplit?.at(0)], 3, "")
    const checkOutDay = Number(checkOutSplit?.at(1))
    return (
        <div>
            {
                Activities && Activities.map((activity, i) =>
                    <ActivityCard key={i} activity={activity} appointment={appointment} />
                )
            }
        </div>
    )
}
const Group = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    return (
        <div>

        </div>
    )
}
const Journey = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    return (
        <div>

        </div>
    )
}

export default AppointmentModal