import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function PieChartComp({ screenWidth }) {
  const totalUsers = 1200;

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = [
    ["#5DADE2", "#5DADE2"],
    ["#58D68D", "#58D68D"],
    ["#FADBD8", "#FADBD8"],
    ["#F9E79F", "#F9E79F"],
    ["#D7BDE2", "#D7BDE2"],
  ];

  return (
    <PieChart
      width={screenWidth > 991 ? screenWidth / 5 : screenWidth / 1.5}
      height={
        screenWidth > 1400
          ? screenWidth / 5
          : screenWidth > 991
          ? screenWidth / 3
          : screenWidth > 767
          ? screenWidth / 3
          : screenWidth / 2
      }
    >
      {COLORS.map((gradient, index) => (
        <defs key={`gradient-${index}`}>
          <linearGradient
            id={`gradientColor-${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={gradient[0]} /> {/* Start color */}
            <stop offset="100%" stopColor={gradient[1]} /> {/* End color */}
          </linearGradient>
        </defs>
      ))}
      <Pie
        data={data}
        innerRadius={screenWidth > 991 ? screenWidth / 16 : screenWidth / 10}
        outerRadius={screenWidth > 991 ? screenWidth / 11 : screenWidth / 7}
        fill="#8884d8"
        label={(e) =>
          e.value > 0
            ? e.name + ": " + ((e.value / totalUsers) * 100).toFixed(1) + "%"
            : null
        }
        labelLine={false}
        fontSize={16}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            stroke="none"
            fill={`url(#gradientColor-${index % COLORS.length})`}
          />
        ))}
      </Pie>
      {/* <Tooltip /> */}
    </PieChart>
  );
}
