import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, Clock, AlertCircle } from "lucide-react";

export function ShowtimesManagement() {
  const [showtimes] = useState([
    {
      id: 1,
      movie: "Avengers: Endgame",
      theater: "CGV Vincom Center",
      screen: "Phòng 1",
      date: "2025-12-10",
      startTime: "10:00",
      endTime: "13:01",
      price: 75000,
      availableSeats: 85,
      totalSeats: 120,
      status: "active",
    },
    {
      id: 2,
      movie: "Avengers: Endgame",
      theater: "CGV Vincom Center",
      screen: "Phòng 1",
      date: "2025-12-10",
      startTime: "13:30",
      endTime: "16:31",
      price: 90000,
      availableSeats: 110,
      totalSeats: 120,
      status: "active",
    },
    {
      id: 3,
      movie: "Spider-Man: No Way Home",
      theater: "Lotte Cinema Keangnam",
      screen: "Phòng 2",
      date: "2025-12-10",
      startTime: "14:00",
      endTime: "16:28",
      price: 85000,
      availableSeats: 142,
      totalSeats: 180,
      status: "active",
    },
    {
      id: 4,
      movie: "The Batman",
      theater: "Galaxy Cinema Nguyễn Du",
      screen: "Phòng 1",
      date: "2025-12-10",
      startTime: "19:30",
      endTime: "22:26",
      price: 100000,
      availableSeats: 35,
      totalSeats: 100,
      status: "active",
    },
    {
      id: 5,
      movie: "Avatar 2",
      theater: "CGV Vincom Center",
      screen: "Phòng VIP",
      date: "2025-12-10",
      startTime: "20:00",
      endTime: "23:12",
      price: 150000,
      availableSeats: 68,
      totalSeats: 80,
      status: "active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState("2025-12-10");

  const filteredShowtimes = showtimes.filter((s) => s.date === filterDate);

  const getOccupancyColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage >= 80) return "text-red-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý lịch chiếu</h1>
          <p className="text-gray-600">
            Tạo và quản lý lịch chiếu phim cho các rạp
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm suất chiếu
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200 flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <span className="text-gray-600">
            {filteredShowtimes.length} suất chiếu
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Phim</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Rạp & Phòng
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Giờ chiếu</th>
                <th className="px-6 py-4 text-left text-gray-600">Giá vé</th>
                <th className="px-6 py-4 text-left text-gray-600">Ghế trống</th>
                <th className="px-6 py-4 text-right text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShowtimes.map((showtime) => (
                <tr key={showtime.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{showtime.movie}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{showtime.theater}</p>
                    <p className="text-sm text-gray-500">{showtime.screen}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <Clock className="w-4 h-4" />
                      {showtime.startTime} - {showtime.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {showtime.price.toLocaleString()} ₫
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
                      {showtime.availableSeats < 20 && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-gray-900">Thêm suất chiếu mới</h2>
            </div>
            <form className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p>Hệ thống sẽ tự động kiểm tra xung đột lịch chiếu</p>
                  <p className="text-yellow-600 mt-1">
                    Đảm bảo phòng chiếu không trùng thời gian với suất chiếu
                    khác
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Chọn phim *</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option value="">Chọn phim</option>
                  <option value="1">Avengers: Endgame</option>
                  <option value="2">Spider-Man: No Way Home</option>
                  <option value="3">The Batman</option>
                  <option value="4">Avatar 2</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Chọn rạp *</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Chọn rạp</option>
                    <option value="1">CGV Vincom Center</option>
                    <option value="2">Lotte Cinema Keangnam</option>
                    <option value="3">Galaxy Cinema Nguyễn Du</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Chọn phòng *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Chọn phòng</option>
                    <option value="1">Phòng 1 (120 ghế - 2D)</option>
                    <option value="2">Phòng 2 (150 ghế - 3D)</option>
                    <option value="3">Phòng VIP (80 ghế - IMAX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Ngày chiếu *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Giờ bắt đầu *
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Giá vé (₫) *</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="75000"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Giá cơ bản, sẽ tính thêm phụ phí theo loại ghế
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tạo suất chiếu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
