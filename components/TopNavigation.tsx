import { setUser } from '@/services/redux/slice/user';
import { RootState } from '@/services/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Nav.module.css";
const TopNavigation = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const user = useSelector((state: RootState) => state.User.user)
    const logout = () => {
        router.push('/signin')
        dispatch(setUser(undefined))
    }
    if (!user) return null
    return (
        <nav className={styles.topNav}>
            <h1 className={styles.logo}>CampConnection</h1>
            <button className={styles.profileButton} onClick={logout}>
                <div className={styles.userIcon} />
                <div className={styles.userDetails}>
                    <p className="userName">{user.firstName + user.lastName}</p>
                    <p className="userRole">{user.role}</p>
                    {/* <Link href={`/${user.userCategory}/editprofile`}>Edit profile</Link> */}
                </div>
            </button>
        </nav>
    )
}

export default TopNavigation