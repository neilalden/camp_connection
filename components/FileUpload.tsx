import Images from '@/common/images';
import { ArgFunction, FileType, SetStateType } from '@/types';
import Image from 'next/image';
import React from 'react'
import styles from "./FileUpload.module.css"
type Props = {
    label?: string;
    ref?: React.RefObject<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
    inputClassName?: string,
    required?: boolean,
    accept?: string;
}
const FileUpload = (props: Props) => {
    const {
        label,
        ref,
        onChange,
        containerStyle,
        containerClassName,
        inputClassName,
        required = false,
        accept = "image/*",
    } = props
    return (
        <label htmlFor={label} style={containerStyle} className={[styles.container, containerClassName].join(" ")}>
            <input
                type="file"
                accept={accept}
                ref={ref}
                required={required}
                name={label}
                id={label}
                className={[styles.input, inputClassName].join(" ")}
                onChange={onChange}
            />
            <span>{label}</span>
            <Image alt="file upload icon" src={Images.ic_upload} height={10} width={10} style={{ marginLeft: 10 }} />
        </label>
    )
}

export default FileUpload