import React, { useState } from 'react'
import styles from "./Modal.module.css"
import { AppointmentType, SetStateType } from '@/types'
import { RetreatCenterType } from '@/utils/sampleData'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '@/common/colors';
type Props = {
    data?: AppointmentType | Array<AppointmentType>
    setIsVisible: SetStateType<boolean>
}
const Tabs = [
    "Booking", "Housing", "Meeting", "Activity", "Group", "Journey"
]
const Modal = (props: Props) => {
    const {
        data,
        setIsVisible = () => { }
    } = props;
    const [activeTab, setActiveTab] = useState(Tabs[0])
    const currentData = Array.isArray(data) ? data[0] : data
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
                    {getComponent(activeTab)}
                </div>
            </div>
        </React.Fragment>
    )
}

const getComponent = (tab: string) => {
    switch (tab) {
        case "Booking":
            return <Booking />
        default:
            return <Housing />
    }
}
const Booking = () => {
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
                            stroke: Colors.green300,
                        }
                    }} />
            </div>

        </div>
    )
}
const Housing = () => {
    return (
        <div>

        </div>
    )
}
const Meeting = () => {
    return (
        <div>

        </div>
    )
}
const Activity = () => {
    return (
        <div>

        </div>
    )
}
const Group = () => {
    return (
        <div>

        </div>
    )
}
const Journey = () => {
    return (
        <div>

        </div>
    )
}

export default Modal