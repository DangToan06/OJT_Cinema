import { useState, useEffect } from "react";
import axios from "axios";
import red from "../assets/red.png";
import { useNavigate } from "react-router-dom";
type Movie = {
  id: 0;
  title: "";
  origin: "";
  release: "";
  duration: "";
  genre: "";
  age: "";
  poster: "";
  time: [];
  author: "";
  actor: "";
  description: "";
};
export default function MovieCalendar() {
  const navigate = useNavigate();
  const dates = ["12-11-2024", "13-11-2024", "14-11-2024", "15-11-2024"];

  const [activeDate, setActiveDate] = useState("12-11-2024");

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/choosingItem")
      .then((res) => setMovies(res.data));
  }, [movies]);

  return (
    <div className="w-full min-h-screen bg-[#0f1217] text-white px-6 py-10">
      {/* Title */}
      <h2 className="text-center text-xl font-semibold mb-6 flex items-center justify-center gap-2">
        <img src={red} alt="" className="w-6 h-6 object-contain" />
        Phim đang chiếu
      </h2>

      {/* Date Selector */}
      <div className="flex justify-center gap-4 mb-4">
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDate(d)}
            className={`px-4 py-2 rounded-lg border transition ${
              activeDate === d
                ? "bg-red-500 border-red-500 text-white"
                : "border-gray-500 text-gray-300 hover:border-gray-300"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Warning */}
      <p className="text-center text-sm text-yellow-400 mb-8">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>
      {/* Time */}
      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((m: Movie, index) => (
          <div
            onClick={() => {
              navigate(`/booking?${m.id}`);
            }}
            key={index}
            className="bg-[#161b22] rounded-xl flex gap-4 p-4 border border-gray-700 relative"
          >
            {/* Poster */}
            <img
              src={m.poster}
              alt={m.title}
              className="w-40 h-56 rounded-lg object-cover"
            />

            {/* 2D Badge */}
            <span className="px-3 py-1 border border-gray-400 rounded-md text-sm absolute top-3 right-3">
              2D
            </span>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">
                  {m.genre} • {m.duration}
                </p>

                <h3 className="font-semibold text-lg">{m.title}</h3>

                <p className="text-sm text-gray-300 mt-2">
                  Xuất xứ: {m.origin}
                </p>
                <p className="text-sm text-gray-300">Khởi chiếu: {m.release}</p>

                <p className="text-sm text-red-400 mt-2">{m.age}</p>

                {/* Time buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.time.map((t, idx) => (
                    <button
                      key={idx}
                      className="px-3 py-1 rounded-lg border border-gray-500 hover:border-white transition"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
