"use client"
import Images from '@/common/images'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import SigninForm from './components/SigninForm'
import { Provider } from 'react-redux'
import { persistor, store } from '@/services/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// export const metadata: Metadata = {
//     title: "Signin",
//     description: "Signin page of CampConnection"
// }
const SigninPage = () => {
    return (
        <div style={container}>
            <div style={{ height: "100px" }} />
            <Image src={Images.ic_logo} style={logo} alt="CampConnection Logo" />
            <div style={{ height: "100px" }} />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SigninForm />
                </PersistGate>
            </Provider>
            <div style={{ height: "100px" }} />
        </div>
    )
}

const container = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
} as const

const logo = {
    width: "250px",
    height: "127.89px",
    objectFit: "contain",
} as const

export default SigninPage