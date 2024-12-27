"use client";
import { IoIosMore } from "react-icons/io";
import { MdOutlineBoy, MdOutlineGirl } from "react-icons/md";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "total",
    count: 100,
    fill: "bg-card",
    stroke: "#020817",
  },
  {
    name: "boys",
    count: 90,
    fill: "#3b82f6",
  },
  {
    name: "girls",
    count: 54,
    fill: "#a855f7",
  },
];

const CountChart = () => {
  return (
    <figure className="h-full w-full rounded-lg bg-accent p-4">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <IoIosMore className="size-5 cursor-pointer" />
      </div>
      {/* Chart */}
      <div className="relative h-3/4 w-full">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full p-2">
          <MdOutlineBoy
            size={30}
            className="relative left-2 size-10 text-blue-500 md:size-8 lg:size-10"
          />
          <MdOutlineGirl
            size={30}
            className="relative right-2 size-10 text-purple-500 md:size-8 lg:size-10"
          />
        </div>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="size-5 rounded-full bg-blue-500" />
          <h3 className="font-bold">1345</h3>
          <h4 className="text-xs text-muted-foreground">Boys (55%)</h4>
        </div>
        <div className="flex flex-col gap-1">
          <div className="size-5 rounded-full bg-purple-500" />
          <h3 className="font-bold">1245</h3>
          <h4 className="text-xs text-muted-foreground">Girls (45%)</h4>
        </div>
      </div>
    </figure>
  );
};

export default CountChart;
