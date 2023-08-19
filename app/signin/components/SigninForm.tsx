"use client";
import Images from "@/common/images";
import Divider from "@/components/Divider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./SigninForm.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSignIn } from "@/services/redux/slice/user";
import { RetreatCenterTeamType } from "@/types";
import { RootState } from "@/services/redux/store";
import TextInput from "@/components/TextInput";
import { IDGenerator } from "@/utils/functions";
import { userSignInType } from "@/types";
import { toast } from "react-toastify";

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.User.user);

  useEffect(() => {
    if (user) router.push(`/campconnection/leads`);
  }, [user]);

  // const handleSignin = () => dispatch(setUser(RetreatCenterUserTestData))
  const handleSignin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userData: userSignInType = {
      email,
      password,
    };
    dispatch(userSignIn({ userData, toast }));
  };
  return (
    <form className={styles.form}>
      <br />
      <br />

      <TextInput
        type="email"
        label="Email"
        value={email}
        setValue={(e) => setEmail(e.target.value)}
      />

      <br />
      <TextInput
        type="password"
        label="Password"
        value={password}
        setValue={(e) => setPassword(e.target.value)}
        containerClassName={styles.input}
      />

      <div className={styles.row}>
        <Link href="/forgotpassword">
          <p>Forgot password</p>
        </Link>
        <Link href="/signup" className={styles.signUpLink}>
          <p>Sign up</p>
        </Link>
      </div>

      <br />
      <button type="button" className={styles.button} onClick={handleSignin}>
        Sign in!
      </button>
      <Divider className={styles.divider}>
        <span className={styles.span}>or</span>
      </Divider>
      <button
        type="button"
        className={styles.googleButton}
        onClick={handleSignin}
      >
        <Image
          alt="Google icon"
          src={Images.ic_google}
          className={styles.icon}
        />
        Sign in with Google
      </button>
    </form>
  );
};

export default SigninForm;
