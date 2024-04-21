import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import SearchIcon from "../assets/images/search.svg";
import NavToggleIcon from "../assets/images/nav-toggle.svg";
import SmallSidebar from "./SmallSidebar";

const Navbar = () => {
  const [showSidebar, setshowSidebar] = useState(false);
  const handleToggle = () => {
    setshowSidebar(true);
  };
  const [search, setsearch] = useState("");

  const [events, setevents] = useState([]);
  const [eventsCopy, seteventsCopy] = useState([]);

  useEffect(() => {
    const filteredEvents = eventsCopy.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
    setevents(filteredEvents);
  }, [search]);

  return (
    <div className="bg-white p-3 flex items-center justify-between lg:justify-start">
      <SmallSidebar setshowSidebar={setshowSidebar} showSidebar={showSidebar} />
      <div className="w-[10%] min-w-[35px]">
        <img src={Logo} className="min-w-[35px]" />
      </div>
      <p className="text-2xl font-bold">Welcom Admin</p>
      <button onClick={handleToggle} className="block lg:hidden w-[10%]">
        <img src={NavToggleIcon} />
      </button>
    </div>
  );
};

export default Navbar;
