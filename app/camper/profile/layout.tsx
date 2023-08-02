"use client";
import SideNavigation from "@/components/SideNavigation";
import TopNavigation from "@/components/TopNavigation";
import { store } from "@/services/redux/store";
import React from "react";
import { Provider } from "react-redux";
import styles from "./styles.module.css";

const Layout = ({ children }: any) => {
    return (
        <Provider store={store}>
            <div className={styles.main}>
                <TopNavigation />
                <div className={styles.content}>
                    <SideNavigation />
                    <div className={styles.mainContent}>{children}</div>
                </div>
            </div>
        </Provider>
    );
};

export default Layout;