import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./TextInput.module.css"
import { textInputSetState } from '@/utils/functions';
type Props = {
    htmlFor?: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    value: string;
    setValue: SetStateType<string> | ArgFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const TimeInput = (props: Props) => {
    const {
        label,
        disabled = false,
        htmlFor = label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName
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
                className={disabled ? styles.disabledInput : styles.input}
                placeholder={placeholder}
                onChange={(e) => textInputSetState(e, setValue)}
            />
        </div >
    )
}

export default TimeInput