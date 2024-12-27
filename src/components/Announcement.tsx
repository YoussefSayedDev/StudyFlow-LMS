const data = [
  {
    id: 1,
    title: "Announcement 1",
    time: "10:00 AM - 11:00 AM",
    description: "Announcement 1 Description",
  },
  {
    id: 2,
    title: "Announcement 2",
    time: "10:00 AM - 11:00 AM",
    description: "Announcement 2 Description",
  },
  {
    id: 3,
    title: "Announcement 3",
    time: "10:00 AM - 11:00 AM",
    description: "Announcement 3 Description",
  },
];
const Announcement = () => {
  return (
    <figure className="flex w-full flex-col gap-4 rounded-lg bg-accent p-4">
      <div className="flex items-center justify-between gap-4 px-2">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <span className="cursor-pointer text-xs text-gray-400 transition-colors duration-300 hover:text-foreground">
          View All
        </span>
      </div>
      <div className="flex flex-col gap-2 border border-border">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer flex-col gap-2 rounded-lg bg-card p-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};

export default Announcement;
