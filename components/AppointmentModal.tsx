import React, { useState } from 'react'
import styles from "./AppointmentModal.module.css"
import { AppointmentType, BuildingType, RetreatCenterType, SetStateType } from '@/types'
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
type Props = {
    appointment?: AppointmentType | Array<AppointmentType>
    setIsVisible: SetStateType<boolean>
}
const Tabs = [
    "Booking", "Housing", "Meeting", "Activity", "Group", "Journey"
]
const AppointmentModal = (props: Props) => {
    const {
        appointment,
        setIsVisible = () => { }
    } = props;
    if (!appointment) return null;
    if (Array.isArray(appointment)) return null;
    const [activeTab, setActiveTab] = useState(Tabs[0])
    const currentData = Array.isArray(appointment) ? appointment[0] : appointment
    const color = currentData?.color
    const modalContainer: React.CSSProperties = {
        outline: `5px solid ${color}`
    }
    return (
        <React.Fragment>
            <div className={styles.darkBackground} onClick={() => setIsVisible(false)} />
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
                                    { color: color, borderBottom: `2px solid ${color}` } : undefined
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
                    {getComponent(activeTab, appointment)}
                </div>
            </div>
        </React.Fragment>
    )
}

const getComponent = (tab: string, appointment: AppointmentType) => {
    switch (tab) {
        case "Booking":
            return <Booking appointment={appointment} />
        case "Housing":
            return <Housing appointment={appointment} />
        case "Meeting":
            return <Meeting appointment={appointment} />
        case "Activity":
            return <Activity appointment={appointment} />
        case "Group":
            return <Group appointment={appointment} />
        case "Journey":
            return <Journey appointment={appointment} />
        default:
            return <></>
    }
}
const Booking = ({ appointment }: { appointment: AppointmentType }) => {
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
                            stroke: appointment.color,
                        }
                    }} />
            </div>

        </div>
    )
}
const Housing = ({ appointment }: { appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const BUILDINGS = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.housing.buildings)
    return (
        <div className={styles.setUpContainer}>
            {
                BUILDINGS && BUILDINGS.map((building, i) => {
                    return (
                        <BuildingCard key={i} building={building} appointment={appointment} />
                    )
                })
            }
        </div>
    )
}
const Meeting = ({ appointment }: { appointment: AppointmentType }) => {
    const dispatch = useDispatch()
    const MEETINGROOMS = useSelector((state: RootState) => state.RetreatCenters.retreatCenter.meetingRooms)

    return (
        <div className={styles.setUpContainer}>

            <div className={styles.collapsableSection}>
                <h3>Meeting Rooms</h3>
            </div>
            <div className={styles.meetingRoomContainer}>

                {
                    MEETINGROOMS && MEETINGROOMS.map((meetingroom, i) => {
                        return (
                            <MeetingRoomCard key={i} meetingRoom={meetingroom} appointment={appointment} />
                        )
                    })
                }
            </div>
            <div className={styles.legendContainer}>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.occupiedText].join(" ")}><div style={{ outline: `2px solid ${appointment.color}` }} className={styles.occupied} />Occupied</div>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.vacantText].join(" ")}><div className={styles.vacant} />Available</div>
                <div style={{ fontSize: "12px" }} className={[styles.roomButton, styles.unavailableText].join(" ")}><div className={styles.unavailable} />Unavailable</div>
            </div>
        </div>
    )
}
const Activity = ({ appointment }: { appointment: AppointmentType }) => {
    return (
        <div>

        </div>
    )
}
const Group = ({ appointment }: { appointment: AppointmentType }) => {
    return (
        <div>

        </div>
    )
}
const Journey = ({ appointment }: { appointment: AppointmentType }) => {
    return (
        <div>

        </div>
    )
}

export default AppointmentModal