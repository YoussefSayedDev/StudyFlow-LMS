"use client";

import { IoIosMore } from "react-icons/io";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Sun",
    present: 34,
    absent: 43,
  },
  {
    name: "Mon",
    present: 40,
    absent: 24,
  },
  {
    name: "Tue",
    present: 30,
    absent: 13,
  },
  {
    name: "Wed",
    present: 20,
    absent: 98,
  },
  {
    name: "Thu",
    present: 27,
    absent: 39,
  },
];

const AttendanceChart = () => {
  return (
    <figure className="h-full w-full rounded-lg bg-accent p-4">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <IoIosMore className="size-5 cursor-pointer" />
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={25}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              borderColor: "#020817",
              backgroundColor: "#020817",
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
          />
          <Bar dataKey="present" fill="#8884d8" radius={[10, 10, 0, 0]} />
          <Bar dataKey="absent" fill="#82ca9d" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </figure>
  );
};

export default AttendanceChart;
