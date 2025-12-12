"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Calendar, Clock } from "lucide-react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store/store";
import {
  createShowtime,
  deleteShowtime,
  fetchShowtimes,
  updateShowtime,
} from "../api/showtimes.api";
// import { createShowtime, deleteShowtime, fetchShowtimes, updateShowtime } from "../redux/slice/showtimes.slice";

interface ShowtimeForm {
  movie: string;
  theater: string;
  screen: string;
  date: string;
  startTime: string;
  price: string;
}

export function ShowtimesManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: showtimes, loading } = useSelector(
    (state: RootState) => state.showtimes
  );

  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<any>(null);
  const [filterDate, setFilterDate] = useState("2025-12-10");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<ShowtimeForm>({
    movie: "",
    theater: "",
    screen: "",
    date: "",
    startTime: "",
    price: "",
  });

  useEffect(() => {
    dispatch(fetchShowtimes());
  }, [dispatch]);

  const filteredShowtimes = Array.isArray(showtimes)
    ? showtimes.filter((s) => s.date === filterDate)
    : [];

  const getOccupancyColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage >= 80) return "text-red-600 font-semibold";
    if (percentage >= 50) return "text-orange-600 font-semibold";
    return "text-green-600 font-semibold";
  };

  const openAddModal = () => {
    setEditingShowtime(null);
    setForm({
      movie: "",
      theater: "",
      screen: "",
      date: "",
      startTime: "",
      price: "",
    });
    setShowModal(true);
  };

  const openEditModal = (showtime: any) => {
    setEditingShowtime(showtime);
    setForm({
      movie: showtime.movie,
      theater: showtime.theater,
      screen: showtime.screen,
      date: showtime.date,
      startTime: showtime.startTime,
      price: showtime.price.toString(),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !form.movie ||
      !form.theater ||
      !form.screen ||
      !form.date ||
      !form.startTime ||
      !form.price ||
      Number(form.price) < 10000
    ) {
      return;
    }

    const price = Number(form.price);
    if (isNaN(price) || price < 10000) {
      Swal.fire("Lỗi", "Giá vé phải lớn hơn 10.000đ", "error");
      return;
    }

    // Tính giờ kết thúc
    const [hours, minutes] = form.startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + 180;
    const endHours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");
    const endTime = `${endHours}:${endMinutes}`;

    const totalSeats = form.screen.includes("VIP")
      ? 80
      : form.screen.includes("2")
      ? 150
      : 120;

    const payload = {
      movie: form.movie,
      theater: form.theater,
      screen: form.screen,
      date: form.date,
      startTime: form.startTime,
      endTime,
      price,
      availableSeats: totalSeats,
      totalSeats,
      status: "active",
    };

    if (editingShowtime) {
      await dispatch(updateShowtime({ id: editingShowtime.id, data: payload }));
      Swal.fire("Thành công!", "Cập nhật suất chiếu thành công", "success");
    } else {
      await dispatch(createShowtime(payload));
      Swal.fire("Thành công!", "Thêm suất chiếu mới thành công", "success");
    }

    setShowModal(false);
    setForm({
      movie: "",
      theater: "",
      screen: "",
      date: "",
      startTime: "",
      price: "",
    });
    setEditingShowtime(null);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Xóa suất chiếu?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa luôn",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShowtime(id));
        Swal.fire("Đã xóa!", "Suất chiếu đã bị xóa", "success");
      }
    });
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">Đang tải lịch chiếu...</div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2 font-bold text-2xl">
            Quản lý lịch chiếu
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý lịch chiếu phim cho các rạp
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Thêm suất chiếu
        </button>
      </div>

      {/* Filter + Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200 flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <span className="text-gray-600 font-medium">
            {filteredShowtimes.length} suất chiếu
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">
                  Phim
                </th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">
                  Rạp & Phòng
                </th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">
                  Giờ chiếu
                </th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">
                  Giá vé
                </th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">
                  Ghế trống
                </th>
                <th className="px-6 py-4 text-right text-gray-600 font-medium">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShowtimes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Không có suất chiếu nào trong ngày này
                  </td>
                </tr>
              ) : (
                filteredShowtimes.map((showtime) => (
                  <tr key={showtime.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {showtime.movie}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-medium">
                        {showtime.theater}
                      </p>
                      <p className="text-sm text-gray-500">{showtime.screen}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Clock className="w-4 h-4" />
                        {showtime.startTime} - {showtime.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {showtime.price.toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={getOccupancyColor(
                          showtime.availableSeats,
                          showtime.totalSeats
                        )}
                      >
                        {showtime.availableSeats}/{showtime.totalSeats}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(showtime)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(showtime.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal add*/}

      {/* Modal – Validate chỉ hiện đỏ khi ấn Tạo mà chưa nhập */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingShowtime ? "Sửa suất chiếu" : "Thêm suất chiếu mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* State để biết đã submit chưa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PHIM */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Chọn phim *
                  </label>
                  <select
                    value={form.movie}
                    onChange={(e) =>
                      setForm({ ...form, movie: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      submitted && !form.movie
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn phim</option>
                    <option>Avengers: Endgame</option>
                    <option>Spider-Man: No Way Home</option>
                    <option>The Batman</option>
                    <option>Avatar: The Way of Water</option>
                    <option>Deadpool & Wolverine</option>
                  </select>
                  {submitted && !form.movie && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn phim
                    </p>
                  )}
                </div>

                {/* RẠP */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Chọn rạp *
                  </label>
                  <select
                    value={form.theater}
                    onChange={(e) =>
                      setForm({ ...form, theater: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      submitted && !form.theater
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn rạp</option>
                    <option>CGV Vincom Center</option>
                    <option>Lotte Cinema Keangnam</option>
                    <option>Galaxy Cinema Nguyễn Du</option>
                    <option>Beta Cinemas Thanh Xuân</option>
                  </select>
                  {submitted && !form.theater && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn rạp
                    </p>
                  )}
                </div>

                {/* PHÒNG */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Chọn phòng *
                  </label>
                  <select
                    value={form.screen}
                    onChange={(e) =>
                      setForm({ ...form, screen: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      submitted && !form.screen
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn phòng</option>
                    <option>Phòng 1 (120 ghế - 2D)</option>
                    <option>Phòng 2 (150 ghế - 3D)</option>
                    <option>Phòng VIP (80 ghế - IMAX)</option>
                  </select>
                  {submitted && !form.screen && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn phòng
                    </p>
                  )}
                </div>

                {/* NGÀY */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Ngày chiếu *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      submitted && !form.date
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {submitted && !form.date && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn ngày chiếu
                    </p>
                  )}
                </div>

                {/* GIỜ */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Giờ bắt đầu *
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({ ...form, startTime: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      submitted && !form.startTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {submitted && !form.startTime && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn giờ bắt đầu
                    </p>
                  )}
                </div>

                {/* GIÁ VÉ */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Giá vé (₫) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      submitted && (!form.price || Number(form.price) < 10000)
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="75000"
                    min="10000"
                  />
                  {submitted && !form.price && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng nhập giá vé
                    </p>
                  )}
                  {submitted && form.price && Number(form.price) < 10000 && (
                    <p className="text-red-500 text-sm mt-1">
                      Giá vé phải ≥ 10.000đ
                    </p>
                  )}
                </div>
              </div>

              {/* Nút */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSubmitted(false);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {editingShowtime ? "Cập nhật" : "Tạo suất chiếu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
