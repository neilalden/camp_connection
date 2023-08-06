import React, { useState } from 'react'
import styles from "./Modal.module.css"
import { BedType, SetStateType } from '@/types'
import TextInput from '@/components/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { IDGenerator } from '@/utils/functions'
import { addBedPriceDay, addBedStyle, setBedPrice } from '@/services/redux/slice/retreatcenters'
import Colors from '@/common/colors'
import { RootState } from '@/services/redux/store'
type Props = {
    setIsVisible: SetStateType<boolean>,
    component: React.ReactNode
}
const Modal = (props: Props) => {
    const {
        setIsVisible,
        component
    } = props;
    return (
        <React.Fragment>
            <div className={styles.darkBackground} onClick={() => setIsVisible(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    {component}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modal