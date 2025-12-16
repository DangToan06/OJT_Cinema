import { useEffect, useState } from "react";
import { CircleX, Edit, Trash2 } from "lucide-react";
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
    console.log(id);
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Giá vé này sẽ bị xóa vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePrice(id))
          .then(() => {
            Swal.fire({ title: "Đã xóa!", text: "...", icon: "success" });
          })
          .catch(() => {
            Swal.fire({ title: "Lỗi!", text: "Xóa thất bại", icon: "error" });
          });

        Swal.fire({
          title: "Đã xóa!",
          text: "Giá vé đã được xóa thành công.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const filteredPrices = prices.filter((p) => {
  const matchSeat = filterSeat ? p.type_seat === filterSeat : true;
  const matchMovie = filterMovie ? p.type_movie === filterMovie : true;
  const matchDay =
    filterDay !== "" ? p.day_type === Number(filterDay) : true;

  return matchSeat && matchMovie && matchDay;
});


  useEffect(() => {
    dispatch(getAllPrice());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2 font-bold text-2xl">
          Quản lý giá vé
        </h1>
        <p className="text-gray-600">
          Cấu hình bảng giá vé theo loại ghế, phòng chiếu và thời gian
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-900 font-semibold text-xl">Giá vé</h2>
            <div className="flex gap-3">
              <select
                className="border rounded px-3 py-0.5 cursor-pointer"
                value={filterSeat}
                onChange={(e) => setFilterSeat(e.target.value)}
              >
                <option value="">Loại ghế</option>
                <option value="STANDARD">STANDARD</option>
                <option value="VIP">VIP</option>
                <option value="SWEETBOX">SWEETBOX</option>
              </select>

              <select
                className="border rounded px-3 py-0.5 cursor-pointer"
                value={filterMovie}
                onChange={(e) => setFilterMovie(e.target.value)}
              >
                <option value="">Loại phim</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>

              <select
                className="border rounded px-3 py-0.5 cursor-pointer"
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
                className="text-red-600 cursor-pointer hover:scale-110"
              >
                <CircleX />
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setModalType("add");
            }}
            className="px-5 py-2 rounded cursor-pointer bg-red-600 text-white font-semibold hover:bg-red-700 hover:scale-105"
          >
            Thêm giá
          </button>
        </div>

        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-center">
                <th className="pb-3 text-gray-600">Loại ghế</th>
                <th className="pb-3 text-gray-600">Loại phim</th>
                <th className="pb-3 text-gray-600">Giá (₫)</th>
                <th className="pb-3 text-gray-600">Loại ngày</th>
                <th className="pb-3 text-gray-600">Thời gian</th>
                <th className="pb-3 text-gray-600">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPrices.map((p) => (
                <tr key={p.id} className="text-center">
                  <td className="py-4">{p.type_seat}</td>
                  <td className="py-4">{p.type_movie}</td>
                  <td className="py-4">{p.price.toLocaleString()}đ</td>
                  <td className="py-4">
                    {p.day_type === 0 ? "Ngày thường" : "Cuối tuần/lễ"}
                  </td>
                  <td className="py-4">
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
                        className="text-blue-600 hover:scale-110"
                      >
                        <Edit className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDeletePrice(p.id)}
                        className="text-red-600 hover:scale-110"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <form
            onSubmit={handleAddPrice}
            className="bg-white p-5 flex flex-col gap-3 rounded w-[30%]"
          >
            <div className="flex justify-between text-xl font-semibold">
              <p>{modalType === "add" ? "Thêm giá vé" : "Sửa giá vé"}</p>
              <p
                onClick={handleCloseForm}
                className="cursor-pointer hover:scale-110"
              >
                x
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <label>Loại ghế</label>
                <select
                  name="seatType"
                  className="border rounded w-full px-2 py-1"
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
                  <p className="text-red-600 text-sm">{seatError}</p>
                )}
              </div>

              <div className="w-full">
                <label>Loại phim</label>
                <select
                  onChange={handleChange}
                  name="movieType"
                  className="border rounded w-full px-2 py-1"
                  value={typeMovie}
                >
                  <option disabled value="?">
                    Chọn loại phim
                  </option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                </select>
                {isShowMovieError && (
                  <p className="text-red-600 text-sm">{movieError}</p>
                )}
              </div>
            </div>

            <label>Giá vé</label>
            <input
              type="number"
              className="border rounded w-full px-2 py-1"
              value={price}
              name="price"
              onChange={handleChange}
            />
            {isShowPriceError && (
              <p className="text-red-600 text-sm">{priceError}</p>
            )}

            <div className="flex gap-3">
              <div className="w-full">
                <label>Loại ngày</label>
                <select
                  name="dayType"
                  className="border rounded w-full px-2 py-1"
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
                  <p className="text-red-600 text-sm">{dayError}</p>
                )}
              </div>

              <div className="w-full">
                <label>Thời gian</label>
                <select
                  name="time"
                  className="border rounded w-full px-2 py-1"
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
                  <p className="text-red-600 text-sm">{timeError}</p>
                )}
              </div>
            </div>
            {isShowModalError && (
              <p className="text-red-600 text-sm">{modalError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseForm}
                className="border rounded px-3 py-1 cursor-pointer"
              >
                Hủy
              </button>
              {modalType === "add" ? (
                <button type="submit" className="border rounded px-3 py-1">
                  Thêm
                </button>
              ) : (
                <button type="submit" className="border rounded px-3 py-1">
                  Lưu
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
