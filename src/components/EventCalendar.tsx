"use client";
import { title } from "process";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosMore } from "react-icons/io";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Event 1",
    time: "10:00 AM - 11:00 AM",
    description: "Event 1 Description",
  },
  {
    id: 2,
    title: "Event 2",
    time: "10:00 AM - 11:00 AM",
    description: "Event 2 Description",
  },
  {
    id: 3,
    title: "Event 3",
    time: "10:00 AM - 11:00 AM",
    description: "Event 3 Description",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <figure className="flex w-full flex-col gap-4 rounded-lg bg-accent p-4">
      <div className="rounded-md bg-card p-4">
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className="flex flex-col gap-2 border border-border">
        <div className="flex items-center justify-between gap-4 px-2">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <IoIosMore className="size-5 cursor-pointer" />
        </div>
        {events.map((event) => (
          <div
            key={event.id}
            className="flex cursor-pointer flex-col gap-2 rounded-lg bg-card p-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-foreground">
                {event.title}
              </h3>
              <span className="text-xs text-muted-foreground">
                {event.time}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{event.description}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};

export default EventCalendar;
