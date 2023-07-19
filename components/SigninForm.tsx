"use client";
import Images from '@/common/images';
import Divider from '@/components/Divider';
import { textInputSetState } from '@/utils/functions';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './SigninForm.module.css'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/services/redux/slice/user';
import { RetreatCenterUserType } from '@/types';
import { RootState } from '@/services/redux/store';

const RetreatCenterUserTestData: RetreatCenterUserType = {
    firstName: "Neil",
    lastName: "Escobin",
    middleName: "Paicaglino",
    birthDate: new Date("07/29/1999"),
    contactNumber: "09976447771",
    email: "escobin.neil@gmail.com",
    organization: "CampConnection",
    role: "Manager",
    createdAt: new Date(),
    userCategory: "retreatcenter"
}

const SigninForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.User.user)

    useEffect(() => { if (user) router.push(`/${user.userCategory}/calendar`) }, [user])

    const handleSignin = () => dispatch(setUser(RetreatCenterUserTestData))

    return (
        <form >
            <br /><label htmlFor="email">Email</label><br />
            <input
                type="email"
                name="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => textInputSetState(e, setEmail)}
            />

            <br /><label htmlFor="password">Password</label><br />
            <input
                type="password"
                name="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => textInputSetState(e, setPassword)}
            />

            <div className={styles.row}>
                <Link href="/forgotpassword"><p>Forgot password</p></Link>
                <Link href="/signup" className={styles.signUpLink}><p>Sign up</p></Link>
            </div>

            <br />
            <button
                type="button"
                className={styles.button}
                onClick={handleSignin}
            >
                Sign in!
            </button>
            <Divider className={styles.divider} ><span className={styles.span}>or</span></Divider>
            <button
                type="button"
                className={styles.googleButton}
                onClick={handleSignin}
            >
                <Image src={Images.ic_google} alt="Google icon" className={styles.icon} />
                Sign in with Google
            </button>
        </form>
    )
}

export default SigninForm;