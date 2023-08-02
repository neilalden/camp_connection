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
    setValue?: (e: HTMLEvent<HTMLInputElement>) => void;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    autofocus?: boolean;
    onClick?: ArgFunction
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
        onClick
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            {label ? <><label htmlFor={htmlFor} className={labelClassName}>{label}</label><br /></> : null}
            <input
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
            {bottomLabel ? <><br /><label htmlFor={htmlFor} className={[styles.bottomLabel, labelClassName].join(" ")}>{bottomLabel}</label></> : null}

        </div >
    )
}

export default TextInput