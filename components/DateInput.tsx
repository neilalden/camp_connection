import { ArgFunction, SetStateType } from '@/types';
import React, { ReactNode } from 'react'
import styles from "./DateInput.module.css"
type Props = {
    value: Date;
    setValue?: SetStateType<Date> | ArgFunction;
    htmlFor?: string;
    label?: string | ReactNode;
    name: string;
    placeholder?: string;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
}
const DateInput = (props: Props) => {
    const {
        label,
        name,
        htmlFor = name,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName,
        min,
        max,
        disabled = false,
    } = props
    const convertDateToString = () => {
        if (!value) return "";
        const stringArr = value.toLocaleDateString().split("/")
        const month = stringArr[0].length > 1 ? stringArr[0] : "0" + stringArr[0]
        const day = stringArr[1].length > 1 ? stringArr[1] : "0" + stringArr[1]
        const year = stringArr[2]
        return `${year}-${month}-${day}`
    }
    return (
        <div style={containerStyle} className={containerClassName}>
            <label htmlFor={htmlFor}>{label}</label><br />
            <input
                disabled={disabled}
                type={"date"}
                name={htmlFor}
                id={htmlFor}
                value={convertDateToString()}
                className={styles.input}
                placeholder={placeholder}
                min={min}
                max={max}
                onChange={(e) => setValue && setValue(new Date(e.target.value))}
            />
        </div >
    )
}

export default DateInput