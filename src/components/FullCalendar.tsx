"use client";
import { calendarEvents } from "@/lib/data";
import dayGridPlugin from "@fullcalendar/daygrid"; // DayGrid plugin
import interactionPlugin from "@fullcalendar/interaction"; // Interaction plugin
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import timeGridPlugin from "@fullcalendar/timegrid"; // TimeGrid plugin
import React, { useState } from "react";

const FullCalendarComponent = () => {
  const [events, setEvents] = useState(calendarEvents);

  // const handleDateClick = (info: any) => {
  //   alert(`Date clicked: ${info.dateStr}`);
  // };

  // const handleEventClick = (info: any) => {
  //   alert(`Event: ${info.event.title}`);
  // };

  return (
    <FullCalendar
      height="100%"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      events={events}
      // dateClick={handleDateClick}
      // eventClick={handleEventClick}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
    />
  );
};

export default FullCalendarComponent;
