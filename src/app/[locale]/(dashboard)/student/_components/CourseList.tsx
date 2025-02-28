import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenIcon } from "lucide-react";

export default function CourseList() {
  const courses = [
    { name: "Mathematics", code: "MATH101", grade: "A-" },
    { name: "History", code: "HIST201", grade: "B+" },
    { name: "Physics", code: "PHYS102", grade: "A" },
    { name: "Literature", code: "LIT301", grade: "B" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-meduim text-sm">My Courses</CardTitle>
        <BookOpenIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">
                  {course.name}
                </p>
                <p className="text-sm text-muted-foreground">{course.code}</p>
              </div>
              <div className="text-sm font-medium">{course.grade}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
