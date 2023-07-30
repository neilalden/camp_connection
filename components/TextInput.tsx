import { ArgFunction, HTMLEvent, SetStateType } from '@/types';
import React from 'react'
import styles from "./TextInput.module.css"
type Props = {
    type?: React.HTMLInputTypeAttribute;
    htmlFor?: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    value: string | number;
    setValue: (e: HTMLEvent<HTMLInputElement>) => void;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string
}
const TextInput = (props: Props) => {
    const {
        type = "text",
        label,
        disabled = false,
        htmlFor = label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName,
        inputClassName
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            {label ? <><label htmlFor={htmlFor}>{label}</label><br /></> : null}
            <input
                type={type}
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

export default TextInput