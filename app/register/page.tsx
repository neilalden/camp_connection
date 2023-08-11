import React, { useState } from "react";
import { User } from "@/types";

interface usertype extends User {
  createdAt: Date;
  timezone: string;
  zipcode: string;
  userPic?: string;
  validId?: string;
  workEligibility?: string;
  signContract?: string;
  nutritionalForms: string;
}

const initialUserData: usertype = {
  id: "",
  firstName: "",
  lastName: "",
  userCategory: "camper",
  timezone: "",
  zipcode: "",
  nutritionalForms: "",
  createdAt: new Date(),
};

const Register = () => {
  const [userData, setUserData] = useState<usertype>(initialUserData);
  return <div>Register</div>;
};

export default Register;
