import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./TextInput.module.css"
type Props = {
    value?: string | number
    setValue?: SetStateType<string | number | undefined> | ArgFunction;
    htmlFor?: string;
    label?: string;
    placeholder?: string;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string;
    disabled?: boolean
}
const TimeInput = (props: Props) => {
    const {
        label,
        htmlFor = label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName,
        inputClassName,
        disabled = false
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            {label ? <><label htmlFor={htmlFor}>{label}</label><br /></> : null}
            <input
                type={"time"}
                name={htmlFor}
                id={htmlFor}
                value={value}
                disabled={disabled}
                className={[disabled ? styles.disabledInput : styles.input, inputClassName].join(" ")}
                placeholder={placeholder}
                onChange={(e) => setValue && setValue(e.target.value)}
            />
        </div >
    )
}

export default TimeInput