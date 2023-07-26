import { ArgFunction, FileType, SetStateType } from '@/types';
import React from 'react'
import styles from "./FileUpload.module.css"
import { textInputSetState } from '@/utils/functions';
type Props = {
    label?: string;
    placeholder?: string;
    value?: File;
    setValue: SetStateType<File> | ArgFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const FileUpload = (props: Props) => {
    const {
        label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            <label htmlFor={label}>{label}</label><br />
            <input
                type="file"
                name={label}
                id={label}
                className={styles.input}
                placeholder={placeholder}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { files } = event.target;
                    const selectedFiles = files as FileList;
                    if (selectedFiles.length > 0) setValue(selectedFiles[0])
                }}
            />
        </div >
    )
}

export default FileUpload