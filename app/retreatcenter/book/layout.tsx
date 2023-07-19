"use client"
import SideNavigation from '@/components/SideNavigation'
import TopNavigation from '@/components/TopNavigation'
import { persistor, store } from '@/services/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import styles from "./styles.module.css"

const Layout = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.main}>
          <TopNavigation />
          <div className={styles.content}>
            <SideNavigation />
            <div className={styles.mainContent}>{children}</div>
          </div>
        </div>
      </PersistGate>
    </Provider >
  )
}


export default Layout