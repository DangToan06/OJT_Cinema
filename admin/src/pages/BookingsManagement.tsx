import { useState } from "react";
import { Search, Filter, Download, Eye } from "lucide-react";

export function BookingsManagement() {
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
        return "bg-green-100 text-green-700";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-700";
      case "Đã hủy":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2 font-bold text-2xl">
            Quản lý đặt vé
          </h1>
          <p className="text-gray-600">Xem và quản lý tất cả các đơn đặt vé</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-5 h-5" />
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, khách hàng, phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
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
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Mã đơn</th>
                <th className="px-6 py-4 text-left text-gray-600">Phim</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Rạp & Phòng
                </th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Suất chiếu
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Ghế</th>
                <th className="px-6 py-4 text-left text-gray-600">Tổng tiền</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{booking.id}</p>
                    <p className="text-xs text-gray-500">
                      {booking.bookingDate}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{booking.movie}</td>
                  <td className="px-6 py-4 text-gray-900">{booking.user}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{booking.theater}</p>
                    <p className="text-sm text-gray-500">{booking.screen}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.showtime}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {booking.seats.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {booking.totalAmount.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Tổng đơn hôm nay</p>
          <p className="text-gray-900">125 đơn</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Đã thanh toán</p>
          <p className="text-green-600">98 đơn</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Đang xử lý</p>
          <p className="text-yellow-600">15 đơn</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Đã hủy</p>
          <p className="text-red-600">12 đơn</p>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Chi tiết đơn đặt vé</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mã đơn hàng</p>
                  <p className="text-gray-900 text-xl">{selectedBooking.id}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full ${getStatusColor(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phim</p>
                  <p className="text-gray-900">{selectedBooking.movie}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Khách hàng</p>
                  <p className="text-gray-900">{selectedBooking.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rạp chiếu</p>
                  <p className="text-gray-900">{selectedBooking.theater}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phòng chiếu</p>
                  <p className="text-gray-900">{selectedBooking.screen}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Suất chiếu</p>
                  <p className="text-gray-900">{selectedBooking.showtime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Số ghế</p>
                  <p className="text-gray-900">
                    {selectedBooking.seats.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thời gian đặt</p>
                  <p className="text-gray-900">{selectedBooking.bookingDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng tiền</p>
                  <p className="text-gray-900 text-xl">
                    {selectedBooking.totalAmount.toLocaleString()} ₫
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
