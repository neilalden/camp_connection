import { ArgFunction, SetStateType } from '@/types';
import React, { ReactNode } from 'react'
import styles from "./TextInput.module.css"
type Props = {
    value?: string | number
    setValue?: ArgFunction;
    htmlFor?: string;
    label?: string | ReactNode;
    placeholder?: string;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string;
    disabled?: boolean;
    name: string;
}
const TimeInput = (props: Props) => {
    const {
        label,
        name,
        htmlFor = name,
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
                onChange={setValue}
            />
        </div >
    )
}

export default TimeInput