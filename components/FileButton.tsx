import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./FileButton.module.css"
import { textInputSetState } from '@/utils/functions';
import Image from 'next/image';
import Images from '@/common/images';
type Props = {
    value?: File;
    text: string;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const FileButton = (props: Props) => {
    const {
        value,
        text,
        containerStyle,
        containerClassName
    } = props
    return (
        <button type="button" style={containerStyle} className={[styles.container, containerClassName].join(" ")}>
            <p className={styles.text}>{text}</p>
            <Image alt='Clip' src={Images.ic_clip} height={15} />
        </button>
    )
}

export default FileButton