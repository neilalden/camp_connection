import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./DateInput.module.css"
type Props = {
    htmlFor?: string;
    label?: string;
    placeholder?: string;
    value: Date;
    setValue: SetStateType<Date> | ArgFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const DateInput = (props: Props) => {
    const {
        label,
        htmlFor = label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName
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
                type={"date"}
                name={htmlFor}
                id={htmlFor}
                value={convertDateToString()}
                className={styles.input}
                placeholder={placeholder}
                onChange={(e) => setValue(new Date(e.target.value))}
            />
        </div >
    )
}

export default DateInput