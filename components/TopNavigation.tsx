"use client";
import { setUser } from "@/services/redux/slice/user";
import { RootState } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Nav.module.css";
import { clearLeads } from "@/services/redux/slice/leads";
import { addRetreatCenter, clearAppointments, setRetreatCenterPhoto } from "@/services/redux/slice/retreatcenters";
import Image from "next/image";
import Images from "@/common/images";
import { IDGenerator, trunc } from "@/utils/functions";
import { RetreatCenterType } from "@/types";
import { setRetreatCenter } from "@/services/redux/slice/retreatcenters";
const TopNavigation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.User.user);
  const userProfile = useSelector((state: RootState) => state.User.user?.photo);
  const campPhoto = useSelector((state: RootState) => state.RetreatCenters.retreatCenter?.photo);
  const retreatcenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
  const retreatcenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenter);
  const [showRetreatCenters, setShowRetreatCenters] = useState(false)

  const logout = () => {
    router.push("/signin");
    dispatch(setUser(undefined));
    dispatch(clearLeads());
    dispatch(clearAppointments());
  };
  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <nav className={styles.topNav}>
      {showRetreatCenters ?
        <div className="darkBackground" onClick={() => setShowRetreatCenters(false)} />
        : null}
      {campPhoto ? (
        <div className={styles.logoContainer} onClick={() => setShowRetreatCenters(prev => !prev)}>
          <Image
            src={campPhoto ? campPhoto : Images["ic_logo"]}
            height={200}
            width={200}
            alt="Company Logo"
            className={styles.companyLogo}
          />
          <h1 style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#d8e189",
          }}>&nbsp;{showRetreatCenters ? "▴" : "▾"}</h1>
        </div>
      ) : (
        <div className={styles.logoTextContainer} onClick={() => setShowRetreatCenters(prev => !prev)}>
          <h1 className={styles.logo}>
            {retreatcenter?.name !== ""
              ? retreatcenter?.name
              : "CampConnection"}
            {showRetreatCenters ? " ▴" : " ▾"}
          </h1>
        </div>
      )}
      {
        showRetreatCenters ?
          <div className={styles.retreatCentersContainer}>
            {
              retreatcenters.map((rc) => {
                return (
                  <button
                    type="button"
                    className={styles.campOptionContainer}
                    onClick={() => { dispatch(setRetreatCenter(rc)); setShowRetreatCenters(false) }}
                  >
                    {rc.photo ? <Image alt="camp logo" height={200} width={200} className={styles.campOptionImage} src={rc.photo ? rc.photo : Images["ic_logo"]} /> :
                      <div className={styles.campOptionImage} />}
                    <div>
                      <h3>{trunc(rc.name, 20)}</h3>
                      <p>{rc.state}</p>
                    </div>
                  </button>)
              })
            }
            {/* <button
              type="button"
              className={styles.addRetreatCenterButton}
              onClick={() => dispatch(addRetreatCenter(retreatcenterinitialdata))}
            >+</button> */}
          </div>
          : null
      }

      <Image
        alt={user.firstName}
        src={Images.ic_logo}
        width={115}
        className={styles.ccLogo}
      />
      <button className={styles.profileButton} onClick={logout}>
        <Image
          alt={user.firstName}
          src={userProfile ? userProfile : Images.ic_user_profile}
          height={50}
          width={50}
          className={styles.userIcon}
        />
      </button>
    </nav>
  );
};
export default TopNavigation;
