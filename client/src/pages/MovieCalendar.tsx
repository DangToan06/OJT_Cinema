import red from "../assets/red.png";
import { useNavigate } from "react-router-dom";
import ReleaseDate from "../components/movieCalendar/ReleaseDate";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { useEffect, useState } from "react";
import { getAllShowtimes } from "../api/showTime.api";
import { getAllMovies } from "../api/movie.api";
import { Spin } from "antd";

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function MovieCalendar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeDate, setActiveDate] = useState(() => formatDate(new Date()));

  const { data: movies } = useAppSelector((state) => state.movies);
  const { data: showTimes, status: showTimesStatus } = useAppSelector(
    (state) => state.showTimes
  );

  useEffect(() => {
    dispatch(getAllMovies());

    dispatch(getAllShowtimes());
  }, [dispatch]);

  const getDateFilter = (datestr: string) => {
    setActiveDate(datestr);
  };

  const showsInDate = showTimes.filter((show) => show.date === activeDate);

  const uniqueMovies = [...new Set(showsInDate.map((show) => show.movie))];

  return (
    <div className="w-full min-h-screen bg-[#0f1217] text-white px-6 py-10">
      <h2 className="text-center text-xl font-semibold mb-6 flex items-center justify-center gap-2">
        <img src={red} alt="" className="w-6 h-6 object-contain" />
        Phim đang chiếu
      </h2>

      <div className="flex justify-center mb-4">
        <ReleaseDate activeDate={activeDate} getDateFilter={getDateFilter} />
      </div>

      <p className="text-center text-sm text-yellow-400 mb-8">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showTimesStatus === "pending" ? (
          <div className="col-span-full flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {uniqueMovies.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                Không có suất chiếu nào vào ngày này.
              </p>
            ) : (
              uniqueMovies.map((movieTitle, index) => {
                const movieDetails = movies.find((m) => m.title === movieTitle);

                const movieShowtimes = showsInDate
                  .filter((s) => s.movie === movieTitle)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime));

                if (!movieDetails) return null;

                return (
                  <div
                    key={index}
                    className="bg-[#161b22] rounded-xl flex gap-4 p-4 border border-gray-700 relative hover:border-gray-500 transition"
                  >
                    <img
                      src={movieDetails.image}
                      alt={movieDetails.title}
                      className="w-40 h-56 rounded-lg object-cover"
                    />

                    <span className="px-3 py-1 border border-gray-400 rounded-md text-sm absolute top-3 right-3 bg-black/50 backdrop-blur-md">
                      2D
                    </span>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">
                          {movieDetails.genres_movie
                            ?.map((g) => g.genre_name)
                            .join(", ")}
                          {" • "}
                          {movieDetails.duration} phút
                        </p>

                        <h3 className="font-bold text-xl text-white mb-1">
                          {movieDetails.title}
                        </h3>

                        <p className="text-sm text-gray-300 mt-1">
                          Tác giả: {movieDetails.author}
                        </p>
                        <p className="text-sm text-gray-300">
                          Khởi chiếu: {movieDetails.release_date}
                        </p>

                        <h5 className="text-sm font-bold mt-4 mb-2 text-white uppercase tracking-wider">
                          Lịch chiếu
                        </h5>

                        <div className="flex flex-wrap gap-2">
                          {movieShowtimes.map((t, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                navigate(`/showtimes?id=${t.id}`);
                              }}
                              className="px-4 py-1.5 rounded-lg border border-gray-600 bg-gray-800 hover:bg-white hover:text-black hover:border-white transition text-sm font-medium text-gray-200"
                            >
                              {t.startTime}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
