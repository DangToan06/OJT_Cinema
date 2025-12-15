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
    if (percentage >= 80) return "text-red-500 font-bold shadow-red-500/20";
    if (percentage >= 50) return "text-orange-500 font-bold";
    return "text-green-500 font-bold";
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
      Swal.fire({
        title: "Lỗi",
        text: "Giá vé phải lớn hơn 10.000đ",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
      return;
    }

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

    const toastMixin = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      background: "#1f2937",
      color: "#fff",
    });

    if (editingShowtime) {
      await dispatch(updateShowtime({ id: editingShowtime.id, data: payload }));
      toastMixin.fire({
        icon: "success",
        title: "Cập nhật suất chiếu thành công",
      });
    } else {
      await dispatch(createShowtime(payload));
      toastMixin.fire({
        icon: "success",
        title: "Thêm suất chiếu mới thành công",
      });
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
    setSubmitted(false);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Xóa suất chiếu?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Xóa luôn",
      cancelButtonText: "Hủy",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShowtime(id));
        Swal.fire({
          title: "Đã xóa!",
          text: "Suất chiếu đã bị xóa.",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#dc2626",
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Quản Lý Lịch Chiếu
          </h1>
          <p className="text-gray-400">
            Điều chỉnh thời gian và phòng chiếu cho hệ thống rạp
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm suất chiếu</span>
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 mb-6 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-800 px-4 py-2.5 rounded-lg border border-gray-700">
            <Calendar className="w-5 h-5 text-red-500" />
            <span className="text-gray-400 text-sm font-medium">
              Lọc theo ngày:
            </span>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none focus:ring-0 font-medium"
            />
          </div>
          <div className="ml-auto text-gray-400 text-sm">
            Hiển thị{" "}
            <span className="text-white font-bold">
              {filteredShowtimes.length}
            </span>{" "}
            suất chiếu
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  Phim
                </th>
                <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  Rạp & Phòng
                </th>
                <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  Giá vé
                </th>
                <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredShowtimes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-gray-500 flex flex-col items-center justify-center"
                  >
                    <Calendar className="w-12 h-12 mb-3 opacity-20" />
                    <span className="text-lg">
                      Không có suất chiếu nào trong ngày này
                    </span>
                  </td>
                </tr>
              ) : (
                filteredShowtimes.map((showtime) => (
                  <tr
                    key={showtime.id}
                    className="hover:bg-gray-800/50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-medium text-base block group-hover:text-red-400 transition-colors">
                        {showtime.movie}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-200 font-medium">
                          {showtime.theater}
                        </span>
                        <span className="text-gray-500 text-sm mt-1 bg-gray-800 inline-block w-fit px-2 py-0.5 rounded border border-gray-700">
                          {showtime.screen}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-lg w-fit border border-gray-700/50">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="font-mono text-sm">
                          {showtime.startTime} - {showtime.endTime}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-red-400 font-semibold">
                      {showtime.price.toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={getOccupancyColor(
                            showtime.availableSeats,
                            showtime.totalSeats
                          )}
                        >
                          {showtime.availableSeats}/{showtime.totalSeats}
                        </span>
                        <span className="text-xs text-gray-500">ghế trống</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(showtime)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                          title="Sửa"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(showtime.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Xóa"
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

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden transform transition-all">
            <div className="border-b border-gray-800 px-6 py-5 flex justify-between items-center bg-gray-900">
              <h2 className="text-xl font-bold text-white">
                {editingShowtime
                  ? "Cập Nhật Suất Chiếu"
                  : "Thêm Suất Chiếu Mới"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Phim <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.movie}
                    onChange={(e) =>
                      setForm({ ...form, movie: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.movie
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  >
                    <option value="">-- Chọn phim --</option>
                    <option>Avengers: Endgame</option>
                    <option>Spider-Man: No Way Home</option>
                    <option>The Batman</option>
                    <option>Avatar: The Way of Water</option>
                    <option>Deadpool & Wolverine</option>
                  </select>
                  {submitted && !form.movie && (
                    <p className="text-red-500 text-xs mt-1">
                      Vui lòng chọn phim
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Rạp <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.theater}
                    onChange={(e) =>
                      setForm({ ...form, theater: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.theater
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  >
                    <option value="">-- Chọn rạp --</option>
                    <option>CGV Vincom Center</option>
                    <option>Lotte Cinema Keangnam</option>
                    <option>Galaxy Cinema Nguyễn Du</option>
                    <option>Beta Cinemas Thanh Xuân</option>
                  </select>
                  {submitted && !form.theater && (
                    <p className="text-red-500 text-xs mt-1">
                      Vui lòng chọn rạp
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Phòng chiếu <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.screen}
                    onChange={(e) =>
                      setForm({ ...form, screen: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.screen
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  >
                    <option value="">-- Chọn phòng --</option>
                    <option>Phòng 1 (120 ghế - 2D)</option>
                    <option>Phòng 2 (150 ghế - 3D)</option>
                    <option>Phòng VIP (80 ghế - IMAX)</option>
                  </select>
                  {submitted && !form.screen && (
                    <p className="text-red-500 text-xs mt-1">
                      Vui lòng chọn phòng
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Ngày chiếu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all placeholder-gray-500 ${
                      submitted && !form.date
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  />
                  {submitted && !form.date && (
                    <p className="text-red-500 text-xs mt-1">Chọn ngày chiếu</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Giờ bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({ ...form, startTime: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.startTime
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  />
                  {submitted && !form.startTime && (
                    <p className="text-red-500 text-xs mt-1">Chọn giờ</p>
                  )}
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Giá vé (VNĐ) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all pl-4 ${
                        submitted && (!form.price || Number(form.price) < 10000)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="Ví dụ: 75000"
                      min="10000"
                    />
                    <span className="absolute right-4 top-3.5 text-gray-500 font-medium">
                      ₫
                    </span>
                  </div>
                  {submitted && !form.price && (
                    <p className="text-red-500 text-xs mt-1">Nhập giá vé</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSubmitted(false);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-colors font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 font-bold"
                >
                  {editingShowtime ? "Lưu Thay Đổi" : "Tạo Suất Chiếu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
