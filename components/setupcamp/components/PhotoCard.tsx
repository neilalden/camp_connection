import { ArgFunction } from '@/types';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import React, { useRef } from 'react'
import styles from "./PhotoCard.module.css"
type Props = {
    alt: string;
    src: string | StaticImport;
    containerClass?: string;
    photoClass?: string;
    containerStyle?: React.CSSProperties
    photoStyle?: React.CSSProperties
    onChange?: ArgFunction;
}
const PhotoCard = (props: Props) => {
    const {
        containerClass,
        photoClass,
        alt,
        src,
        containerStyle,
        photoStyle,
        onChange,
    } = props
    const ref = useRef<HTMLInputElement>(null);
    const handleEditClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };
    return (
        <div className={[styles.photoContainer, containerClass].join(" ")} style={containerStyle}>
            <Image
                className={[styles.photo, photoClass].join(" ")}
                alt={alt}
                src={src}
                height={100}
                width={100}
                style={photoStyle}
            />
            <div className={styles.overlay} onClick={handleEditClick}></div>
            <p className={styles.editText}>Edit</p>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                ref={ref}
                style={{ display: "none" }}
            />

        </div>
    )
}

export default PhotoCard