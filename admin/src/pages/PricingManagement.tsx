import { useEffect, useState } from "react";
import { CircleX, Edit, Trash2, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import {
  createPrice,
  deletePrice,
  getAllPrice,
  updatePrice,
} from "../api/price.api";
import type { TicketPrice } from "../interfaces/price.interface";
import Swal from "sweetalert2";

export function PricingManagement() {
  const dispatch = useAppDispatch();
  const { data: prices } = useAppSelector((store) => store.price);
  const [modalType, setModalType] = useState<string>("");

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [typeSeat, setTypeSeat] = useState<string>("?");
  const [typeMovie, setTypeMovie] = useState<string>("?");
  const [price, setPrice] = useState<number>(0);
  const [dayType, setDayType] = useState<number | string>("?");
  const [time, setTime] = useState<number | string>("?");

  const [filterSeat, setFilterSeat] = useState<string>("");
  const [filterMovie, setFilterMovie] = useState<string>("");
  const [filterDay, setFilterDay] = useState<string>("");
  const [seatError, setSeatError] = useState<string>("");
  const [isShowSeatError, setIsShowSeatError] = useState<boolean>(false);
  const [movieError, setMovieError] = useState<string>("");
  const [isShowMovieError, setIsShowMovieError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<string>("");
  const [isShowPriceError, setIsShowPriceError] = useState<boolean>(false);
  const [dayError, setDayError] = useState<string>("");
  const [isShowDayError, setIsShowDayError] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<string>("");
  const [isShowTimeError, setIsShowTimeError] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>("");
  const [isShowModalError, setIsShowModalError] = useState<boolean>(false);

  const handleCloseForm = () => {
    setTypeSeat("?");
    setTypeMovie("?");
    setPrice(0);
    setDayType("?");
    setTime("?");
    setCurrentId(null);

    setIsShowDayError(false);
    setIsShowModalError(false);
    setIsShowMovieError(false);
    setIsShowPriceError(false);
    setIsShowSeatError(false);
    setIsShowTimeError(false);
    setModalType("");
  };

  const setCurrentPrice = (p: TicketPrice) => {
    setCurrentId(p.id);
    setTypeSeat(p.type_seat);
    setTypeMovie(p.type_movie);
    setPrice(p.price);
    setDayType(p.day_type);
    setTime(p.time);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "seatType") setTypeSeat(value);
    if (name === "movieType") setTypeMovie(value);
    if (name === "price") setPrice(+value);
    if (name === "dayType") setDayType(value);
    if (name === "time") setTime(value);
  };

  const handleAddPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeSeat === "?") {
      setSeatError("Vui lòng chọn loại ghế");
      setIsShowSeatError(true);
      return;
    }

    if (typeMovie === "?") {
      setMovieError("Vui lòng chọn loại phim");
      setIsShowMovieError(true);
      return;
    }

    if (!price || price === 0) {
      setPriceError("Vui lòng nhập giá vé");
      setIsShowPriceError(true);
      return;
    }

    if (dayType === "?") {
      setDayError("Vui lòng chọn loại ngày");
      setIsShowDayError(true);
      return;
    }

    if (time === "?") {
      setTimeError("Vui lòng chọn thời gian");
      setIsShowTimeError(true);
      return;
    }

    const submitPrice: TicketPrice = {
      id: currentId ?? crypto.randomUUID(),
      type_seat: typeSeat,
      type_movie: typeMovie,
      price: +price,
      day_type: +dayType,
      time: +time,
    };

    const isExist = prices.some(
      (p) =>
        p.id !== currentId &&
        p.day_type === submitPrice.day_type &&
        p.type_movie === submitPrice.type_movie &&
        p.type_seat === submitPrice.type_seat &&
        p.time === submitPrice.time
    );

    if (isExist) {
      setModalError("Giá vé đã tồn tại!");
      setIsShowModalError(true);
      return;
    }

    if (modalType === "add") {
      dispatch(createPrice(submitPrice));
    } else {
      dispatch(updatePrice(submitPrice));
    }

    handleCloseForm();
  };

  const handleDeletePrice = (id: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Giá vé này sẽ bị xóa vĩnh viễn!",
      icon: "warning",
      background: "#1f2937",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePrice(id))
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "...",
              icon: "success",
              background: "#1f2937",
              color: "#fff",
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Lỗi!",
              text: "Xóa thất bại",
              icon: "error",
              background: "#1f2937",
              color: "#fff",
            });
          });
      }
    });
  };

  const filteredPrices = prices.filter((p) => {
    const matchSeat = filterSeat ? p.type_seat === filterSeat : true;
    const matchMovie = filterMovie ? p.type_movie === filterMovie : true;
    const matchDay = filterDay !== "" ? p.day_type === Number(filterDay) : true;

    return matchSeat && matchMovie && matchDay;
  });

  useEffect(() => {
    dispatch(getAllPrice());
  }, [dispatch]);

  const inputClass =
    "border border-gray-700 bg-gray-800 text-white rounded w-full px-2 py-1.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500";
  const filterSelectClass =
    "border border-gray-700 bg-gray-800 text-white rounded px-3 py-1 cursor-pointer focus:outline-none focus:border-red-500";

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-white mb-2 font-bold text-3xl">Quản lý giá vé</h1>
          <p className="text-gray-400">
            Cấu hình bảng giá vé theo loại ghế, phòng chiếu và thời gian
          </p>
        </div>
        <button
          onClick={() => {
            setModalType("add");
          }}
          className="flex gap-3 px-6 py-3 rounded-lg cursor-pointer bg-red-600 text-white font-semibold hover:bg-red-700 hover:scale-105 transition-all shadow-lg shadow-red-900/20"
        >
          <Plus />
          Thêm giá vé
        </button>
      </div>
      <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="flex w-full justify-between">
            <h2 className="text-white font-semibold text-xl">
              Danh sách giá vé
            </h2>
            <div className="flex gap-3">
              <select
                className={filterSelectClass}
                value={filterSeat}
                onChange={(e) => setFilterSeat(e.target.value)}
              >
                <option value="">Loại ghế</option>
                <option value="STANDARD">STANDARD</option>
                <option value="VIP">VIP</option>
                <option value="SWEETBOX">SWEETBOX</option>
              </select>

              <select
                className={filterSelectClass}
                value={filterMovie}
                onChange={(e) => setFilterMovie(e.target.value)}
              >
                <option value="">Loại phim</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>

              <select
                className={filterSelectClass}
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
              >
                <option value="">Loại ngày</option>
                <option value="0">Ngày thường</option>
                <option value="1">Cuối tuần/lễ</option>
              </select>

              <button
                onClick={() => {
                  setFilterSeat("");
                  setFilterMovie("");
                  setFilterDay("");
                }}
                className="text-red-500 cursor-pointer hover:scale-110 hover:text-red-400 transition-colors"
              >
                <CircleX />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-center">
                  <th className="pb-3 text-gray-400 font-medium">Loại ghế</th>
                  <th className="pb-3 text-gray-400 font-medium">Loại phim</th>
                  <th className="pb-3 text-gray-400 font-medium">Giá (₫)</th>
                  <th className="pb-3 text-gray-400 font-medium">Loại ngày</th>
                  <th className="pb-3 text-gray-400 font-medium">Thời gian</th>
                  <th className="pb-3 text-gray-400 font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredPrices.map((p) => (
                  <tr
                    key={p.id}
                    className="text-center group hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 text-gray-300 font-medium">
                      {p.type_seat}
                    </td>
                    <td className="py-4 text-gray-300">{p.type_movie}</td>
                    <td className="py-4 text-green-400 font-semibold">
                      {p.price.toLocaleString()}đ
                    </td>
                    <td className="py-4 text-gray-300">
                      {p.day_type === 0 ? "Ngày thường" : "Cuối tuần/lễ"}
                    </td>
                    <td className="py-4 text-gray-300">
                      {p.time === 1
                        ? "Trước 12h"
                        : p.time === 2
                        ? "12:00 - 17:00"
                        : p.time === 3
                        ? "17:00 - 23:00"
                        : "Sau 23:00"}
                    </td>
                    <td className="py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setModalType("edit");
                            setCurrentPrice(p);
                          }}
                          className="text-blue-500 hover:text-blue-400 hover:scale-110 transition-all p-1.5 bg-blue-500/10 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeletePrice(p.id)}
                          className="text-red-500 hover:text-red-400 hover:scale-110 transition-all p-1.5 bg-red-500/10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modalType && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-50 p-4">
          <form
            onSubmit={handleAddPrice}
            className="bg-gray-900 border border-gray-800 p-6 flex flex-col gap-4 rounded-xl shadow-2xl w-full max-w-lg"
          >
            <div className="flex justify-between items-center text-xl font-bold text-white border-b border-gray-800 pb-3">
              <p>{modalType === "add" ? "Thêm giá vé" : "Sửa giá vé"}</p>
              <button
                type="button"
                onClick={handleCloseForm}
                className="cursor-pointer hover:text-red-500 hover:bg-gray-800 p-1 rounded-full transition-colors"
              >
                <CircleX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label className="text-gray-300 text-sm mb-1 block">
                  Loại ghế
                </label>
                <select
                  name="seatType"
                  className={inputClass}
                  value={typeSeat}
                  onChange={handleChange}
                >
                  <option disabled value="?">
                    Chọn loại ghế
                  </option>
                  <option value="STANDARD">STANDARD</option>
                  <option value="VIP">VIP</option>
                  <option value="SWEETBOX">SWEETBOX</option>
                </select>
                {isShowSeatError && (
                  <p className="text-red-500 text-xs mt-1">{seatError}</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-gray-300 text-sm mb-1 block">
                  Loại phim
                </label>
                <select
                  onChange={handleChange}
                  name="movieType"
                  className={inputClass}
                  value={typeMovie}
                >
                  <option disabled value="?">
                    Chọn loại phim
                  </option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                </select>
                {isShowMovieError && (
                  <p className="text-red-500 text-xs mt-1">{movieError}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-1 block">Giá vé</label>
              <input
                type="number"
                className={inputClass}
                value={price}
                name="price"
                onChange={handleChange}
              />
              {isShowPriceError && (
                <p className="text-red-500 text-xs mt-1">{priceError}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label className="text-gray-300 text-sm mb-1 block">
                  Loại ngày
                </label>
                <select
                  name="dayType"
                  className={inputClass}
                  value={dayType}
                  onChange={handleChange}
                >
                  <option disabled value="?">
                    Chọn loại ngày
                  </option>
                  <option value={0}>Ngày thường</option>
                  <option value={1}>Cuối tuần/lễ</option>
                </select>
                {isShowDayError && (
                  <p className="text-red-500 text-xs mt-1">{dayError}</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-gray-300 text-sm mb-1 block">
                  Thời gian
                </label>
                <select
                  name="time"
                  className={inputClass}
                  value={time}
                  onChange={handleChange}
                >
                  <option disabled value="?">
                    Chọn thời gian
                  </option>
                  <option value={1}>Trước 12h</option>
                  <option value={2}>12h - 17h</option>
                  <option value={3}>17h - 23h</option>
                  <option value={4}>Sau 23h</option>
                </select>
                {isShowTimeError && (
                  <p className="text-red-500 text-xs mt-1">{timeError}</p>
                )}
              </div>
            </div>

            {isShowModalError && (
              <div className="p-3 bg-red-900/30 border border-red-900/50 rounded text-red-400 text-sm flex items-center gap-2">
                <CircleX className="w-4 h-4" /> {modalError}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-2 border-t border-gray-800 pt-4">
              <button
                type="button"
                onClick={handleCloseForm}
                className="border border-gray-600 text-gray-300 rounded px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white rounded px-6 py-2 hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-900/30"
              >
                {modalType === "add" ? "Thêm" : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
