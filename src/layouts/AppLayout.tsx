import Header from "@/component/layout/Header";
import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
