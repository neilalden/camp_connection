import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./CheckBox.module.css"
type Props = {
    label: string;
    value: boolean;
    onChange: ArgFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const CheckBox = (props: Props) => {
    const {
        label,
        value,
        onChange,
        containerStyle,
        containerClassName
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            <input
                type="checkbox"
                id={label}
                name={label}
                checked={value}
                onChange={onChange}
                className={styles.input}
            />
            <label htmlFor={label} className={styles.label}>{label}</label>
        </div >
    )
}

export default CheckBox