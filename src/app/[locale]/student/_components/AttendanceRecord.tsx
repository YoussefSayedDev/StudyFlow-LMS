"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheckIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function AttendanceRecord() {
  const attendance = {
    present: 45,
    absent: 3,
    late: 2,
  };

  const total = attendance.present + attendance.absent + attendance.late;
  const attendancePercentage = ((attendance.present / total) * 100).toFixed(1);

  const data = [
    { name: "Present", value: attendance.present },
    { name: "Absent", value: attendance.absent },
    { name: "Late", value: attendance.late },
  ];

  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Attendance Record</CardTitle>
        <UserCheckIcon className="size-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{attendancePercentage}%</div>
        <p className="text-xs text-muted">Overall attendance</p>
        <div className="mt-4 h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Present</span>
            <span className="font-bold">{attendance.present}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Absent</span>
            <span className="font-bold text-red-500">{attendance.absent}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Late</span>
            <span className="font-bold text-yellow-500">{attendance.late}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
