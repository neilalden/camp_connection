import React from 'react'
import styles from "./Divider.module.css"
type Props = {
    className?: string;
    children?: React.ReactNode;
}

const Divider = (props: Props) => {
    if (!props.children) return <div className={[styles.divider, props.className].join(" ")} />
    else return <div className={[styles.divider, props.className].join(" ")}>{props.children}</div>
}


export default Divider;