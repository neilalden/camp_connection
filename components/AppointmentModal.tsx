import React, { useState } from 'react'
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
    if (!group || !appointment) return null
    const [activeTab, setActiveTab] = useState(Tabs[0])

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
                                    { color: group.color, borderBottom: `2px solid ${group.color}` } : undefined
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
            <div className={styles.progressbarContainer}>
                <CircularProgressbar
                    value={10}
                    text={"10%"}
                    styles={{
                        trail: {
                            strokeWidth: 1
                        },
                        path: {
                            stroke: group.color,
                        }
                    }} />
            </div>

        </div>
    )
}
const Housing = ({ appointment, group }: { appointment: AppointmentType, group: CamperGroupType }) => {
    const dispatch = useDispatch()
    const Buildings = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.housing.buildings)
    const RetreatCenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter)
    const Appointments = useSelector((state: RootState) => state.Appointments.appointments)
    const unassignedGuests = Number(group.groupSize) - (appointment.roomSchedule.reduce((accu, shed) => accu + shed.rooms.reduce((acc, room) => acc + room.capacity, accu), 0) ?? 0)
    return (
        <div className={styles.setUpContainer}>
            <h5 style={{ textAlign: "start", margin: "10px 0" }}>Unassigned guests : {unassignedGuests}</h5>
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
    return (
        <div>

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