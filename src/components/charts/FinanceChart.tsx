"use client";
import { IoIosMore } from "react-icons/io";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <figure className="h-full w-full rounded-lg bg-accent p-4">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <IoIosMore className="size-5 cursor-pointer" />
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              borderColor: "#020817",
              backgroundColor: "#020817",
            }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </figure>
  );
};

export default FinanceChart;
