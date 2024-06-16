import React, { useState } from "react";
import { AllEvents } from "./calendarOverview";

interface CalendarProps {
  events: AllEvents[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getEventsForDate = (date: any) => {
    if (date) {
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const dateString = localDate.toISOString().split("T")[0];
      return events.filter((event) => {
        const eventDate = new Date(
          event.event_day ?? event.classroom_date ?? event.challenge_day ?? 0
        );
        const localEventDate = new Date(
          eventDate.getFullYear(),
          eventDate.getMonth(),
          eventDate.getDate()
        );
        return localEventDate.toISOString().split("T")[0] === dateString;
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="bg-black text-white p-4 rounded-lg w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="text-white">
            &lt;
          </button>
          <h2 className="text-xl">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={handleNextMonth} className="text-white">
            &gt;
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-center">
              <th className="py-2">Sun</th>
              <th className="py-2">Mon</th>
              <th className="py-2">Tue</th>
              <th className="py-2">Wed</th>
              <th className="py-2">Thu</th>
              <th className="py-2">Fri</th>
              <th className="py-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(Math.ceil((firstDayOfMonth + daysInMonth) / 7))].map(
              (_, weekIndex) => (
                <tr key={weekIndex}>
                  {[...Array(7)].map((_, dayIndex) => {
                    const dayNumber =
                      weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
                    const date = new Date(currentYear, currentMonth, dayNumber);
                    const eventsForDate = getEventsForDate(date);
                    const isCurrentMonth =
                      dayNumber > 0 && dayNumber <= daysInMonth;
                    const isToday =
                      isCurrentMonth &&
                      date.toDateString() === new Date().toDateString();
                    const classNames = `text-center h-10 w-10 py-5 ${
                      !isCurrentMonth ? "text-gray-500" : "text-white"
                    } ${
                      eventsForDate?.some((event) => event.type === "event")
                        ? "bg-green-500"
                        : ""
                    } ${
                      eventsForDate?.some((event) => event.type === "classroom")
                        ? "bg-orange-500"
                        : ""
                    } ${
                      eventsForDate?.some((event) => event.type === "challenge")
                        ? "bg-blue-500"
                        : ""
                    } ${
                      !isToday && isCurrentMonth
                        ? "bg-black hover:bg-gray-700"
                        : ""
                    } ${
                      dayNumber > 0 && dayNumber <= daysInMonth
                        ? "rounded-full"
                        : ""
                    }`;

                    return (
                      <td key={dayIndex} className={classNames.trim()}>
                        {dayNumber > 0 && dayNumber <= daysInMonth && dayNumber}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
