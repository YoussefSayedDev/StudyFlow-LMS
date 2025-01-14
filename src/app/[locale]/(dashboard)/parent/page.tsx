import Announcement from "@/components/Announcement";
import FullCalendarComponent from "@/components/FullCalendar";

const ParentPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* Left */}
      <div className="xl:2-2/3 flex w-full flex-col gap-4">
        <div className="h-full rounded-md bg-accent p-4">
          <h1 className="text-xl font-bold">Schedule (John Doe)</h1>
          <div className="my-2 h-[calc(100%-40px)] rounded-md bg-card p-4">
            <FullCalendarComponent />
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        <Announcement />
      </div>
    </main>
  );
};

export default ParentPage;
