"use client"
import Images from '@/common/images'
import { RootState } from '@/services/redux/store';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation"
import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./Nav.module.css"
const SideNavigation = () => {
    const pathname = usePathname();
    const currentPage = pathname.split("/").at(-1)
    const sideNavs: Array<{ id: string; name: string; img: string; }> = [
        {
            id: "calendar",
            name: "Calendar",
            img: currentPage === "calendar" ? Images["ic_calendar_white"] : Images["ic_calendar"]
        },
        {
            id: "dashboard",
            name: "Dashboard",
            img: currentPage === "dashboard" ? Images["ic_dashboard_white"] : Images["ic_dashboard"]
        },
        {
            id: "sales",
            name: "Sales",
            img: currentPage === "sales" ? Images["ic_dollar_white"] : Images["ic_dollar"]
        },
        {
            id: "tasks",
            name: "Tasks",
            img: currentPage === "tasks" ? Images["ic_task_checked_white"] : Images["ic_task_checked"]
        },
        {
            id: "contacts",
            name: "Contacts",
            img: currentPage === "contacts" ? Images["ic_contact_white"] : Images["ic_contact"]
        },
        {
            id: "tickets",
            name: "Tickets",
            img: currentPage === "tickets" ? Images["ic_ticket_white"] : Images["ic_ticket"]
        },
        {
            id: "book",
            name: "Book",
            img: currentPage === "book" ? Images["ic_book_white"] : Images["ic_book"]
        },
    ]
    const router = useRouter()
    const user = useSelector((state: RootState) => state.User.user)
    if (!user) return null;
    return (
        <nav className={styles.sideNav}>
            <div className={styles.sideNavButtons}>
                {sideNavs.map((nav, i) => {
                    return (
                        <button key={i} className={currentPage == nav.id ? styles.buttonActive : styles.button} onClick={() => router.push(`/${user.userCategory}/${nav.id}`)}><Image src={nav.img} height={20} style={{ objectFit: "cover" }} alt={`${nav.name} icon`} /><p className={currentPage === nav.id ? styles.navTextActive : styles.navText}>{nav.name}</p></button>
                    )
                })}
            </div>
            <button className={currentPage == "settings" ? styles.settingsButtonActive : styles.settingsButton}><Image src={currentPage == "settings" ? Images.ic_settings_white : Images.ic_settings} height={20} style={{ objectFit: "cover" }} alt={"Settings icon"} onClick={() => router.push(`/${user.userCategory}/settings`)} /><p className={currentPage === "settings" ? styles.navTextActive : styles.navText}>{"Settings"}</p></button>
        </nav>
    )
}

export default SideNavigation