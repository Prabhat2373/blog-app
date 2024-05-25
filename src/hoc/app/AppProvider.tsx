import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default AppProvider;
