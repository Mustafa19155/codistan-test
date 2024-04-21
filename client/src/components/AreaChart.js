import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Label,
} from "recharts";

export default function AreaChartComp({ usersData, screenWidth }) {
  const [data, setdata] = useState([
    {
      username: "user1",
      subscribersCount: 100,
    },
    {
      username: "user2",
      subscribersCount: 200,
    },
    {
      username: "user3",
      subscribersCount: 150,
    },
    {
      username: "user4",
      subscribersCount: 300,
    },
    {
      username: "user5",
      subscribersCount: 400,
    },
  ]);

  return (
    <div>
      <AreaChart
        className="left-[30px]"
        width={
          screenWidth > 991
            ? screenWidth / 2.3
            : screenWidth > 767
            ? screenWidth / 1.3
            : screenWidth / 1.1
        }
        height={
          screenWidth > 1400
            ? screenWidth / 5
            : screenWidth > 991
            ? screenWidth / 4
            : screenWidth > 767
            ? screenWidth / 3
            : screenWidth / 2
        }
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(137, 146, 226,1)" />
            <stop offset="50%" stopColor="rgba(137, 146, 226,0.5)" />
            <stop offset="100%" stopColor="rgba(137, 146, 226,0.1)" />
          </linearGradient>{" "}
        </defs>

        <XAxis dataKey="username" tickLine={false} axisLine={false} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
        <Area
          type="monotone"
          dataKey="subscribersCount"
          stroke={`#0177fd`}
          strokeWidth={3}
          fill={`url(#gradientColor`}
        />
      </AreaChart>
    </div>
  );
}
