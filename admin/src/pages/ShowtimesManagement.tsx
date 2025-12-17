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
import { fetchMovies, updateMovie } from "../api/movie.api";
import { getAllTheaters } from "../api/theater.api";
import { getAllScreens } from "../api/screen.api";
import { v4 as uuid } from "uuid";

interface ShowtimeForm {
  movie: string;
  theater: string;
  screen: string;
  date: string;
  startTime: string;
}
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export function ShowtimesManagement() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: showtimes } = useSelector(
    (state: RootState) => state.showtimes
  );
  const { data: movies } = useSelector((state: RootState) => state.movie);
  const { theaters = [] } = useSelector(
    (state: RootState) => state.theater || { theaters: [], loading: false }
  );
  const { screens = [] } = useSelector(
    (state: RootState) => state.screens || { screens: [], loading: false }
  );

  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<ShowtimeForm | null>(
    null
  );
  const [filterDate, setFilterDate] = useState(() => formatDate(new Date()));

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<ShowtimeForm>({
    movie: "",
    theater: "",
    screen: "",
    date: "",
    startTime: "",
  });

  useEffect(() => {
    dispatch(fetchShowtimes());
    dispatch(
      fetchMovies({
        page: 1,
        pageSize: 100,
        search: "",
        status: "",
      })
    );
    dispatch(getAllTheaters());
    dispatch(getAllScreens());
  }, [dispatch]);

  const availableScreens = form.theater
    ? screens.filter(
        (s: any) => s.theater === form.theater && s.status === "Đang hoạt động"
      )
    : [];

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
    });
    setShowModal(true);
  };

  const openEditModal = (showtime: ShowtimeForm) => {
    setEditingShowtime(showtime);
    setForm({
      movie: showtime.movie,
      theater: showtime.theater,
      screen: showtime.screen,
      date: showtime.date,
      startTime: showtime.startTime,
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
      !form.startTime
    ) {
      return;
    }

    const selectedScreen = screens.find(
      (s: any) => s.name === form.screen && s.theater === form.theater
    );
    const totalSeats = selectedScreen?.capacity || 120;

    const timeToMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const selectedMovie = movies.find((m) => m.title === form.movie);
    const movieDuration = selectedMovie?.duration || 180;
    const startMinutes = timeToMinutes(form.startTime);
    const endMinutes = startMinutes + movieDuration;
    const endHoursStr = Math.floor(endMinutes / 60)
      .toString()
      .padStart(2, "0");
    const endMinutesStr = (endMinutes % 60).toString().padStart(2, "0");
    const endTime = `${endHoursStr}:${endMinutesStr}`;

    const toastMixin = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      background: "#1f2937",
      color: "#fff",
    });

    const existingShowsInRoom = showtimes.filter((show) => {
      const isSameRoomAndDate =
        show.theater === form.theater &&
        show.screen === form.screen &&
        show.date === form.date;

      const isNotCurrentEditing = editingShowtime
        ? show.id !== editingShowtime.id
        : true;

      return isSameRoomAndDate && isNotCurrentEditing;
    });

    if (existingShowsInRoom.length > 0) {
      const existingMovieName = existingShowsInRoom[0].movie;

      if (existingMovieName !== form.movie) {
        toastMixin.fire({
          icon: "error",
          title: `Phòng ${form.screen} ngày ${form.date} đang chiếu phim "${existingMovieName}". Không thể thêm phim "${form.movie}"!`,
        });
        return;
      }
    }

    const hasTimeConflict = existingShowsInRoom.some((existingShow) => {
      const existingStart = timeToMinutes(existingShow.startTime);
      const existingEnd = timeToMinutes(existingShow.endTime);

      return startMinutes < existingEnd && endMinutes > existingStart;
    });

    if (hasTimeConflict) {
      toastMixin.fire({
        icon: "error",
        title: "Lỗi: Khung giờ này bị trùng với một suất chiếu khác!",
      });
      return;
    }

    const payload = {
      movie: form.movie,
      theater: form.theater,
      screen: form.screen,
      date: form.date,
      startTime: form.startTime,
      endTime,
      availableSeats: totalSeats,
      totalSeats,
      status: "active",
    };

    try {
      if (editingShowtime) {
        await dispatch(
          updateShowtime({ id: editingShowtime.id, data: payload })
        ).unwrap();
        toastMixin.fire({
          icon: "success",
          title: "Cập nhật suất chiếu thành công",
        });
      } else {
        const newShowtime = { id: uuid(), ...payload };
        const movieAddShow = movies.find((m) => m.title === newShowtime.movie);
        if (movieAddShow) {
          const updatedMovieData = {
            ...movieAddShow,
            showtimes: [newShowtime.id, ...movieAddShow.showtimes],
          };
          dispatch(
            updateMovie({
              id: updatedMovieData.id,
              movieData: updatedMovieData,
            })
          );
        }

        await dispatch(createShowtime(newShowtime)).unwrap();
        toastMixin.fire({
          icon: "success",
          title: "Thêm suất chiếu mới thành công",
        });
      }

      setShowModal(false);
      setForm({ movie: "", theater: "", screen: "", date: "", startTime: "" });
      setEditingShowtime(null);
      setSubmitted(false);
    } catch (error) {
      toastMixin.fire({ icon: "error", title: `Có lỗi xảy ra: ${error}` });
    }
  };

  const handleDelete = (id: string) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const showtimeToDelete = showtimes.find((s) => s.id === id);

        if (showtimeToDelete) {
          const relatedMovie = movies.find(
            (m) => m.title === showtimeToDelete.movie
          );

          if (relatedMovie) {
            const updatedShowtimeList = relatedMovie.showtimes.filter(
              (showtimeId) => showtimeId !== id
            );

            const updatedMovieData = {
              ...relatedMovie,
              showtimes: updatedShowtimeList,
            };

            dispatch(
              updateMovie({
                id: relatedMovie.id,
                movieData: updatedMovieData,
              })
            );
          }
        }

        await dispatch(deleteShowtime(id)).unwrap();

        Swal.fire({
          title: "Đã xóa!",
          text: "Suất chiếu đã bị xóa khỏi hệ thống và lịch chiếu của phim.",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#dc2626",
        });
      }
    });
  };

  // const isLoading =
  //   showtimesLoading ||
  //   // movieStatus === "loading"
  //   theaterLoading ||
  //   screensLoading;

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      {/* Header */}
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

      {/* Filter theo ngày */}
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

      {/* Bảng danh sách suất chiếu */}
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
                    colSpan={5}
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

      {/* Modal thêm/sửa suất chiếu */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
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
              className="p-8 space-y-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phim */}
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
                    {movies.map((movie) => (
                      <option key={movie.id} value={movie.title}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                  {submitted && !form.movie && (
                    <p className="text-red-500 text-xs mt-1">
                      Vui lòng chọn phim
                    </p>
                  )}
                </div>

                {/* Rạp */}
                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Rạp <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.theater}
                    onChange={(e) =>
                      setForm({ ...form, theater: e.target.value, screen: "" })
                    }
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.theater
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  >
                    <option value="">-- Chọn rạp --</option>
                    {theaters.map((theater) => (
                      <option key={theater.id} value={theater.name}>
                        {theater.name}
                      </option>
                    ))}
                  </select>
                  {submitted && !form.theater && (
                    <p className="text-red-500 text-xs mt-1">
                      Vui lòng chọn rạp
                    </p>
                  )}
                </div>

                {/* Phòng chiếu */}
                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Phòng chiếu <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.screen}
                    onChange={(e) =>
                      setForm({ ...form, screen: e.target.value })
                    }
                    disabled={!form.theater || availableScreens.length === 0}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.screen
                        ? "border-red-500"
                        : "border-gray-700"
                    } ${
                      !form.theater || availableScreens.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <option value="">
                      {form.theater
                        ? availableScreens.length > 0
                          ? "-- Chọn phòng --"
                          : "Không có phòng khả dụng"
                        : "-- Chọn rạp trước --"}
                    </option>
                    {availableScreens.map((screen) => (
                      <option key={screen.id} value={screen.name}>
                        {screen.name} ({screen.capacity} ghế -{" "}
                        {screen.type || "Standard"})
                      </option>
                    ))}
                  </select>
                  {submitted && !form.screen && (
                    <p className="text-red-500 text-xs mt-1">
                      Vui lòng chọn phòng
                    </p>
                  )}
                  {form.theater && availableScreens.length === 0 && (
                    <p className="text-yellow-500 text-xs mt-1">
                      Rạp này chưa có phòng hoạt động
                    </p>
                  )}
                </div>

                {/* Ngày chiếu */}
                <div>
                  <label className="block text-gray-400 mb-2 font-medium text-sm">
                    Ngày chiếu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${
                      submitted && !form.date
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
                  />
                  {submitted && !form.date && (
                    <p className="text-red-500 text-xs mt-1">Chọn ngày chiếu</p>
                  )}
                </div>

                {/* Giờ bắt đầu */}
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
                    <p className="text-red-500 text-xs mt-1">
                      Chọn giờ bắt đầu
                    </p>
                  )}
                </div>
              </div>

              {/* Nút hành động */}
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
