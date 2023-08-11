"use client";
import Images from "@/common/images";
import { Metadata } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// export const metadata: Metadata = {
//     title: "Signin",
//     description: "Signin page of CampConnection"
// }
import { POST } from "@/services/api";

import style from "./forgotpassword.module.css";
const ForgotPass = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: userEmail,
    };
    try {
      const response = await POST(
        "https://www.atsdevs.org/api/forgotPass.php",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={container}>
      <div style={{ height: "100px" }} />
      <Image alt="CampConnection Logo" src={Images.ic_logo} style={logo} />
      <div style={{ height: "100px" }} />
      <form className={style.form} onSubmit={handleSubmit}>
        <p>Forgot Password?</p>
        <input
          type="text"
          className={style.input}
          placeholder="input your registered email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button type="submit" className={style.button}>
          Submit
        </button>
      </form>

      <div style={{ height: "100px" }} />
    </div>
  );
};

const container = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
} as const;

const logo = {
  width: "250px",
  height: "127.89px",
  objectFit: "contain",
} as const;

export default ForgotPass;
