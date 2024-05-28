"use client";
import { ThemeProvider } from "@/contexts/app/theme-provider";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppProvider = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default AppProvider;
