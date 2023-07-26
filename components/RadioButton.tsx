import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./RadioButton.module.css"
type Props = {
    name: string,
    label: string;
    value: boolean;
    onChange: ArgFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const RadioButton = (props: Props) => {
    const {
        name,
        label,
        value,
        onChange,
        containerStyle,
        containerClassName
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            <input
                type="radio"
                id={name}
                name={name}
                checked={value}
                onChange={onChange}
                className={styles.input}
            />
            <label htmlFor={name} className={styles.label}>{label}</label>
        </div >
    )
}

export default RadioButton