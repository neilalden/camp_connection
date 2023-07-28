import React, { useState } from 'react'
import styles from "./Modal.module.css"
import { AppointmentType, SetStateType } from '@/types'
import { RetreatCenterType } from '@/utils/sampleData'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '@/common/colors';
type Props = {
    appointment?: AppointmentType | Array<AppointmentType>
    setIsVisible: SetStateType<boolean>
}
const Tabs = [
    "Booking", "Housing", "Meeting", "Activity", "Group", "Journey"
]
const Modal = (props: Props) => {
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
        default:
            return <Housing appointment={appointment} />
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
    return (
        <div>

        </div>
    )
}
const Meeting = ({ appointment }: { appointment: AppointmentType }) => {
    return (
        <div>

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

export default Modal