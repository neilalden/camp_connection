"use client";
import SigninPage from "./signin/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <SigninPage />
    </div>
  );
};

export default App;
