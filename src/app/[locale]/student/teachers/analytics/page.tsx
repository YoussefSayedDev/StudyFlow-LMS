"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for charts
const studentPerformanceData = [
  { name: "Week 1", avgScore: 75 },
  { name: "Week 2", avgScore: 80 },
  { name: "Week 3", avgScore: 78 },
  { name: "Week 4", avgScore: 82 },
  { name: "Week 5", avgScore: 85 },
  { name: "Week 6", avgScore: 88 },
];

const courseCompletionData = [
  { name: "Completed", value: 68 },
  { name: "In Progress", value: 25 },
  { name: "Not Started", value: 7 },
];

const subjectPerformanceData = [
  { subject: "Math", avgScore: 82 },
  { subject: "Science", avgScore: 78 },
  { subject: "English", avgScore: 85 },
  { subject: "History", avgScore: 76 },
  { subject: "Art", avgScore: 90 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function StudentTeachersAnalyticsPage() {
  return (
    <main>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseCompletionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {courseCompletionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgScore" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-primary/10 p-4">
                <h3 className="text-lg font-semibold">Total Students</h3>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <h3 className="text-lg font-semibold">Average Engagement</h3>
                <p className="text-3xl font-bold">87%</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <h3 className="text-lg font-semibold">Overall Satisfaction</h3>
                <p className="text-3xl font-bold">4.7/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
