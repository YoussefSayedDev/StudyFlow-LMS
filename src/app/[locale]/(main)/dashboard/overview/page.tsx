import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, BookOpen, CalendarDays, Trophy } from "lucide-react";
import { StudentOverviewCard } from "../../_components/StudentOverviewCard";

export default function StudentOverviewPage() {
  // Mock data - in a real application, this would come from an API or database
  const studentName = "Alex Johnson";
  const overallProgress = 68;
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      progress: 75,
      grade: "B+",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      progress: 60,
      grade: "B",
    },
    { id: 3, title: "Web Development Fundamentals", progress: 90, grade: "A-" },
  ];
  const assignments = [
    {
      id: 1,
      title: "CS101 Final Project",
      dueDate: "2023-12-15",
      progress: 30,
    },
    {
      id: 2,
      title: "Algorithm Analysis Paper",
      dueDate: "2023-11-30",
      progress: 80,
    },
    {
      id: 3,
      title: "Personal Portfolio Website",
      dueDate: "2023-12-05",
      progress: 65,
    },
  ];
  const recentGrades = [
    { id: 1, title: "Midterm Exam - CS101", grade: "88%" },
    { id: 2, title: "Data Structures Quiz", grade: "92%" },
    { id: 3, title: "Web Dev Assignment 3", grade: "95%" },
  ];
  const upcomingEvents = [
    {
      id: 1,
      title: "Group Project Meeting",
      date: "2023-11-28",
      time: "14:00",
    },
    { id: 2, title: "CS101 Office Hours", date: "2023-11-29", time: "10:00" },
    { id: 3, title: "Career Fair", date: "2023-12-01", time: "09:00" },
  ];
  const announcements = [
    { id: 1, title: "Campus Closure - Thanksgiving", date: "2023-11-23" },
    { id: 2, title: "Winter Break Schedule", date: "2023-12-20" },
  ];
  const achievements = [
    {
      id: 1,
      title: "Perfect Attendance",
      description: "Attended all classes for a month",
    },
    {
      id: 2,
      title: "Top Performer",
      description: "Highest grade in Data Structures midterm",
    },
  ];

  return (
    <div className="container mx-auto p-2 pt-0">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            You&apos;ve completed {overallProgress}% of your coursework
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-6">
          <h2 className="flex items-center text-2xl font-semibold">
            <BookOpen className="mr-2 h-6 w-6" />
            Your Courses
          </h2>
          {courses.map((course) => (
            <StudentOverviewCard
              key={course.id}
              title={course.title}
              type="course"
              progress={course.progress}
              grade={course.grade}
            />
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="flex items-center text-2xl font-semibold">
            <Bell className="mr-2 h-6 w-6" />
            Upcoming Assignments
          </h2>
          {assignments.map((assignment) => (
            <StudentOverviewCard
              key={assignment.id}
              title={assignment.title}
              type="assignment"
              progress={assignment.progress}
              dueDate={assignment.dueDate}
            />
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="flex items-center text-2xl font-semibold">
            <Trophy className="mr-2 h-6 w-6" />
            Recent Grades
          </h2>
          {recentGrades.map((grade) => (
            <StudentOverviewCard
              key={grade.id}
              title={grade.title}
              type="grade"
              grade={grade.grade}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingEvents.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <span>{event.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {event.date} at {event.time}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {announcements.map((announcement) => (
                <li
                  key={announcement.id}
                  className="flex items-center justify-between"
                >
                  <span>{announcement.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {announcement.date}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button size="lg">View Full Academic Report</Button>
      </div>
    </div>
  );
}
