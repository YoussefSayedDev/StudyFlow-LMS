import { BookOpenCheck } from "lucide-react";
import OverviewCard from "../../_components/OverviewCard";

export default function StudentDashboardPage() {
  return (
    <main className="flex flex-col gap-4 p-4 xl:flex-row">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <OverviewCard
          title="Total Courses"
          icon={<BookOpenCheck />}
          link="courses"
          number={5}
          percentage={15}
        />
        <OverviewCard
          title="Total Courses"
          icon={<BookOpenCheck />}
          link="courses"
          number={5}
          percentage={15}
        />
        <OverviewCard
          title="Total Courses"
          icon={<BookOpenCheck />}
          link="courses"
          number={5}
          percentage={15}
        />
        <OverviewCard
          title="Total Courses"
          icon={<BookOpenCheck />}
          link="courses"
          number={5}
          percentage={15}
        />
      </div>
    </main>
  );
}
