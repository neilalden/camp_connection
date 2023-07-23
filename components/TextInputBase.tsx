import { ArgFunction, SetStateType } from '@/types';
import React, { HTMLAttributes } from 'react'
import styles from "./TextInputBase.module.css"
import { textInputSetState } from '@/utils/functions';
type Props = {
    type?: string;
    label?: string;
    placeholder?: string;
    value: string | number;
    setValue: SetStateType<string> | ArgFunction;
    containerStyle?: any

}
const TextInputBase = (props: Props) => {
    const {
        type = "text",
        label,
        placeholder,
        value,
        setValue,
        containerStyle
    } = props
    return (
        <div className={containerStyle}>
            <label htmlFor={type}>{label}</label><br />
            <input
                type={type}
                name={type}
                id={type}
                value={value}
                className={styles.input}
                placeholder={placeholder}
                onChange={(e) => textInputSetState(e, setValue)}
            />
        </div >
    )
}

export default TextInputBase