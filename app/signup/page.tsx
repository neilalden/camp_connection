"use client";
import Images from "@/common/images";
import { Metadata } from "next";
import Image from "next/image";
import React, { useEffect } from "react";
import SignUpForm from "./components/SignUpForm";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";
import { GET } from "@/services/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const metadata: Metadata = {
//     title: "Signin",
//     description: "Signin page of CampConnection"
// }
const SignUpPage = () => {
  useEffect(() => {
    return;
    (async () => {
      const x = await GET("https://www.atsdevs.org/api/book/bookingList.php");
    })();
  }, []);
  return (
    <div style={container}>
      <div style={{ height: "100px" }} />
      <Image alt="CampConnection Logo" src={Images.ic_logo} style={logo} />
      <div style={{ height: "100px" }} />
      <Provider store={store}>
        <SignUpForm />
      </Provider>
      <div style={{ height: "100px" }} />
      <ToastContainer />
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

export default SignUpPage;
