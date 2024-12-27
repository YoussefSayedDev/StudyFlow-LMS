import Announcement from "@/components/Announcement";
import AttendanceChart from "@/components/charts/AttendanceChart";
import CountChart from "@/components/charts/CountChart";
import FinanceChart from "@/components/charts/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <main className="flex flex-col gap-4 p-4 md:flex-row">
      {/* Left */}
      <div className="flex w-full flex-col gap-4 lg:w-2/3">
        {/* User Cards */}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* Middle Charts */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Count Chart */}
          <div className="h-[450px] w-full lg:w-1/3">
            <CountChart />
          </div>
          {/* Attendance Chart */}
          <div className="h-[450px] w-full lg:w-2/3">
            <AttendanceChart />
          </div>
        </div>
        {/* Finance Chart */}
        <div className="h-[500px] w-full">
          <FinanceChart />
        </div>
      </div>
      {/* Right */}
      <div className="flex w-full flex-col gap-4 lg:w-1/3">
        <EventCalendar />
        <Announcement />
      </div>
    </main>
  );
};

export default AdminPage;
