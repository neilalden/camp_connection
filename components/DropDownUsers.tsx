import { CampConnectionTeamUserType, CamperUserType, RetreatCenterUserType, SetStateType } from '@/types';
import React from 'react'
import styles from "./DropDownUsers.module.css"
import Image from 'next/image';
import Images from '@/common/images';
export type UsersOptionType = {
    label: string;
    value: string | number;
    user: CamperUserType | RetreatCenterUserType | CampConnectionTeamUserType
}
type Props = {
    options: Array<UsersOptionType>;
    value?: UsersOptionType
    setValue: SetStateType<UsersOptionType | undefined>;
    htmlFor?: string;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
}
const DropDownUsers = (props: Props) => {
    const {
        options,
        value,
        setValue,
        htmlFor = "",
        containerStyle,
        containerClassName } = props;
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const user = options.find(opt => opt.user.id === e.target.value);
        setValue(user)
    }
    return (
        <div className={[containerClassName].join(" ")}>
            <label htmlFor={htmlFor}>{htmlFor}</label>
            <div style={containerStyle} className={[styles.container].join(" ")}>
                {value ? <div className={styles.profileContainer}>
                    <Image
                        width={50}
                        height={50}
                        className={styles.userPhoto}
                        alt={value.user.firstName}
                        src={value.user.photo ?? Images.ic_logo}
                    />
                    <div>
                        <p className={styles.userName}>{`${value.user.firstName} ${value.user.lastName} • ${value.user.userType}`}</p>
                        <p className={styles.userType}>{`${value.user.contactNumber}`}</p>
                    </div>
                </div> : null}
                <select name={htmlFor} id={htmlFor} className={styles.input} value={""} onChange={onChange} >
                    <option value=""></option>
                    {
                        options.map((option, i) => (<option key={i} value={option.value}>{option.label}</option>))
                    }
                </select>
            </div>
        </div>
    )
}

export default DropDownUsers