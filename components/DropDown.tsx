import { ArgFunction, SetStateType } from '@/types';
import React, { ReactNode } from 'react'
import styles from "./DropDown.module.css"
export type OptionType = {
    label: string;
    value: string | number;
}
type Props = {
    label?: string | ReactNode;
    options?: Array<OptionType>;
    value?: string;
    setValue: SetStateType<string> | ArgFunction;
    htmlFor?: string;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
    inputStyle?: React.CSSProperties;
    inputClassName?: string;
    disabled?: boolean;
    labelClassName?: string;
    labelStyle?: React.CSSProperties;
    noSelect?: boolean
}
const DropDown = (props: Props) => {
    const {
        options,
        value,
        setValue,
        htmlFor = "",
        label = htmlFor,
        containerStyle,
        containerClassName,
        inputStyle,
        inputClassName,
        labelClassName,
        labelStyle,
        noSelect = false,
        disabled = false
    } = props;
    return (
        <div className={[styles.container, containerClassName].join(" ")} style={containerStyle} >
            {label ? <label htmlFor={htmlFor} style={labelStyle} className={labelClassName}>{label}</label> : null}
            <select style={inputStyle} disabled={disabled} name={htmlFor} id={htmlFor} className={[styles.input, inputClassName].join(" ")} value={value} onChange={(e) => setValue(e.target.value)}>
                {noSelect ? <option value={undefined}>Select {htmlFor}</option> : null}
                {
                    options && options.map((option, i) => (<option key={i} value={option.value}>{option.label}</option>))
                }

            </select>
        </div>
    )
}

export default DropDown