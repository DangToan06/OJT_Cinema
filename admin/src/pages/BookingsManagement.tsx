import { useState } from "react";
import { Search, Filter, Download, Eye, X } from "lucide-react";

export function BookingsManagement() {
  // Dữ liệu mẫu (Mock data)
  const [bookings] = useState([
    {
      id: "BK001",
      movie: "Avengers: Endgame",
      user: "Nguyễn Văn A",
      theater: "CGV Vincom Center",
      screen: "Phòng 1",
      showtime: "2025-12-10 19:30",
      seats: ["A5", "A6"],
      totalAmount: 180000,
      status: "Đã thanh toán",
      bookingDate: "2025-12-08 14:30",
    },
    {
      id: "BK002",
      movie: "Spider-Man: No Way Home",
      user: "Trần Thị B",
      theater: "Lotte Cinema Keangnam",
      screen: "Phòng 2",
      showtime: "2025-12-10 20:00",
      seats: ["B10"],
      totalAmount: 95000,
      status: "Đã thanh toán",
      bookingDate: "2025-12-09 10:15",
    },
    {
      id: "BK003",
      movie: "The Batman",
      user: "Lê Văn C",
      theater: "Galaxy Cinema Nguyễn Du",
      screen: "Phòng 1",
      showtime: "2025-12-10 18:00",
      seats: ["C7", "C8"],
      totalAmount: 200000,
      status: "Đang xử lý",
      bookingDate: "2025-12-10 09:00",
    },
    {
      id: "BK004",
      movie: "Avatar 2",
      user: "Phạm Thị D",
      theater: "CGV Vincom Center",
      screen: "Phòng VIP",
      showtime: "2025-12-10 21:00",
      seats: ["VIP1"],
      totalAmount: 150000,
      status: "Đã thanh toán",
      bookingDate: "2025-12-09 16:45",
    },
    {
      id: "BK005",
      movie: "Avengers: Endgame",
      user: "Hoàng Văn E",
      theater: "CGV Vincom Center",
      screen: "Phòng 2",
      showtime: "2025-12-10 15:30",
      seats: ["D1", "D2", "D3"],
      totalAmount: 270000,
      status: "Đã hủy",
      bookingDate: "2025-12-07 20:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Đang xử lý":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "Đã hủy":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-gray-700 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100 font-sans">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
              Quản lý Đặt vé
            </h1>
            <p className="text-gray-400">
              Theo dõi doanh thu và trạng thái vé theo thời gian thực
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-red-600/20 font-medium">
            <Download className="w-5 h-5" />
            Xuất báo cáo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors shadow-sm">
            <p className="text-gray-400 text-sm font-medium mb-2">
              Tổng đơn hôm nay
            </p>
            <p className="text-white font-bold text-2xl">125</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors shadow-sm">
            <p className="text-gray-400 text-sm font-medium mb-2">
              Đã thanh toán
            </p>
            <p className="text-green-400 font-bold text-2xl">98</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors shadow-sm">
            <p className="text-gray-400 text-sm font-medium mb-2">Đang xử lý</p>
            <p className="text-yellow-400 font-bold text-2xl">15</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors shadow-sm">
            <p className="text-gray-400 text-sm font-medium mb-2">Đã hủy</p>
            <p className="text-red-400 font-bold text-2xl">12</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mã đơn, khách hàng, phim..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none transition-all cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900/50 text-gray-400 uppercase tracking-wider font-medium text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Mã đơn / Ngày</th>
                  <th className="px-6 py-4 text-left">Phim</th>
                  <th className="px-6 py-4 text-left">Khách hàng</th>
                  <th className="px-6 py-4 text-left">Rạp & Phòng</th>
                  <th className="px-6 py-4 text-left">Suất & Ghế</th>
                  <th className="px-6 py-4 text-left">Tổng tiền</th>
                  <th className="px-6 py-4 text-left">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-700/30 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">{booking.id}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {booking.bookingDate}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      {booking.movie}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{booking.user}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300">{booking.theater}</p>
                      <span className="inline-block mt-1 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                        {booking.screen}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300">{booking.showtime}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Ghế:{" "}
                        <span className="text-gray-300">
                          {booking.seats.join(", ")}
                        </span>
                      </p>
                    </td>
                    <td className="px-6 py-4 text-red-400 font-bold">
                      {booking.totalAmount.toLocaleString()} ₫
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                Không tìm thấy đơn hàng nào phù hợp.
              </div>
            )}
          </div>
        </div>

        {selectedBooking && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-white text-xl font-bold">Chi tiết vé</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="text-white text-2xl font-bold tracking-wide">
                      {selectedBooking.id}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full font-medium text-sm ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phim</p>
                    <p className="text-white font-medium text-lg">
                      {selectedBooking.movie}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Khách hàng</p>
                    <p className="text-white font-medium">
                      {selectedBooking.user}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Rạp chiếu</p>
                    <p className="text-white">{selectedBooking.theater}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phòng chiếu</p>
                    <p className="text-white">{selectedBooking.screen}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Suất chiếu</p>
                    <p className="text-white">{selectedBooking.showtime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Số ghế</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.seats.map((seat: string) => (
                        <span
                          key={seat}
                          className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Thời gian đặt</p>
                    <p className="text-white">{selectedBooking.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                    <p className="text-red-500 text-2xl font-bold">
                      {selectedBooking.totalAmount.toLocaleString()} ₫
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-700 flex justify-end">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
