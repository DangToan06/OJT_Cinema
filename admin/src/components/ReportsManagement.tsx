import { useState } from "react";
import { Download, TrendingUp, Calendar } from "lucide-react";

export function ReportsManagement() {
  const [dateRange, setDateRange] = useState("7days");

  const revenueData = [
    { date: "04/12", revenue: 45000000 },
    { date: "05/12", revenue: 52000000 },
    { date: "06/12", revenue: 48000000 },
    { date: "07/12", revenue: 65000000 },
    { date: "08/12", revenue: 72000000 },
    { date: "09/12", revenue: 85000000 },
    { date: "10/12", revenue: 78000000 },
  ];

  const movieStats = [
    {
      movie: "Avengers: Endgame",
      tickets: 2340,
      revenue: 234000000,
      occupancy: 85,
    },
    {
      movie: "Spider-Man: No Way Home",
      tickets: 2100,
      revenue: 210000000,
      occupancy: 78,
    },
    { movie: "Avatar 2", tickets: 1850, revenue: 185000000, occupancy: 72 },
    { movie: "The Batman", tickets: 1620, revenue: 162000000, occupancy: 68 },
    {
      movie: "Doctor Strange 2",
      tickets: 1450,
      revenue: 145000000,
      occupancy: 64,
    },
  ];

  const theaterStats = [
    {
      theater: "CGV Vincom Center",
      tickets: 3200,
      revenue: 320000000,
      screens: 8,
    },
    {
      theater: "Lotte Cinema Keangnam",
      tickets: 2800,
      revenue: 280000000,
      screens: 12,
    },
    {
      theater: "Galaxy Cinema Nguyễn Du",
      tickets: 2400,
      revenue: 240000000,
      screens: 6,
    },
    {
      theater: "BHD Star Royal City",
      tickets: 2000,
      revenue: 200000000,
      screens: 10,
    },
  ];

  const seatTypeRevenue = [
    { type: "Standard", tickets: 6500, revenue: 487500000, percentage: 60 },
    { type: "VIP", tickets: 2800, revenue: 336000000, percentage: 30 },
    { type: "Sweetbox", tickets: 800, revenue: 160000000, percentage: 10 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Báo cáo & Thống kê</h1>
          <p className="text-gray-600">
            Xem báo cáo doanh thu và hiệu suất kinh doanh
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="3months">3 tháng qua</option>
            <option value="year">Năm nay</option>
          </select>
          <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-5 h-5" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Tổng doanh thu</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-900 mb-1">445,000,000 ₫</p>
          <p className="text-sm text-green-600">+12.5% so với tuần trước</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Vé bán ra</p>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-900 mb-1">10,100 vé</p>
          <p className="text-sm text-blue-600">+8.2% so với tuần trước</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Giá vé trung bình</p>
          <p className="text-gray-900 mb-1">98,020 ₫</p>
          <p className="text-sm text-gray-500">Không đổi</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Tỷ lệ lấp đầy TB</p>
          <p className="text-gray-900 mb-1">72%</p>
          <p className="text-sm text-orange-600">+5.1% so với tuần trước</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">Biểu đồ doanh thu 7 ngày</h2>
          <div className="space-y-4">
            {revenueData.map((data) => (
              <div key={data.date} className="flex items-center gap-4">
                <span className="text-gray-600 w-16">{data.date}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-10 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-full flex items-center justify-end pr-4 text-white"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  >
                    {(data.revenue / 1000000).toFixed(0)}M
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">Doanh thu theo loại ghế</h2>
          <div className="space-y-6">
            {seatTypeRevenue.map((seat) => (
              <div key={seat.type}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-900">{seat.type}</p>
                    <p className="text-sm text-gray-500">{seat.tickets} vé</p>
                  </div>
                  <p className="text-gray-900">
                    {(seat.revenue / 1000000).toFixed(0)}M ₫
                  </p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${seat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Doanh thu theo phim</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Xếp hạng</th>
                <th className="px-6 py-4 text-left text-gray-600">Tên phim</th>
                <th className="px-6 py-4 text-left text-gray-600">Số vé bán</th>
                <th className="px-6 py-4 text-left text-gray-600">Doanh thu</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Tỷ lệ lấp đầy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movieStats.map((movie, index) => (
                <tr key={movie.movie} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{movie.movie}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {movie.tickets.toLocaleString()} vé
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {movie.revenue.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${movie.occupancy}%` }}
                        />
                      </div>
                      <span className="text-gray-900">{movie.occupancy}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Doanh thu theo rạp</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Rạp chiếu</th>
                <th className="px-6 py-4 text-left text-gray-600">Số phòng</th>
                <th className="px-6 py-4 text-left text-gray-600">Số vé bán</th>
                <th className="px-6 py-4 text-left text-gray-600">Doanh thu</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Doanh thu/Phòng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {theaterStats.map((theater) => (
                <tr key={theater.theater} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{theater.theater}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {theater.screens} phòng
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {theater.tickets.toLocaleString()} vé
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {theater.revenue.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {(theater.revenue / theater.screens).toLocaleString()} ₫
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
