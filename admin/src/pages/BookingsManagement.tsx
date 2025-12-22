import { useEffect, useState } from "react";
import { Search, Download, Eye, X, CreditCard } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { getAllHistoryPayment } from "../api/historyPayment.api";
import type { Payment } from "../util/type.util";
import type { Seat } from "../interfaces/seat.interface";
import { getAllUser } from "../api/user.api";
import type { User } from "../interfaces/user.interface";

export function BookingsManagement() {
  const dispatch = useAppDispatch();
  const { data: bookings, status: bookingStatus } = useAppSelector(
    (state) => state.history
  );
  const { data: users } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (bookings.length === 0) {
      dispatch(getAllHistoryPayment());
    }
  }, [bookings.length, dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUser());
    }
  }, [users.length, dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Payment | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const term = searchTerm.toLowerCase();
    const id = booking.id ? booking.id.toString() : "";
    const nameFilm = booking.nameFilm ? booking.nameFilm.toLowerCase() : "";
    const paymentMethod = booking.paymentMethod
      ? booking.paymentMethod.toLowerCase()
      : "";

    return (
      id.includes(term) ||
      nameFilm.includes(term) ||
      paymentMethod.includes(term)
    );
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSeats = (seats: Seat[]) => {
    if (!seats || seats.length === 0) return "Chưa chọn ghế";
    return seats.map((s) => `${s.row}${s.number}`).join(", ");
  };

  const displayUsser = (user: User[], id: string) => {
    if (id === "" || !id) return "Không có người nào dặt ghế này";
    const nameUser = user.find((u) => u.id.toString() === id);
    if (nameUser) return nameUser.first_name + " " + nameUser.last_name;
    return id; // Fallback nếu không tìm thấy tên
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100 font-sans">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
              Lịch sử Thanh toán
            </h1>
            <p className="text-gray-400">
              Quản lý các giao dịch đặt vé từ khách hàng
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-red-600/20 font-medium">
            <Download className="w-5 h-5" />
            Xuất báo cáo
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo Mã đơn, Phim..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {bookingStatus === "pending" ? (
              <div className="p-8 text-center text-gray-400">
                Đang tải dữ liệu...
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Mã đơn / Ngày
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Phim
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Ghế đã đặt
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Thanh toán
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-700/30 transition-colors duration-150 group"
                    >
                      {/* Cột 1: Mã đơn & Ngày */}
                      <td className="px-6 py-4">
                        <p className="text-white font-bold">BK{booking.id}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(booking.bookingDate)}
                        </p>
                      </td>

                      {/* Cột 2: Tên phim */}
                      <td className="px-6 py-4 text-white font-medium">
                        {booking.nameFilm}
                      </td>

                      {/* Cột 3: Khách hàng */}
                      <td className="px-6 py-4">
                        <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300 inline-block">
                          {displayUsser(users, booking.userId)}
                        </span>
                      </td>

                      {/* Cột 4: Ghế */}
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm break-words max-w-[150px]">
                          {formatSeats(booking.seatBooked)}
                        </p>
                        <p
                          className="text-[10px] text-gray-500 mt-1 truncate max-w-[120px]"
                          title={booking.showTimeId}
                        >
                          Suất: {booking.showTimeId}
                        </p>
                      </td>

                      {/* Cột 5: Thanh toán */}
                      <td className="px-6 py-4">
                        <p className="text-red-400 font-bold text-base">
                          {booking.totalAmount?.toLocaleString()} ₫
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <CreditCard className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-300 uppercase">
                            {booking.paymentMethod}
                          </span>
                        </div>
                      </td>

                      {/* Cột 6: Thao tác */}
                      <td className="px-6 py-4">
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
            )}

            {filteredBookings.length === 0 && bookingStatus !== "pending" && (
              <div className="p-12 text-center text-gray-500">
                Không tìm thấy giao dịch nào phù hợp.
              </div>
            )}
          </div>
        </div>

        {/* Modal - Giữ nguyên logic */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-white text-xl font-bold">
                  Chi tiết giao dịch #{selectedBooking.id}
                </h2>
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
                    <p className="text-sm text-gray-500">Tổng thanh toán</p>
                    <p className="text-red-500 text-2xl font-bold tracking-wide">
                      {selectedBooking.totalAmount?.toLocaleString()} ₫
                    </p>
                  </div>
                  <span className="px-4 py-2 rounded-full font-medium text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                    {selectedBooking.paymentMethod}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Tên phim</p>
                    <p className="text-white font-medium text-lg">
                      {selectedBooking.nameFilm}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Khách hàng</p>
                    <p className="text-white">
                      {displayUsser(users, selectedBooking.userId)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Thời gian đặt</p>
                    <p className="text-white">
                      {formatDate(selectedBooking.bookingDate)}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">
                      Mã suất chiếu (ShowTime ID)
                    </p>
                    <p className="text-white font-mono text-sm bg-gray-900 p-2 rounded border border-gray-700">
                      {selectedBooking.showTimeId}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-2">Chi tiết ghế</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.seatBooked?.map((seat, index) => (
                        <div
                          key={index}
                          className="bg-gray-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2 border border-gray-600"
                        >
                          <span className="font-bold text-red-400">
                            {seat.row}
                            {seat.number}
                          </span>
                          <span className="text-xs text-gray-400 capitalize border-l border-gray-600 pl-2">
                            {seat.type}
                          </span>
                        </div>
                      ))}
                    </div>
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
