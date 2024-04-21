import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-primary flex flex-col justify-stretch h-[100vh]">
      <Navbar />
      <div className="flex gap-10 p-3 items-stretch" style={{ flex: 0.9 }}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
