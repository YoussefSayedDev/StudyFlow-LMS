import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function DailySchedule() {
  const schedule = [
    {
      time: "09:00 AM",
      subject: "Mathematics",
      room: "Room 101",
      type: "Lecture",
    },
    { time: "11:00 AM", subject: "History", room: "Room 203", type: "Seminar" },
    {
      time: "01:00 PM",
      subject: "Lunch Break",
      room: "Cafeteria",
      type: "Break",
    },
    { time: "02:00 PM", subject: "Physics", room: "Lab 3", type: "Lab" },
    {
      time: "04:00 PM",
      subject: "English Literature",
      room: "Room 105",
      type: "Discussion",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Today&apos;s Schedule
        </CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-16 text-sm text-muted-foreground">
                {item.time}
              </div>
              <div className="ml-4 flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.subject}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.room} | {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
