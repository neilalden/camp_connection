import React, { CSSProperties } from 'react'
import styles from "./Divider.module.css"
type Props = {
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties
}

const Divider = (props: Props) => {
    if (!props.children) return <div style={props.style} className={[styles.divider, props.className].join(" ")} />
    else return <div style={props.style} className={[styles.divider, props.className].join(" ")}>{props.children}</div>
}


export default Divider;