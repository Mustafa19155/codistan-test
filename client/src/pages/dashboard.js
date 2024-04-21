import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import AreaChart from "../components/AreaChart";
import WaveIcon from "../assets/images/waveIcon.svg";

const Dashboard = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between gap-[20px] max-[1400px]:block">
        <div className="dashboard-top text-white flex justify-between items-center gap-[20px] mt-[20px] max-[991px]:block flex-1">
          <div className="flex h-[100px] justify-between items-center px-[1.75rem] py-[4rem] mb-5 break-all bg-clip-border w-full bg-[#3b76ef] rounded-lg">
            <div>
              <h4 className="text-lg">Total Users</h4>
              <h2 className="text-2xl font-bold">100 Users</h2>
            </div>
            <img
              src={WaveIcon}
              className="w-[30%] max-w-[100px] min-w-[50px]"
            />
          </div>
          <div className="flex h-[100px] justify-between items-center px-[1.75rem] py-[4rem] mb-5 break-all bg-clip-border w-full bg-[#63c7ff] rounded-lg">
            <div>
              <h4 className="text-lg">Total Ads</h4>
              <h2 className="text-2xl font-bold">200 Ads</h2>
            </div>
            <img
              src={WaveIcon}
              className="w-[30%] max-w-[100px] min-w-[50px]"
            />
          </div>
        </div>
        <div className="dashboard-top text-white flex justify-between items-center gap-[20px] mt-[20px] max-[991px]:block flex-1">
          <div className="flex h-[100px] justify-between items-center px-[1.75rem] py-[4rem] mb-5 break-all bg-clip-border w-full bg-[#a66dd4] rounded-lg">
            <div>
              <h4 className="text-lg">Total Bookings</h4>
              <h2 className="text-2xl font-bold">350 Bookings</h2>
            </div>
            <img
              src={WaveIcon}
              className="w-[30%] max-w-[100px] min-w-[50px]"
            />
          </div>
          <div className="flex h-[100px] justify-between items-center px-[1.75rem] py-[4rem] mb-5 break-all bg-clip-border w-full bg-[#6dd4b1] rounded-lg">
            <div>
              <h4 className="text-lg">Total Queries</h4>
              <h2 className="text-2xl font-bold">50 Queries</h2>
            </div>
            <img
              src={WaveIcon}
              className="w-[30%] max-w-[100px] min-w-[50px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-10 flex-wrap lg:flex-nowrap  ">
        <div className="lg:h-[500px] bg-white rounded-lg w-full p-10">
          <h2 className="mb-5 font-bold text-xl text-center">
            Users Joined Last 7 Days
          </h2>
          <div className="relative left-[-40px] flex justify-center">
            <AreaChart screenWidth={screenWidth} />
          </div>
        </div>

        <div className="lg:h-[500px] overflow-visible relative max-[1400px]:top-[-0.3rem] bg-white rounded-lg w-full p-10">
          <h2 className="mb-5 font-bold text-xl text-center">
            Query Variations
          </h2>
          <div className="users-age-chart-wrapper flex justify-center">
            <PieChart screenWidth={screenWidth} />
          </div>
        </div>
      </div>
      {/* <PieChart screenWidth={screenWidth} />
      <AreaChart screenWidth={screenWidth} /> */}
    </div>
  );
};

export default Dashboard;
