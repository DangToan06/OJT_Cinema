import { useMemo } from "react";

type PropType = {
  activeDate: string;
  getDateFilter: (d: string) => void;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function ReleaseDate({ activeDate, getDateFilter }: PropType) {
  const dates = useMemo(() => {
    const arr = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      arr.push(formatDate(nextDate));
    }
    return arr;
  }, []);

  return (
    <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
      {dates.map((dateStr) => (
        <button
          key={dateStr}
          onClick={() => getDateFilter(dateStr)}
          className={`px-4 py-2 rounded-lg border transition whitespace-nowrap ${
            activeDate === dateStr
              ? "bg-red-500 border-red-500 text-white"
              : "border-gray-500 text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          {dateStr}
        </button>
      ))}
    </div>
  );
}
