import axios from "axios";
import screen from "../assets/imgs/screen 1.png";
import { useEffect, useState } from "react";
export type Genre = {
  id: number;
  genre_name: string;
};
export type Showtime = {
  id: number;
  time: string;
  booking: [];
  seats: Seat[];
};
export type Seat = {
  seat: string;
  booked: boolean;
  price: number;
  type: string;
};
export type Movie = {
  id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  trailer: string;
  type: string;
  age: number;
  duration: number;
  origin: string; // phút
  genres_movie: Genre[];
  status: string; // "DANGCHIEU" | "SAPCHIEU" ...
  release_date: string; // YYYY-MM-DD
  created_at: string;
  updated_at: string;
  showtimes: Showtime[];
};
export default function ChooseTicket() {
  const text = [
    "K - Phim được phổ biến đến người xem dưới 13 tuổi và có người bảo hộ đi kèm",
    "T16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)",
    "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
  ];
  const [showing, setShowing] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [hour, setHour] = useState("");
  const [choosingSeats, setChoosingSeats] = useState<Seat[]>([]);

  const [data, setData] = useState<Movie | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies/${window.location.href.split("?")[1]}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Lỗi fetch phim:", err));
  }, []);

  const hancleClick = (seatCode: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        showtimes: prev.showtimes.map((st) =>
          st.time === hour
            ? {
                ...st,
                seats: st.seats.map((seat) =>
                  seat.seat === seatCode ? { ...seat, booked: true } : seat
                ),
              }
            : st
        ),
      };
    });
  };
  // useEffect(() => {
  //   setChoosingSeats([]);
  //   data?.showtimes.map((p) => {
  //     p.seats?.map((s) => {
  //       if (s.booked) {
  //         const seatBeenChoosing: Seat = { seat: s.seat, booked: s.booked, price: s.price, type: s.type };
  //         setChoosingSeats((prev) => [...prev, seatBeenChoosing]);
  //       }
  //     });
  //   });
  // }, [data?.showtimes]);
  useEffect(() => {
    if (showing) {
      const timer = setTimeout(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            setMinutes((prev) => {
              if (prev === 0) {
                clearTimeout(timer);
              }
              return minutes - 1;
            });
            return 59;
          }
          return prevSec - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [minutes, seconds, showing]);

  return (
    <div className="bg-black text-white font-sans">
      {/* BACKGROUND WRAPPER */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, #121212), url("https://th.bing.com/th/id/R.1199dc6273680f175fd9b06c9c36d08a?rik=%2fKp12KVFsHU89w&pid=ImgRaw&r=0")`,
        }}
      >
        <div className="bg-black bg-opacity-60">
          {/* MOVIEs DETAILS */}
          <main
            id="movies-details"
            className="flex justify-center items-center px-40"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6 mb-10 p-4 rounded-xl shadow text-white">
              <img
                src={data?.image}
                alt="Poster phim"
                className="w-full lg:w-1/4 max-w-xs rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-semibold mb-2">{data?.title}</h2>
                <p className="text-sm text-gray-300 mb-2">
                  <div className="font-medium flex gap-8 text-start">
                    <span>{data?.genres_movie?.map((g) => g.genre_name)}</span>
                    <span>{data?.origin}</span>
                    <span>{data?.duration}</span>
                    <span>Đạo diễn: {data?.author}</span>
                  </div>
                </p>
                <p className="text-gray-300">Diễn viên: {data?.author}</p>
                <p className="mb-2 text-gray-300">
                  <span className="font-medium">Khởi chiếu: </span>
                  {data?.release_date}
                </p>
                <p className="text-xs text-red-400 italic mb-2">
                  Kiểm duyệt:{" "}
                  {data?.age === 13
                    ? `${text[0]}`
                    : data?.age === 16
                    ? `${text[1]}`
                    : data?.age === 18
                    ? `${text[2]}`
                    : ""}
                </p>
                <p>{data?.description}</p>
                <div className="mt-4 flex gap-4 items-center">
                  <a
                    href="https://chieuphimquocgia.com.vn/moviess/10415"
                    className="text-white underline text-sm font-medium"
                  >
                    Chi tiết nội dung
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=52qrqrOw4PE&embeds_referring_euri=https%3A%2F%2Fchieuphimquocgia.com.vn%2F&source_ve_path=OTY3MTQ"
                    className="text-[#EAB308] text-sm border-[#EAB308] border  rounded-full p-3 font-medium"
                  >
                    Xem trailer
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-[#101012] p-6 rounded text-center flex flex-col w-full">
        <div className="text-sm">{}</div>
        <div className="text-2xl font-bold">{}</div>
        <div className="text-sm">{}</div>
      </div>
      <main className="px-8 bg-gray-900 opacity-80 flex flex-col justify-center items-center gap-5 py-10">
        {/* DATE + SHOWTIME */}
        <p className="text-lg text-orange-400 text-center">
          <span className="font-semibold text-[15px]">
            Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h
            và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
          </span>
        </p>
        <div className="flex flex-row justify-between items-center gap-4 flex-wrap w-4xl">
          {data?.showtimes.map((d, id) => (
            <button
              className={`border-[#1E293B] border-2 rounded-4xl px-14 py-2 ${
                d.time === hour ? "bg-[#1E293B]" : ""
              }`}
              key={id}
              value={d.time}
              onClick={(e) => {
                setHour(e.currentTarget.value);
                setShowing(true);
              }}
            >
              {d.time}
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
          {/* SEAT SECTION */}
          <div id="seat-section" className="pb-10">
            <div className="flex justify-center mb-4">
              <img
                src={screen}
                width="888px"
                className="max-h-32 rounded shadow-lg "
              />
            </div>

            <div className="mb-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-center mb-4">
                Phòng chiếu số 2
              </h2>

              <div
                id="seat"
                className={`flex justify-between items-center gap-2 mb-4 w-[${
                  40 * 15 + 8 * 14
                }px] flex-wrap`}
              >
                {data?.showtimes[
                  data?.showtimes.findIndex((t) => t.time === hour)
                ]?.seats.map((seats) => (
                  <button
                    disabled={seats.booked}
                    className={`size-10 bg-[#252A31] rounded-md text-center ${
                      seats.booked
                        ? "bg-blue-600"
                        : "hover:bg-green-400 transition-all ease-linear"
                    } `}
                    onClick={() => {
                      hancleClick(seats.seat);
                    }}
                  >
                    {seats.seat}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-6 text-xs mb-4 items-center text-[16px]">
                <div className="bg-gray-700 size-10 rounded-md text-gray-500 flex justify-center items-center text-[20px]">
                  x
                </div>{" "}
                Đã đặt
                <div className="size-10 rounded-md bg-[#007AFF]"></div> Ghế bạn
                chọn
                <div className="size-10 rounded-md bg-gray-700"></div> Ghế
                thường
                <div className="bg-[#F97316] size-10 rounded-md"></div> Ghế VIP
                <div className="bg-[#DC2626] size-10 rounded-md"></div> Ghế đôi
              </div>
            </div>
            <div className="text-sm mb-4">
              <p>
                Ghế đã chọn:
                <span className="text-green-400 ml-1">
                  {choosingSeats.map((s, id) =>
                    id + 1 === choosingSeats.length ? s.seat : s.seat + ","
                  )}
                </span>
              </p>
              <p>
                Tổng tiền:
                <span id="total-price" className="text-yellow-400 ml-1">
                  {choosingSeats.reduce((sum, curr) => sum + curr.price, 0).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                </span>
              </p>
            </div>

            <div className="text-right">
              <button className="bg-gray-600 px-4 py-2 rounded mr-2">
                Quay lại
              </button>
              <button className="bg-red-600 px-4 py-2 rounded">
                Thanh toán
              </button>

              <div id="login-warning" className={`text-red-600 text-sm mt-2`}>
                Bạn cần đăng nhập tài khoản để thanh toán.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
