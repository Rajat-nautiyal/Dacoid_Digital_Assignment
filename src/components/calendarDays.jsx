import React from "react";

function CalendarDays() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="grid grid-cols-7 text-center font-medium mb-2 text-gray-700">
      {days.map((day) => (
        <div key={day} className="py-2">
          {day}
        </div>
      ))}
    </div>
  );
}

export default CalendarDays;
