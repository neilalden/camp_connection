"use client";
import Images from "@/common/images";
import Divider from "@/components/Divider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { userSignUp } from "@/services/redux/slice/user";
import { toast } from "react-toastify";
import TextInput from "@/components/TextInput";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [organization, setOrganization] = useState("");
  const [userType, setUserType] = useState("Administrator");
  const [photo, setPhoto] = useState<string | null>(null);

  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.User.user);

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userData = {
      id: 7643,
      email,
      password,
      firstName,
      middleName,
      lastName,
      contact,
      birthday,
      organization,
      userType,
      photo,
    };
    dispatch(userSignUp({ userData, toast }))
      .then(() => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setContact("");
        setBirthday("");
        setOrganization("");
        setUserType("Administrator");
        setPhoto(null);
      })
      .catch((error: any) => {
        console.error("Error during signup:", error);
      });
  };

  return (
    <form className={styles.form}>
      <TextInput
        type="email"
        label="Email"
        value={email}
        setValue={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        label="Password"
        value={password}
        setValue={(e) => setPassword(e.target.value)}
        containerClassName={styles.input}
      />
      <TextInput
        type="text"
        label="First Name"
        value={firstName}
        setValue={(e) => setFirstName(e.target.value)}
      />
      <TextInput
        type="text"
        label="Middle Name"
        value={middleName}
        setValue={(e) => setMiddleName(e.target.value)}
      />
      <TextInput
        type="text"
        label="Last Name"
        value={lastName}
        setValue={(e) => setLastName(e.target.value)}
      />
      <TextInput
        type="text"
        label="Contact"
        value={contact}
        setValue={(e) => setContact(e.target.value)}
      />
      <TextInput
        type="text"
        label="Birthday"
        value={birthday}
        setValue={(e) => setBirthday(e.target.value)}
      />
      <TextInput
        type="text"
        label="Organization"
        value={organization}
        setValue={(e) => setOrganization(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
        className={styles.input}
      />

      <button type="button" className={styles.button} onClick={handleSignup}>
        Sign up!
      </button>

      <Divider className={styles.divider}>
        <span className={styles.span}>or</span>
      </Divider>
      <button
        type="button"
        className={styles.googleButton}
        onClick={handleSignup}
      >
        <Image
          alt="Google icon"
          src={Images.ic_google}
          className={styles.icon}
        />
        Sign up with Google
      </button>
    </form>
  );
};

export default SignUpForm;
