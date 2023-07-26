import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Images from "@/common/images";
import uploadicon from "../../../assets/userprofile/docicon.png";
import { UsersSampleData } from "@/utils/sampleData";

const CamperProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexCol}>
        <div className={styles.flexRow}>
          <div className={styles.userdetails}>
            <div className={styles.profileImage}>
              <img
                src="https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-1/362247258_997350164798646_8804860415820605887_n.jpg?stp=c55.22.194.193a_dst-jpg_p240x240&_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGsgvY_P03wFxqfxyxEa-MphGACexseN86EYAJ7Gx43zgKKsty84-y8obBEbdE9AJwZN1heDXjHtvxXOucH7_YB&_nc_ohc=an8zLzlckd8AX_Da5jZ&_nc_ht=scontent.fmnl9-4.fna&_nc_e2o=s&oh=00_AfA0fWVrfYbZyetDIPwL8sq2DSBzHZp1rtnAnQ6Ga8tdhw&oe=64BD560C"
                className={styles.profile}
              />
              <span className={styles.editdot}>
                <svg
                  width="6"
                  height="27"
                  viewBox="0 0 6 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2.5625L3 2.57813M3 13.5L3 13.5156M3 24.4375L3 24.4531M3 4.125C1.89543 4.125 1 3.42544 1 2.5625C1 1.69955 1.89543 1 3 1C4.10457 1 5 1.69956 5 2.5625C5 3.42544 4.10457 4.125 3 4.125ZM3 15.0625C1.89543 15.0625 0.999999 14.3629 0.999999 13.5C0.999999 12.6371 1.89543 11.9375 3 11.9375C4.10457 11.9375 5 12.6371 5 13.5C5 14.3629 4.10457 15.0625 3 15.0625ZM3 26C1.89543 26 0.999999 25.3004 0.999999 24.4375C0.999999 23.5746 1.89543 22.875 3 22.875C4.10457 22.875 5 23.5746 5 24.4375C5 25.3004 4.10457 26 3 26Z"
                    stroke="#111827"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className={styles.details}>
              <h3>Neil Alden</h3>
              <address>123 street California, USA</address>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  gap: "10px",
                }}
              >
                <p>+234234</p>
                <span className={styles.dot}></span>
                <p>johndoe@gmail.com</p>
              </div>
              <select className={styles.select}>
                <option value="volvo">Availability</option>
                <option value="saab">Morning</option>
                <option value="mercedes">Afternoon</option>
              </select>
            </div>
          </div>
          <div className={styles.campteams}>
            <div>
              <h3>Camp Team</h3>
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 17H21V15C21 13.3431 19.6569 12 18 12C17.0444 12 16.1931 12.4468 15.6438 13.1429M16 17H6M16 17V15C16 14.3438 15.8736 13.717 15.6438 13.1429M6 17H1V15C1 13.3431 2.34315 12 4 12C4.95561 12 5.80686 12.4468 6.35625 13.1429M6 17V15C6 14.3438 6.12642 13.717 6.35625 13.1429M6.35625 13.1429C7.0935 11.301 8.89482 10 11 10C13.1052 10 14.9065 11.301 15.6438 13.1429M14 4C14 5.65685 12.6569 7 11 7C9.34315 7 8 5.65685 8 4C8 2.34315 9.34315 1 11 1C12.6569 1 14 2.34315 14 4ZM20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7ZM6 7C6 8.10457 5.10457 9 4 9C2.89543 9 2 8.10457 2 7C2 5.89543 2.89543 5 4 5C5.10457 5 6 5.89543 6 7Z"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={styles.campgroup}>
              {usersSampleData.map((user) => (
                <div className={styles.campdetails} key={user.id}>
                  <img src={user.profile} alt="" />
                  <div className={styles.userteam}>
                    <h3>
                      {user.name} <br /> <span>{user.contactNumber}</span>
                    </h3>
                  </div>
                  {user.status}
                </div>
              ))}
            </div>
            <p className={styles.viewMore}>See all</p>
          </div>
        </div>
        <div className={styles.docContainer}>
          <div className={styles.docs}>
            <h3>Uploded Docs</h3>
            <div className={styles.uploaded}>
              <div className={styles.uploadedDoc}>
                <p>Valid ID</p>
                <Image src={uploadicon} alt="set" />
              </div>
              <div className={styles.uploadedDoc}>
                <p>Work Eligibility</p>
                <Image src={uploadicon} alt="set" />
              </div>
              <div className={styles.uploadedDoc}>
                <p>Signed Contracts</p>
                <Image src={uploadicon} alt="set" />
              </div>
              <div className={styles.uploadedDoc}>
                <p>Nutritional Forms</p>
                <Image src={uploadicon} alt="set" />
              </div>
              <div className={styles.uploadedDoc}>
                <p>Valid ID</p>
                <Image src={uploadicon} alt="set" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperProfile;
