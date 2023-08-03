import { ArgFunction, HTMLEvent, SetStateType } from '@/types';
import React from 'react'
import styles from "./TextInput.module.css"
type Props = {
    type?: React.HTMLInputTypeAttribute;
    htmlFor?: string;
    label?: string;
    bottomLabel?: string;
    disabled?: boolean;
    placeholder?: string;
    value: string | number;
    setValue?: ArgFunction | VoidFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    autofocus?: boolean;
    onClick?: ArgFunction;
    labelStyle?: React.CSSProperties
    inputStyle?: React.CSSProperties
}
const TextInput = (props: Props) => {
    const {
        type = "text",
        label,
        bottomLabel,
        disabled = false,
        htmlFor = label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName,
        inputClassName,
        labelClassName,
        autofocus,
        labelStyle,
        inputStyle,
        onClick,
    } = props

    return (
        <div style={containerStyle} className={containerClassName}>
            {label ? <><label htmlFor={htmlFor} style={labelStyle} className={labelClassName}>{label}</label><br /></> : null}
            <input
                style={inputStyle}
                onClick={onClick}
                type={type}
                name={htmlFor}
                id={htmlFor}
                value={value}
                autoFocus={autofocus}
                disabled={disabled}
                className={[disabled ? styles.disabledInput : styles.input, inputClassName].join(" ")}
                placeholder={placeholder}
                onChange={setValue}
            />
            {bottomLabel ? <><br /><label htmlFor={htmlFor} style={labelStyle} className={[styles.bottomLabel, labelClassName].join(" ")}>{bottomLabel}</label></> : null}

        </div >
    )
}

export default TextInput