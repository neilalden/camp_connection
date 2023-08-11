import { ArgFunction, SetStateType } from '@/types';
import React, { ReactNode } from 'react'
import styles from "./CheckBox.module.css"
type Props = {
    value: boolean;
    name: string;
    onChange: ArgFunction;
    labelClassname?: string;
    label?: string | ReactNode;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    labelTop?: string | ReactNode;
    labelStyle?: React.CSSProperties;
    labelClassName?: string;
}
const CheckBox = (props: Props) => {
    const {
        label,
        value,
        name,
        onChange,
        containerStyle,
        containerClassName,
        labelClassname
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={value}
                onChange={onChange}
                className={styles.input}
            />
            <label htmlFor={name} className={[styles.label, labelClassname].join(" ")}>{label}</label>
        </div >
    )
}

export default CheckBox