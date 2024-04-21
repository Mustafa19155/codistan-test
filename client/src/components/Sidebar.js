import React from "react";
import DashboardIcon from "../assets/images/dashboard.svg";
import HeartIcon from "../assets/images/heart.svg";
import HeartActiveIcon from "../assets/images/heart-active.svg";
import DashboardActiveIcon from "../assets/images/dashboard-active.svg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="p-2 rounded-full bg-white w-fit hidden lg:block">
      <div className="flex flex-col gap-5">
        <Link to={"/"} className="bg-primary p-2 rounded-full w-fit">
          {pathname == "/" ? (
            <img src={DashboardActiveIcon} />
          ) : (
            <img src={DashboardIcon} />
          )}
        </Link>
        <Link to={"/users"} className="bg-primary p-2 rounded-full w-fit">
          {pathname == "/users" ? (
            <img src={HeartActiveIcon} />
          ) : (
            <img src={HeartIcon} />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
