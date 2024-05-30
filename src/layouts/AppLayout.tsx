import Header from "@/component/layout/Header";
import MainLayout from "@/component/layout/MainLayout";
import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div>
      {/* <Header />
      {children} */}
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default AppLayout;
