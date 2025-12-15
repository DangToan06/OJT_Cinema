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
      screens: 8,
      tickets: 3200,
      revenue: 320000000,
    },
    {
      theater: "Lotte Cinema Keangnam",
      screens: 12,
      tickets: 2800,
      revenue: 280000000,
    },
    {
      theater: "Galaxy Cinema Nguyễn Du",
      screens: 6,
      tickets: 2400,
      revenue: 240000000,
    },
    {
      theater: "BHD Star Royal City",
      screens: 10,
      tickets: 2000,
      revenue: 200000000,
    },
  ];

  const seatTypeRevenue = [
    { type: "Standard", tickets: 6500, revenue: 487500000, percentage: 60 },
    { type: "VIP", tickets: 2800, revenue: 336000000, percentage: 30 },
    { type: "Sweetbox", tickets: 800, revenue: 160000000, percentage: 10 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Báo cáo & Thống kê
            </h1>
            <p className="text-gray-400">
              Xem báo cáo doanh thu và hiệu suất kinh doanh
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="7days">7 ngày qua</option>
              <option value="30days">30 ngày qua</option>
              <option value="3months">3 tháng qua</option>
              <option value="year">Năm nay</option>
            </select>

            <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-500/50">
              <Download className="w-5 h-5" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Tổng doanh thu"
            value="445,000,000 ₫"
            icon={<TrendingUp className="w-5 h-5 text-red-500" />}
            note="+12.5% so với tuần trước"
          />
          <SummaryCard
            title="Vé bán ra"
            value="10,100 vé"
            icon={<Calendar className="w-5 h-5 text-red-500" />}
            note="+8.2% so với tuần trước"
          />
          <SummaryCard
            title="Giá vé trung bình"
            value="98,020 ₫"
            note="Không đổi"
          />
          <SummaryCard
            title="Tỷ lệ lấp đầy TB"
            value="72%"
            note="+5.1% so với tuần trước"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
            <h2 className="font-semibold text-white mb-6">Doanh thu 7 ngày</h2>

            <div className="space-y-4">
              {revenueData.map((d) => (
                <div key={d.date} className="flex items-center gap-4">
                  <span className="w-14 text-gray-400">{d.date}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-9 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-end pr-3 text-white text-sm font-medium"
                      style={{ width: `${(d.revenue / maxRevenue) * 100}%` }}
                    >
                      {(d.revenue / 1_000_000).toFixed(0)}M
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
            <h2 className="font-semibold text-white mb-6">
              Doanh thu theo loại ghế
            </h2>

            <div className="space-y-6">
              {seatTypeRevenue.map((s) => (
                <div key={s.type}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium text-white">{s.type}</p>
                      <p className="text-sm text-gray-400">{s.tickets} vé</p>
                    </div>
                    <p className="font-semibold text-white">
                      {(s.revenue / 1_000_000).toFixed(0)}M ₫
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-red-600 h-full rounded-full"
                      style={{ width: `${s.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DataTable title="Doanh thu theo phim" darkMode>
          {movieStats.map((m, i) => (
            <tr
              key={m.movie}
              className="hover:bg-gray-700 transition duration-150"
            >
              <td className="px-6 py-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-700 text-white font-semibold">
                  {i + 1}
                </span>
              </td>
              <td className="px-6 py-4 text-white font-medium">{m.movie}</td>
              <td className="px-6 py-4 text-gray-300">
                {m.tickets.toLocaleString()} vé
              </td>
              <td className="px-6 py-4 text-gray-300">
                {m.revenue.toLocaleString()} ₫
              </td>
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-24 bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-600 h-full"
                    style={{ width: `${m.occupancy}%` }}
                  />
                </div>
                <span className="text-gray-300">{m.occupancy}%</span>
              </td>
            </tr>
          ))}
        </DataTable>

        <DataTable title="Doanh thu theo rạp" darkMode>
          {theaterStats.map((t) => (
            <tr
              key={t.theater}
              className="hover:bg-gray-700 transition duration-150"
            >
              <td className="px-6 py-4 text-white font-medium">{t.theater}</td>
              <td className="px-6 py-4 text-gray-300">{t.screens} phòng</td>
              <td className="px-6 py-4 text-gray-300">
                {t.tickets.toLocaleString()} vé
              </td>
              <td className="px-6 py-4 text-gray-300">
                {t.revenue.toLocaleString()} ₫
              </td>
              <td className="px-6 py-4 text-gray-300">
                {(t.revenue / t.screens).toLocaleString()} ₫
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  note,
  icon,
}: {
  title: string;
  value: string;
  note: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
      <div className="flex justify-between mb-2">
        <p className="text-gray-400">{title}</p>
        {icon}
      </div>
      <p className="text-xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-red-500">{note}</p>
    </div>
  );
}

function DataTable({
  title,
  children,
  darkMode = false,
}: {
  title: string;
  children: React.ReactNode;
  darkMode?: boolean;
}) {
  const bgClass = darkMode
    ? "bg-gray-800 border border-gray-700 shadow-xl"
    : "bg-white border border-gray-200 shadow-sm";
  const headerClass = darkMode
    ? "text-white border-gray-700"
    : "text-gray-900 border-gray-200";
  const dividerClass = darkMode ? "divide-gray-700" : "divide-gray-200";

  return (
    <div className={`rounded-lg mb-8 ${bgClass}`}>
      <div className={`p-6 border-b ${headerClass}`}>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className={`divide-y ${dividerClass}`}>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
