import axios from "axios";
import screen from "../assets/imgs/screen 1.png";
import { useEffect, useState } from "react";
export default function ChooseTicket() {
  const [seats, setSeats] = useState<string[]>([]);
  const [stopRender, setStopRender] = useState(true);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [hour, setHour] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([
    {
      id: 0,
      title: "",
      origin: "",
      release: "",
      duration: "",
      genre: "",
      age: "",
      poster: "",
      time: [],
      author: "",
      actor: "",
      description: "",
    },
  ]);
  axios
    .get(
      `http://localhost:8080/choosingItem/?id=${
        window.location.href.split("?")[1]
      }`
    )
    .then((res) => setData(res.data));
  useEffect(() => {
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
  }, [minutes, seconds]);
  const renderSeats = () => {
    let temp = "";
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "K"];
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const result: string[] = [];
    rows.forEach((row) => {
      number.forEach((num) => {
        temp = row + num;
        result.push(temp);
      });
    });
    setSeats(result)
  };
  useEffect(() => {
    if (stopRender) {
      renderSeats();
    }
    setStopRender(false);
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      {/* BACKGROUND WRAPPER */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, #121212), url(${data[0].poster})`,
        }}
      >
        <div className="bg-black bg-opacity-60">
          {/* MOVIE DETAILS */}
          <main
            id="movie-details"
            className="flex justify-center items-center px-40"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6 mb-10 p-4 rounded-xl shadow text-white">
              <img
                src={data[0].poster}
                alt="Poster phim"
                className="w-full lg:w-1/4 max-w-xs rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-semibold mb-2">{data[0].title}</h2>
                <p className="text-sm text-gray-300 mb-2">
                  <div className="font-medium flex gap-8">
                    <span>{data[0].genre}</span>
                    <span>{data[0].origin}</span>
                    <span>{data[0].duration}</span>
                    <span>Đạo diễn: {data[0].author}</span>
                  </div>
                </p>
                <p className="text-gray-300">Diễn viên: {data[0].actor}</p>
                <p className="mb-2 text-gray-300">
                  <span className="font-medium">Khởi chiếu: </span>
                  {data[0].release}
                </p>
                <p className="text-xs text-red-400 italic mb-2">
                  Kiểm duyệt: {data[0].age}
                </p>
                <p>{data[0].description}</p>
                <div className="mt-4 flex gap-4 items-center">
                  <a
                    href="https://chieuphimquocgia.com.vn/movies/10415"
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
        <div className="text-sm">{data[0].release.split("/")[0]}</div>
        <div className="text-2xl font-bold">
          {data[0].release.split("/")[1]}
        </div>
        <div className="text-sm">{data[0].release.split("/")[2]}</div>
      </div>
      <main className="px-8 bg-gray-950 opacity-80 flex flex-col justify-center items-center gap-5">
        {/* DATE + SHOWTIME */}
        <p className="text-lg text-orange-400 text-center">
          <span className="font-semibold text-[15px]">
            Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h
            và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
          </span>
        </p>
        <div className="flex flex-row justify-between items-center gap-4 flex-wrap w-4xl">
          {data[0].time.map((d, id) => (
            <button
              className="border-[#1E293B] border-2 rounded-4xl px-14 py-2"
              key={id}
              value={d}
              onClick={(e) => {
                setHour(e.currentTarget.value);
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full px-[150px]">
          <div>Giờ chiếu: {hour}</div>
          <div>
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
              className={`flex justify-between items-center gap-2 mb-4 w-[${40 * 15 + 8* 14}px] flex-wrap`}
            >
              {seats.map((seat) => (
                <button className={`size-10 bg-[#252A31] rounded-md text-center`}>{seat}</button>
              ))}
            </div>

            <div className="flex justify-center gap-4 text-xs mb-4">
              <div className="seat booked"></div> Đã đặt
              <div className="seat selected"></div> Ghế bạn chọn
              <div className="seat available"></div> Ghế thường
              <div className="seat vip"></div> Ghế VIP
              <div className="seat double"></div> Ghế đôi
            </div>

            </div>
            <div className="text-sm mb-4">
              <p>
                Ghế đã chọn:
                <span id="selected-seats" className="text-green-400 ml-1">
                  Chưa có ghế nào
                </span>
              </p>
              <p>
                Tổng tiền:
                <span id="total-price" className="text-yellow-400 ml-1">
                  0
                </span>{" "}
                đ
              </p>
            </div>

            <div className="text-right">
              <button className="bg-gray-600 px-4 py-2 rounded mr-2">
                Quay lại
              </button>
              <button className="bg-red-600 px-4 py-2 rounded">
                Thanh toán
              </button>

              <div
                id="login-warning"
                className={`text-red-600 text-sm mt-2 ${
                  isLogin ? "hidden" : "block"
                }`}
              >
                Bạn cần đăng nhập tài khoản để thanh toán.
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
