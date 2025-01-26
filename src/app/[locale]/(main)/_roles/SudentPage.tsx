import Announcement from "@/components/Announcement";
import EventCalendar from "@/components/EventCalendar";
import FullCalendar from "@/components/FullCalendar";
import { Calendar } from "@/components/ui/calendar";

const StudentPage = () => {
  return (
    <main className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* Left */}
      <div className="xl:2-2/3 flex w-full flex-col gap-4">
        <div className="rounded-md bg-accent p-4">
          <h1 className="text-xl font-bold">Schedule (4A)</h1>
          <div className="my-2 h-[650px] rounded-md bg-card p-4">
            <FullCalendar className="h-[600px]" />
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        <Calendar className="w-full" />
        <Announcement />
      </div>
    </main>
  );
};

export default StudentPage;
