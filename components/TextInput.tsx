import { ArgFunction, HTMLEvent, SetStateType } from '@/types';
import React, { ReactNode } from 'react'
import styles from "./TextInput.module.css"
type Props = {
    type?: React.HTMLInputTypeAttribute;
    htmlFor?: string;
    label?: string | ReactNode;
    bottomLabel?: string;
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    setValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    autofocus?: boolean;
    onClick?: ArgFunction;
    labelStyle?: React.CSSProperties
    inputStyle?: React.CSSProperties
    dataContent?: string
    required?: boolean
}
const TextInput = (props: Props) => {
    const {
        type = "text",
        label,
        bottomLabel,
        disabled = false,
        htmlFor,
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
        dataContent,
        required
    } = props

    return (
        <div style={containerStyle} className={[styles.container, containerClassName].join(" ")} data-content={dataContent}>
            {label ? <label htmlFor={htmlFor} style={labelStyle} className={labelClassName}>{label}</label> : null}
            <input
                required={required}
                style={inputStyle}
                onClick={(e) => onClick ? onClick(e) : e.stopPropagation()}
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