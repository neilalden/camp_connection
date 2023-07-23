import React from 'react'
import styles from "./Modal.module.css"
import { AppointmentType, SetStateType } from '@/types'
import { RetreatCenterType } from '@/utils/sampleData'
type Props = {
    data?: AppointmentType | RetreatCenterType | any
    setIsVisible: SetStateType<boolean>
}
const Modal = (props: Props) => {
    const {
        data,
        setIsVisible = () => { }
    } = props
    return (
        <>
            <div className={styles.darkBackground} onClick={() => setIsVisible(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>{
                            data ? JSON.stringify(data) : ""
                        }</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal