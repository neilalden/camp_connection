import { setUser } from '@/services/redux/slice/user';
import { RootState } from '@/services/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Nav.module.css";
import { clearLeads } from '@/services/redux/slice/leads';
import { clearAppointments } from '@/services/redux/slice/retreatcenters';
const TopNavigation = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const user = useSelector((state: RootState) => state.User.user)
    const logout = () => {
        router.push("/signin")
        dispatch(setUser(undefined))
        dispatch(clearLeads())
        dispatch(clearAppointments())
    }
    if (!user) {
        router.push("/signin");
        return null
    }
    return (
        <nav className={styles.topNav}>
            <h1 className={styles.logo}>CampConnection</h1>
            <button className={styles.profileButton} onClick={logout}>
                <div className={styles.userIcon} />
                <div className={styles.userDetails}>
                    <p className="userName">{String(user.firstName) + String(user.lastName)}</p>
                    <p className="userType">{String(user.userType)}</p>
                    {/* <Link href={`/${user.userCategory}/editprofile`}>Edit profile</Link> */}
                </div>
            </button>
        </nav>
    )
}

export default TopNavigation