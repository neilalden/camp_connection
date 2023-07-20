import { setUser } from '@/services/redux/slice/user';
import { RootState } from '@/services/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Nav.module.css";
import { clearLeads } from '@/services/redux/slice/leads';
import { clearAppointments } from '@/services/redux/slice/appointments';
const TopNavigation = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const user = useSelector((state: RootState) => state.User.user)
    if (!user) router.push("/signin")
    const logout = () => {
        router.push("/signin")
        dispatch(setUser(undefined))
        dispatch(clearAppointments())
        dispatch(clearLeads())
    }
    return (
        <nav className={styles.topNav}>
            <h1 className={styles.logo}>CampConnection</h1>
            <button className={styles.profileButton} onClick={logout}>
                <div className={styles.userIcon} />
                <div className={styles.userDetails}>
                    <p className="userName">{String(user?.firstName) + String(user?.lastName)}</p>
                    <p className="userRole">{user?.role}</p>
                    {/* <Link href={`/${user.userCategory}/editprofile`}>Edit profile</Link> */}
                </div>
            </button>
        </nav>
    )
}

export default TopNavigation