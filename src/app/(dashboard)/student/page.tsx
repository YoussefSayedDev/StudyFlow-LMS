import Announcement from "@/components/Announcement";
import EventCalendar from "@/components/EventCalendar";
import FullCalendarComponent from "@/components/FullCalendar";

const StudentPage = () => {
  return (
    <main className="flex flex-col gap-4 p-4 xl:flex-row">
      {/* Left */}
      <div className="xl:2-2/3 flex w-full flex-col gap-4">
        <div className="h-full rounded-md bg-accent p-4">
          <h1 className="text-xl font-bold">Schedule (4A)</h1>
          <div className="my-2 h-[calc(100%-40px)] rounded-md bg-card p-4">
            <FullCalendarComponent />
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        <EventCalendar />
        <Announcement />
      </div>
    </main>
  );
};

export default StudentPage;
