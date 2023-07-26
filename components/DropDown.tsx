import { SetStateType } from '@/types';
import React from 'react'
import styles from "./DropDown.module.css"
export type OptionType = {
    label: string;
    value: string | number;
}
type Props = {
    options: Array<OptionType>;
    value: string;
    setValue: SetStateType<string>;
    htmlFor?: string;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
}
const DropDown = (props: Props) => {
    const {
        options,
        value,
        setValue,
        htmlFor = "",
        containerStyle,
        containerClassName } = props;
    return (
        <div style={containerStyle} className={[styles.container, containerClassName].join(" ")}>
            <label htmlFor={htmlFor}>{htmlFor}</label>
            <select name={htmlFor} id={htmlFor} className={styles.input} value={value} onChange={(e) => setValue(e.target.value)}>
                <option value={undefined}>Select {htmlFor}</option>
                {
                    options.map((option, i) => (<option key={i} value={option.value}>{option.label}</option>))
                }

            </select>
        </div>
    )
}

export default DropDown