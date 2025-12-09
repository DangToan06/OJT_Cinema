import { useState } from "react";
import { Search, Ban, CheckCircle, Eye, Mail, Phone } from "lucide-react";

export function UsersManagement() {
  const [users] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0912345678",
      joinDate: "2025-01-15",
      totalBookings: 15,
      totalSpent: 1850000,
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0923456789",
      joinDate: "2025-02-20",
      totalBookings: 8,
      totalSpent: 980000,
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0934567890",
      joinDate: "2025-03-10",
      totalBookings: 22,
      totalSpent: 2750000,
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0945678901",
      joinDate: "2025-01-05",
      totalBookings: 3,
      totalSpent: 450000,
      status: "Bị chặn",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      phone: "0956789012",
      joinDate: "2025-04-12",
      totalBookings: 12,
      totalSpent: 1560000,
      status: "Hoạt động",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.status === "Hoạt động") ||
      (filterStatus === "banned" && user.status === "Bị chặn");
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "Hoạt động"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
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
                <th className="px-6 py-4 text-left text-gray-600">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Liên hệ</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Ngày tham gia
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Đặt vé</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Tổng chi tiêu
                </th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900">{user.name}</p>
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
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {user.totalBookings} vé
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {user.totalSpent.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {user.status === "Hoạt động" ? (
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Chặn người dùng"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mở chặn"
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
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Chi tiết người dùng</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl">
                    {selectedUser.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900">{selectedUser.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      selectedUser.status
                    )}`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày tham gia</p>
                  <p className="text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng vé đã đặt</p>
                  <p className="text-gray-900">
                    {selectedUser.totalBookings} vé
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Tổng chi tiêu</p>
                  <p className="text-gray-900 text-xl">
                    {selectedUser.totalSpent.toLocaleString()} ₫
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-900 mb-3">Lịch sử đặt vé gần đây</h4>
                <div className="space-y-2">
                  {[
                    {
                      movie: "Avengers: Endgame",
                      date: "2025-12-05",
                      seats: 2,
                      amount: 150000,
                    },
                    {
                      movie: "Spider-Man",
                      date: "2025-11-28",
                      seats: 1,
                      amount: 85000,
                    },
                    {
                      movie: "The Batman",
                      date: "2025-11-20",
                      seats: 2,
                      amount: 180000,
                    },
                  ].map((booking, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-gray-900">{booking.movie}</p>
                        <p className="text-sm text-gray-500">
                          {booking.date} · {booking.seats} ghế
                        </p>
                      </div>
                      <p className="text-gray-900">
                        {booking.amount.toLocaleString()} ₫
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedUser(null)}
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
