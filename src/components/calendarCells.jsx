import React from "react";

function CalendarCells({ currentMonth, selectedDate, setSelectedDate, events }) {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const rows = [];
  let cells = [];
  let day = 1 - firstDayOfMonth;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const currentDate = new Date(year, month, day);
      const formattedDate = currentDate.toISOString().split("T")[0];

      cells.push(
        <div key={day} onClick={() => setSelectedDate(new Date(currentDate))}
          className={`border h-16 flex flex-col items-center justify-center ${
            currentDate.toDateString() === new Date().toDateString() ? "bg-blue-100" : ""
          } ${
            currentDate.toDateString() === selectedDate?.toDateString()
              ? "border-blue-500"
              : "border-gray-300"
          }`}
        >
          {day > 0 && day <= daysInMonth ? (
            <>
              <span className="text-gray-700">{day}</span>
              <div className={`w-2 h-2 ${events[formattedDate] && events[formattedDate].length > 0 ? 'bg-red-500' : ''} rounded-full mt-1`} />
              {console.log(events[formattedDate])}
            </>
          ) : null}
        </div>
      );
      day++;
    }
    rows.push(
      <div key={i} className="grid grid-cols-7">
        {cells}
      </div>
    );
    cells = [];
  }

  return <div>{rows}</div>;
}

export default CalendarCells;
