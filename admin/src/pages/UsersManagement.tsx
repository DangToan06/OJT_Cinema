import { useEffect, useState } from "react";
import {
  Search,
  Ban,
  CheckCircle,
  Eye,
  Mail,
  Phone,
  X,
  User as UserIcon,
  Calendar,
  Ticket,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { blockUser, getAllUser, unblockUser } from "../api/user.api";
import { getAllBooking } from "../api/booking.api";
import type { Booking } from "../interfaces/booking.interface";
import type { User } from "../interfaces/user.interface";

export function UsersManagement() {
  const { data: users } = useAppSelector((store) => store.user);
  const { data: bookings } = useAppSelector((store) => store.booking);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllBooking());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    userId: number | null;
    userName: string;
    action: "block" | "unblock" | null;
  }>({
    isOpen: false,
    userId: null,
    userName: "",
    action: null,
  });

  const filteredUsers = users
  .filter((user) => user.role.role_name !== "admin")
  .filter((user) => {
    const matchesSearch =
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.status === "ACTIVE") ||
      (filterStatus === "banned" && user.status === "BLOCKED");

    return matchesSearch && matchesStatus;
  });


  const getStatusColor = (status: string) => {
    return status === "ACTIVE"
      ? "bg-green-500/10 text-green-400 border border-green-500/20"
      : "bg-red-500/10 text-red-400 border border-red-500/20";
  };

  const calculateUserBooking = (
    userId: number | string | undefined,
    bookings: Booking[]
  ): { totalTickets: number; totalSpent: number } => {
    const userBookings = bookings.filter((b) => b.user_id === userId);
    const totalTickets = userBookings.reduce(
      (sum, booking) => sum + booking.total_seat,
      0
    );
    const totalSpent = userBookings.reduce(
      (sum, booking) => sum + booking.total_price_movie,
      0
    );
    return { totalSpent, totalTickets };
  };

  const openConfirmModal = (user: User, action: "block" | "unblock") => {
    setConfirmModal({
      isOpen: true,
      userId: user.id,
      userName: `${user.first_name} ${user.last_name}`,
      action,
    });
  };

  const handleConfirmAction = async () => {
    if (!confirmModal.userId || !confirmModal.action) return;

    if (confirmModal.action === "block") {
      await dispatch(blockUser(confirmModal.userId));
    } else {
      await dispatch(unblockUser(confirmModal.userId));
    }

    dispatch(getAllUser());
    setConfirmModal({
      isOpen: false,
      userId: null,
      userName: "",
      action: null,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      userId: null,
      userName: "",
      action: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mb-8">
        <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
          Quản lý người dùng
        </h1>
        <p className="text-gray-400 text-lg">
          Xem và quản lý thông tin khách hàng thành viên
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 mb-6 p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder-gray-600"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all cursor-pointer hover:border-gray-700"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="banned">Bị chặn</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Vé đã mua
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Chi tiêu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-800/50 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                        <span className="text-red-500 font-bold text-sm">
                          {user.first_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm group-hover:text-red-500 transition-colors">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-gray-500">ID: #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="w-3.5 h-3.5 text-gray-600" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone className="w-3.5 h-3.5 text-gray-600" />
                        {user.phone || "---"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(user.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700">
                      {calculateUserBooking(user.id, bookings).totalTickets}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-red-500">
                    {calculateUserBooking(
                      user.id,
                      bookings
                    ).totalSpent.toLocaleString()}{" "}
                    ₫
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status === "ACTIVE" ? "Hoạt động" : "Đã chặn"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-all"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {user.status === "ACTIVE" ? (
                        <button
                          onClick={() => openConfirmModal(user, "block")}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-all"
                          title="Chặn người dùng"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => openConfirmModal(user, "unblock")}
                          className="p-2 text-gray-400 hover:text-green-500 hover:bg-gray-800 rounded-lg transition-all"
                          title="Mở chặn người dùng"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Không tìm thấy người dùng nào phù hợp.
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-800 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900">
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-red-600" />
                Hồ sơ người dùng
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-red-500 hover:bg-gray-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 shrink-0">
                  {selectedUser.avatar ? (
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.first_name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-700 shadow-lg flex items-center justify-center">
                      <span className="text-red-600 text-3xl font-bold">
                        {selectedUser.first_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        selectedUser.status
                      )}`}
                    >
                      {selectedUser.status === "ACTIVE"
                        ? "Hoạt động"
                        : "Đã chặn"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                      ID: #{selectedUser.id}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                  <div className="text-center px-4 border-r border-gray-700">
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Vé đã mua
                    </p>
                    <p className="text-xl font-bold text-white mt-1">
                      {
                        calculateUserBooking(selectedUser.id, bookings)
                          .totalTickets
                      }
                    </p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Tổng chi tiêu
                    </p>
                    <p className="text-xl font-bold text-red-500 mt-1">
                      {calculateUserBooking(
                        selectedUser.id,
                        bookings
                      ).totalSpent.toLocaleString()}{" "}
                      ₫
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-800/30 rounded-xl border border-gray-800">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-gray-200 font-medium">
                    {selectedUser.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Số điện thoại
                  </p>
                  <p className="text-gray-200 font-medium">
                    {selectedUser.phone || "Chưa cập nhật"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Địa chỉ
                  </p>
                  <p className="text-gray-200 font-medium">
                    {selectedUser.address || "Chưa cập nhật"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Ngày tham gia
                  </p>
                  <p className="text-gray-200 font-medium">
                    {new Date(selectedUser.created_at).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-red-500" />
                  Lịch sử giao dịch
                  <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full text-xs border border-gray-700">
                    {
                      bookings.filter((b) => b.user_id === selectedUser.id)
                        .length
                    }
                  </span>
                </h4>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {bookings.filter((b) => b.user_id === selectedUser.id)
                    .length === 0 ? (
                    <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-dashed border-gray-700">
                      <p className="text-gray-500">Chưa có lịch sử đặt vé.</p>
                    </div>
                  ) : (
                    bookings
                      .filter((b) => b.user_id === selectedUser.id)
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 hover:border-red-500/50 rounded-xl shadow-sm transition-colors group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-200">
                                Booking #{booking.id}
                              </span>
                              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                                Showtime: {booking.showtime_id}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(booking.created_at).toLocaleString(
                                  "vi-VN"
                                )}
                              </span>
                              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                              <span>{booking.total_seat} ghế</span>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-red-500 group-hover:text-red-400 transition-colors">
                            {booking.total_price_movie.toLocaleString()} ₫
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-900 border-t border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200 border border-gray-800">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${
                confirmModal.action === "block"
                  ? "bg-red-900/20 text-red-500"
                  : "bg-green-900/20 text-green-500"
              }`}
            >
              {confirmModal.action === "block" ? (
                <Ban className="w-6 h-6" />
              ) : (
                <CheckCircle className="w-6 h-6" />
              )}
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-2">
              Xác nhận {confirmModal.action === "block" ? "chặn" : "mở chặn"}
            </h3>

            <p className="text-gray-400 text-center mb-6">
              Bạn có chắc muốn{" "}
              {confirmModal.action === "block"
                ? "chặn quyền truy cập của"
                : "khôi phục quyền truy cập cho"}
              <br />
              <span className="font-bold text-white">
                {confirmModal.userName}
              </span>
              ?
            </p>

            <div className="flex gap-3">
              <button
                onClick={closeConfirmModal}
                className="flex-1 px-4 py-2.5 border border-gray-700 bg-gray-800 rounded-lg text-gray-300 font-medium hover:bg-gray-700 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmAction}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-white shadow-sm transition-colors ${
                  confirmModal.action === "block"
                    ? "bg-red-600 hover:bg-red-700 shadow-red-900/20"
                    : "bg-green-600 hover:bg-green-700 shadow-green-900/20"
                }`}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
