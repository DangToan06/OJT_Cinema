import { TrendingUp, Users, Ticket, DollarSign } from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      label: "Tổng doanh thu tháng",
      value: "1,234,567,000 ₫",
      icon: DollarSign,
      trend: "+12.5%",
      color: "bg-green-500",
    },
    {
      label: "Vé đã bán",
      value: "15,234",
      icon: Ticket,
      trend: "+8.2%",
      color: "bg-blue-500",
    },
    {
      label: "Người dùng",
      value: "8,456",
      icon: Users,
      trend: "+15.3%",
      color: "bg-purple-500",
    },
    {
      label: "Tỷ lệ lấp đầy",
      value: "68%",
      icon: TrendingUp,
      trend: "+5.1%",
      color: "bg-orange-500",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      movie: "Avengers: Endgame",
      user: "Nguyễn Văn A",
      theater: "CGV Vincom",
      time: "19:30 - 10/12/2025",
      status: "Đã thanh toán",
      seats: "A5, A6",
    },
    {
      id: 2,
      movie: "Spider-Man: No Way Home",
      user: "Trần Thị B",
      theater: "Lotte Cinema",
      time: "20:00 - 10/12/2025",
      status: "Đã thanh toán",
      seats: "B10",
    },
    {
      id: 3,
      movie: "The Batman",
      user: "Lê Văn C",
      theater: "Galaxy Cinema",
      time: "18:00 - 10/12/2025",
      status: "Đang xử lý",
      seats: "C7, C8",
    },
    {
      id: 4,
      movie: "Avatar 2",
      user: "Phạm Thị D",
      theater: "CGV Vincom",
      time: "21:00 - 10/12/2025",
      status: "Đã thanh toán",
      seats: "VIP1",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Tổng quan hệ thống</h1>
        <p className="text-gray-600">
          Thống kê tổng quan hoạt động rạp chiếu phim
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm">{stat.trend}</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Doanh thu 7 ngày qua</h2>
          <div className="space-y-3">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => {
              const values = [45, 52, 48, 65, 72, 85, 78];
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-gray-600 w-8">{day}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-full flex items-center justify-end pr-3 text-white text-sm"
                      style={{ width: `${values[index]}%` }}
                    >
                      {values[index]}M
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Top phim bán chạy</h2>
          <div className="space-y-4">
            {[
              { title: "Avengers: Endgame", sales: 2340, revenue: "234M" },
              {
                title: "Spider-Man: No Way Home",
                sales: 2100,
                revenue: "210M",
              },
              { title: "Avatar 2", sales: 1850, revenue: "185M" },
              { title: "The Batman", sales: 1620, revenue: "162M" },
            ].map((movie, index) => (
              <div key={movie.title} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{movie.title}</p>
                  <p className="text-sm text-gray-500">{movie.sales} vé</p>
                </div>
                <p className="text-gray-900">{movie.revenue} ₫</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Đặt vé gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Phim</th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-gray-600">Rạp</th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Suất chiếu
                </th>
                <th className="px-6 py-3 text-left text-gray-600">Ghế</th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">#{booking.id}</td>
                  <td className="px-6 py-4 text-gray-900">{booking.movie}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.user}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.theater}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.time}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.seats}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "Đã thanh toán"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
