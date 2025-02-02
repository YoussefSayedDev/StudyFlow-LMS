import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BellIcon } from "lucide-react";

export default function Announcements() {
  const announcements = [
    { title: "Exam Schedule Released", date: "2023-05-15", priority: "high" },
    {
      title: "Campus Event: Science Fair",
      date: "2023-05-20",
      priority: "medium",
    },
    { title: "Library Hours Extended", date: "2023-05-18", priority: "low" },
    {
      title: "New Course Registration Open",
      date: "2023-05-22",
      priority: "high",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex-low flex items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Latest Announcements
        </CardTitle>
        <BellIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcements, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "size-2 rounded-full",
                  getPriorityColor(announcements.priority),
                )}
              />
              <div className="ml-4 flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {announcements.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {announcements.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
