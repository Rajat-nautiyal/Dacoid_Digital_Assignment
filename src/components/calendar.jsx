import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarCells from "./CalendarCells";
import EventPanel from "./EventPanel";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <Card className="p-4 bg-white rounded-md shadow-lg">
      <CalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <CalendarDays />
      <CalendarCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={events}
      />
      <EventPanel selectedDate={selectedDate} events={events} setEvents={setEvents} />
    </Card>
  );
}

export default Calendar;
