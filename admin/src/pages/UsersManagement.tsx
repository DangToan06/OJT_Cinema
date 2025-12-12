import { useEffect, useState } from "react";
import { Search, Ban, CheckCircle, Eye, Mail, Phone, X } from "lucide-react";
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

  const filteredUsers = users.filter((user) => {
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
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
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

  // Mở modal xác nhận
  const openConfirmModal = (user: User, action: "block" | "unblock") => {
    setConfirmModal({
      isOpen: true,
      userId: user.id,
      userName: `${user.first_name} ${user.last_name}`,
      action,
    });
  };

  // Xử lý xác nhận block/unblock
  const handleConfirmAction = async () => {
    if (!confirmModal.userId || !confirmModal.action) return;

    if (confirmModal.action === "block") {
      await dispatch(blockUser(confirmModal.userId));
    } else {
      await dispatch(unblockUser(confirmModal.userId));
    }

    // Refetch dữ liệu sau khi thay đổi
    dispatch(getAllUser());
    setConfirmModal({ isOpen: false, userId: null, userName: "", action: null });
  };

  // Đóng modal xác nhận
  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, userId: null, userName: "", action: null });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2 font-bold text-2xl">
          Quản lý người dùng
        </h1>
        <p className="text-gray-600">
          Xem và quản lý thông tin người dùng hệ thống
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="banned">Bị chặn</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Người dùng</th>
                <th className="px-6 py-4 text-left text-gray-600">Liên hệ</th>
                <th className="px-6 py-4 text-left text-gray-600">Ngày tham gia</th>
                <th className="px-6 py-4 text-left text-gray-600">Đặt vé</th>
                <th className="px-6 py-4 text-left text-gray-600">Tổng chi tiêu</th>
                <th className="px-6 py-4 text-left text-gray-600">Trạng thái</th>
                <th className="px-6 py-4 text-right text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.first_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-gray-500">ID: #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {user.phone || "Chưa cung cấp"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {calculateUserBooking(user.id, bookings).totalTickets} vé
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {calculateUserBooking(user.id, bookings).totalSpent.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {user.status === "ACTIVE" ? (
                        <button
                          onClick={() => openConfirmModal(user, "block")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Chặn người dùng"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => openConfirmModal(user, "unblock")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
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
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-gray-900 font-bold text-xl">Chi tiết người dùng</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl font-bold">
                    {selectedUser.first_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div><p className="text-sm text-gray-600">Email</p><p className="text-gray-900">{selectedUser.email}</p></div>
                <div><p className="text-sm text-gray-600">Số điện thoại</p><p className="text-gray-900">{selectedUser.phone || "Chưa cung cấp"}</p></div>
                <div><p className="text-sm text-gray-600">Địa chỉ</p><p className="text-gray-900">{selectedUser.address || "Chưa cung cấp"}</p></div>
                <div><p className="text-sm text-gray-600">Ngày tham gia</p><p className="text-gray-900">{new Date(selectedUser.created_at).toLocaleDateString("vi-VN")}</p></div>
                <div><p className="text-sm text-gray-600">Tổng vé đã đặt</p><p className="text-gray-900 font-bold text-lg">{calculateUserBooking(selectedUser.id, bookings).totalTickets} vé</p></div>
                <div><p className="text-sm text-gray-600">Tổng chi tiêu</p><p className="text-gray-900 font-bold text-xl text-red-600">{calculateUserBooking(selectedUser.id, bookings).totalSpent.toLocaleString()} ₫</p></div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-gray-900 font-semibold mb-4 text-lg">
                  Lịch sử đặt vé ({bookings.filter(b => b.user_id === selectedUser.id).length} lượt)
                </h4>
                {bookings.filter(b => b.user_id === selectedUser.id).length === 0 ? (
                  <p className="text-gray-500 italic">Chưa có lịch sử đặt vé.</p>
                ) : (
                  <div className="space-y-3">
                    {bookings
                      .filter(b => b.user_id === selectedUser.id)
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .map((booking) => (
                        <div key={booking.id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Booking #{booking.id} (Suất chiếu: {booking.showtime_id})</p>
                            <p className="text-sm text-gray-600">Ngày đặt: {new Date(booking.created_at).toLocaleString("vi-VN")}</p>
                            <p className="text-sm text-gray-600">{booking.total_seat} ghế</p>
                          </div>
                          <p className="text-lg font-bold text-red-600">{booking.total_price_movie.toLocaleString()} ₫</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {confirmModal.action === "block" ? "Chặn người dùng" : "Mở chặn người dùng"}
              </h3>
              <button
                onClick={closeConfirmModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-700 mb-6">
              Bạn có chắc muốn <strong>{confirmModal.action === "block" ? "chặn" : "mở chặn"}</strong> người dùng:
              <br />
              <span className="font-semibold text-lg">{confirmModal.userName}</span> không?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirmModal}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${
                  confirmModal.action === "block"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {confirmModal.action === "block" ? "Chặn" : "Mở chặn"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}