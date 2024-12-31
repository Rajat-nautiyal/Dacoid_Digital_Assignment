import React from "react";
import { Button } from "@/components/ui/button";

function CalendarHeader({ currentMonth, setCurrentMonth }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant="secondary"
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        onClick={() =>
          setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
        }
      >
        Previous
      </Button>
      <h2 className="text-xl font-semibold">
        {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
      </h2>
      <Button
        variant="outline"
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        onClick={() =>
          setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
        }
      >
        Next
      </Button>
    </div>
  );
}

export default CalendarHeader;
