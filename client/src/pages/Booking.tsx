import screen from "../assets/imgs/screen1.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { getAllMovies } from "../api/movie.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllShowtimes } from "../api/showTime.api";
import { getAllScreens } from "../api/screen.api";
import { getAllSeats } from "../api/seat.api";
import { Armchair } from "lucide-react";
import DetailModal from "./Detail";
import type { Seat } from "../types/theater.interface";

export default function ChooseTicket() {
  const [showing, setShowing] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hour, setHour] = useState("");
  const [openTrailer, setOpenTrailer] = useState(false);
  const [open, setOpen] = useState(false);
  const [choosingSeat, setChoosingSeat] = useState<Seat[]>([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const map: Record<string, number> = {
    standard: 75000,
    vip: 90000,
    sweetbox: 120000,
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.body.style.overflow = openTrailer ? "hidden" : "auto";
  }, [openTrailer]);
  const [searchParams] = useSearchParams();

  const showtimeId = searchParams.get("id");
  const { data: movies } = useAppSelector((state) => state.movies);
  const { data: showTimes } = useAppSelector((state) => state.showTimes);
  const { data: screens } = useAppSelector((state) => state.screens);
  const { data: seats } = useAppSelector((state) => state.seats);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (minutes === 0 && seconds === 0) return;
      if (seconds === 0) {
        setMinutes((m) => m - 1);
        setSeconds(59);
      } else {
        setSeconds((s) => s - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [minutes, seconds]);
  useEffect(() => {
    if (movies.length === 0) {
      dispatch(getAllMovies());
    }
  }, [dispatch, movies.length]);

  useEffect(() => {
    if (showTimes.length === 0) {
      dispatch(getAllShowtimes());
    }
  }, [dispatch, showTimes.length]);

  useEffect(() => {
    if (screens.length === 0) {
      dispatch(getAllScreens());
    }
  }, [dispatch, screens.length]);

  useEffect(() => {
    if (seats.length === 0) {
      dispatch(getAllSeats());
    }
  }, [dispatch, seats.length]);

  const showTimeNow = showTimes.find((s) => s.id === showtimeId);
  const size = screens.find((s) => s.name === showTimeNow?.screen)?.column;
  const [tempSeats, setTempSeats] = useState<Seat[]>([]);
  // setTempSeats()
  useEffect(() => {
    const list = seats.find(
      (chair) =>
        chair.screenId ===
        screens.find((s) => s.name === showTimeNow?.screen)?.id
    )?.seats;
    if (!list) return;

    setTempSeats(list);
  }, [screens, seats, showTimeNow]);
  useEffect(() => {
    const selected = tempSeats.filter((s) => s.booked);
    setChoosingSeat(selected);
  }, [tempSeats]);
  const handleChoose = (seat: Seat) => {
    setTempSeats((prev) =>
      prev.map((s) =>
        s.number == seat.number && s.row == seat.row
          ? { ...s, booked: !s.booked }
          : s
      )
    );
  };
  return (
    <div className="bg-black text-white font-sans px-6 min-h-[600px]">
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, #121212), url("https://th.bing.com/th/id/R.1199dc6273680f175fd9b06c9c36d08a?rik=%2fKp12KVFsHU89w&pid=ImgRaw&r=0")`,
        }}
      >
        <div className="bg-black bg-opacity-60">
          <main
            id="movies-details"
            className="flex justify-center items-center px-40"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6 mb-10 p-4 rounded-xl shadow text-white">
              <img
                src={movies.find((m) => m.title === showTimeNow?.movie)?.image}
                alt="Poster phim"
                className="w-full lg:w-1/4 max-w-xs rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-semibold mb-2">
                  {movies.find((m) => m.title === showTimeNow?.movie)?.title}
                </h2>
                <div className="text-sm text-gray-300 mb-2">
                  <div className="font-medium flex gap-8 text-start">
                    <span>
                      {movies
                        .find((m) => m.title === showTimeNow?.movie)
                        ?.genres_movie?.map((g) => g.genre_name)}
                    </span>
                    {/* <span>{movies?.}</span>  */}
                    <span>
                      {
                        movies.find((m) => m.title === showTimeNow?.movie)
                          ?.duration
                      }
                    </span>
                    <span>
                      Đạo diễn:{" "}
                      {
                        movies.find((m) => m.title === showTimeNow?.movie)
                          ?.author
                      }
                    </span>
                  </div>
                </div>
                <p className="text-gray-300">
                  Diễn viên:{" "}
                  {movies.find((m) => m.title === showTimeNow?.movie)?.author}
                </p>
                <p className="mb-2 text-gray-300">
                  <span className="font-medium">Khởi chiếu: </span>
                  {
                    movies.find((m) => m.title === showTimeNow?.movie)
                      ?.release_date
                  }
                </p>
                <p>
                  {
                    movies.find((m) => m.title === showTimeNow?.movie)
                      ?.description
                  }
                </p>
                <div className="mt-4 flex gap-4 items-center">
                  <button
                    className="text-white underline text-sm font-medium"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Chi tiết nội dung
                  </button>
                  <button
                    onClick={() => setOpenTrailer(true)}
                    className="text-[#EAB308] text-sm border-[#EAB308] border  rounded-full p-3 font-medium"
                  >
                    Xem trailer
                  </button>
                </div>
                {openTrailer && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-black/70"
                      onClick={() => setOpenTrailer(false)}
                    />

                    <div className="relative z-10 w-[80%] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
                      <button
                        onClick={() => setOpenTrailer(false)}
                        className="absolute top-2 right-3 text-white text-3xl hover:scale-110"
                      >
                        ✕
                      </button>

                      <iframe
                        className="w-full h-full"
                        src={
                          movies.find((m) => m.title === showTimeNow?.movie)
                            ?.trailer
                        }
                        title="Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="bg-[#101012] p-6 rounded text-center flex flex-col w-full">
        <div className="text-sm">{}</div>
        <div className="text-2xl font-bold">{}</div>
        <div className="text-sm">{}</div>
      </div>
      <div className="h-auto px-8 bg-gray-900 opacity-80 flex flex-col justify-center items-center gap-5 py-10">
        <p className="text-lg text-orange-400 text-center">
          <span className="font-semibold text-[15px]">
            Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h
            và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
          </span>
        </p>
        <div className="flex flex-row justify-start items-center gap-4 flex-wrap w-4xl">
          {showTimes
            .filter((s) => s.movie === showTimeNow?.movie)
            .map((d, id) => (
              <button
                className={`border-[#1E293B] border-2 rounded-4xl px-14 py-2 ${
                  d.startTime === hour ? "bg-[#1E293B]" : ""
                }`}
                key={id}
                value={d.startTime}
                onClick={(e) => {
                  setHour(e.currentTarget.value);
                  setShowing(true);
                  setMinutes(10);
                  setSeconds(0);
                }}
              >
                {d.startTime}
              </button>
            ))}
        </div>
        <div className={`${showing ? "" : "hidden"}`}>
          <div className="flex justify-between w-full mb-5">
            <div>Giờ chiếu: {hour}</div>
            <div className="border-red-600 rounded-md p-1 border-2">
              Thời gian chọn ghế: {minutes}:
              {seconds == 0
                ? seconds + "0"
                : seconds < 10
                ? "0" + seconds
                : seconds}
            </div>
          </div>
          <div className="pb-10">
            <div className="flex justify-center mb-4">
              <img
                src={screen}
                width="888px"
                className="max-h-32 rounded shadow-lg "
              />
            </div>

            <div className="mb-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-center mb-4">
                Phòng chiếu số {showTimeNow?.screen}
              </h2>

              <div
                id="seat"
                className={`flex justify-between items-center gap-2 mb-4 w-[${
                  40 * Number(size) + 8 * (Number(size) - 1)
                }px] flex-wrap`}
              >
                {tempSeats.map((ghe, i) => (
                  <div
                    className={`flex flex-col justify-center items-center size-10 
                    `}
                  >
                    <Armchair
                      key={i}
                      onClick={() => {
                        handleChoose(ghe);
                      }}
                      className={`${
                        ghe.type == "standard"
                          ? "text-white"
                          : ghe.type == "vip"
                          ? "text-amber-300"
                          : ghe.type == "sweetbox"
                          ? "text-pink-500"
                          : ""
                      } ${ghe.booked ? "text-[#007AFF]" : ""}
                       `}
                    />
                    {ghe.row + ghe.number}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-6 text-xs mb-4 items-center text-[16px]">
                <div className="bg-gray-700 size-10 rounded-md text-gray-500 flex justify-center items-center text-[20px]">
                  x
                </div>{" "}
                Đã đặt
                <div className="size-10 rounded-md bg-[#007AFF]"></div> Ghế bạn
                chọn
                <div className="size-10 rounded-md bg-white"></div> Ghế thường
                <div className="bg-amber-300 size-10 rounded-md"></div> Ghế VIP
                <div className="bg-pink-500 size-10 rounded-md"></div> Ghế đôi
              </div>
            </div>
            <div className="text-sm mb-4">
              <p>
                Ghế đã chọn:
                <span className="text-green-400 ml-1">
                  {choosingSeat.map((s, id) =>
                    id + 1 === choosingSeat.length
                      ? s.row + s.number
                      : s.row + s.number + ","
                  )}
                </span>
              </p>
              <p>
                Tổng tiền:
                <span id="total-price" className="text-yellow-400 ml-1">
                  {choosingSeat
                    .reduce((sum, curr) => sum + map[curr.type], 0)
                    .toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                </span>
              </p>
            </div>

            <div className="text-right">
              <button className="bg-gray-600 px-4 py-2 rounded mr-2">
                Quay lại
              </button>
              <button className="bg-red-600 px-4 py-2 rounded"
              onClick={() => {
                if(user){
                  localStorage.setItem("choosingSeat", JSON.stringify(choosingSeat));
                  navigate("/payment");
                }
              }}>
                Thanh toán
              </button>

              <div className={`text-red-600 text-sm mt-2`}>
                {user ? "" : "Bạn cần đăng nhập tài khoản để thanh toán."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailModal
        title={movies.find((m) => m.title === showTimeNow?.movie)?.title}
        content={
          movies.find((m) => m.title === showTimeNow?.movie)?.description
        }
        setOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
