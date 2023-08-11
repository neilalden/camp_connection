import { ArgFunction, SetStateType } from '@/types';
import React, { ReactNode } from 'react'
import styles from "./RadioButton.module.css"
type Props = {
    name: string,
    value: boolean;
    onChange: ArgFunction;
    label?: string | ReactNode;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    labelTop?: string | ReactNode;
    labelStyle?: React.CSSProperties;
    labelClassName?: string;
}
const RadioButton = (props: Props) => {
    const {
        name,
        label,
        value,
        onChange,
        containerStyle,
        containerClassName,
        labelTop,
        labelStyle,
        labelClassName,
    } = props
    return (
        <div style={containerStyle} className={[styles.container, containerClassName].join(" ")}>
            {labelTop ? <><label htmlFor={name} style={labelStyle} className={[styles.labelTop, labelClassName].join(" ")}>{labelTop}</label><br /></> : null}
            <input
                type="radio"
                id={name}
                name={name}
                checked={value}
                onChange={onChange}
                className={styles.input}
            />
            {label ? <label htmlFor={name} className={styles.label}>{label}</label> : null}
        </div >
    )
}

export default RadioButton