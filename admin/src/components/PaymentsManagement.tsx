import { useState } from "react";
import { Search, Download, CreditCard, Smartphone, Wallet } from "lucide-react";

export function PaymentsManagement() {
  const [payments] = useState([
    {
      id: "PAY001",
      bookingId: "BK001",
      user: "Nguyễn Văn A",
      amount: 180000,
      method: "Thẻ tín dụng",
      status: "Thành công",
      transactionDate: "2025-12-08 14:32:15",
      transactionId: "TXN20251208143215",
    },
    {
      id: "PAY002",
      bookingId: "BK002",
      user: "Trần Thị B",
      amount: 95000,
      method: "Ví điện tử",
      status: "Thành công",
      transactionDate: "2025-12-09 10:17:42",
      transactionId: "TXN20251209101742",
    },
    {
      id: "PAY003",
      bookingId: "BK003",
      user: "Lê Văn C",
      amount: 200000,
      method: "Chuyển khoản",
      status: "Đang xử lý",
      transactionDate: "2025-12-10 09:05:00",
      transactionId: "TXN20251210090500",
    },
    {
      id: "PAY004",
      bookingId: "BK004",
      user: "Phạm Thị D",
      amount: 150000,
      method: "Ví điện tử",
      status: "Thành công",
      transactionDate: "2025-12-09 16:47:20",
      transactionId: "TXN20251209164720",
    },
    {
      id: "PAY005",
      bookingId: "BK005",
      user: "Hoàng Văn E",
      amount: 270000,
      method: "Thẻ tín dụng",
      status: "Thất bại",
      transactionDate: "2025-12-07 20:03:45",
      transactionId: "TXN20251207200345",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    const matchesMethod =
      filterMethod === "all" || payment.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Thành công":
        return "bg-green-100 text-green-700";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-700";
      case "Thất bại":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Thẻ tín dụng":
        return <CreditCard className="w-5 h-5" />;
      case "Ví điện tử":
        return <Smartphone className="w-5 h-5" />;
      case "Chuyển khoản":
        return <Wallet className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const totalRevenue = payments
    .filter((p) => p.status === "Thành công")
    .reduce((sum, p) => sum + p.amount, 0);
  const successCount = payments.filter((p) => p.status === "Thành công").length;
  const processingCount = payments.filter(
    (p) => p.status === "Đang xử lý"
  ).length;
  const failedCount = payments.filter((p) => p.status === "Thất bại").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý thanh toán</h1>
          <p className="text-gray-600">
            Theo dõi và quản lý các giao dịch thanh toán
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-5 h-5" />
          Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Tổng doanh thu</p>
          <p className="text-gray-900">{totalRevenue.toLocaleString()} ₫</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Thành công</p>
          <p className="text-green-600">{successCount} giao dịch</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Đang xử lý</p>
          <p className="text-yellow-600">{processingCount} giao dịch</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-2">Thất bại</p>
          <p className="text-red-600">{failedCount} giao dịch</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã giao dịch, mã đơn, khách hàng..."
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
              <option value="Thành công">Thành công</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Thất bại">Thất bại</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Tất cả phương thức</option>
              <option value="Thẻ tín dụng">Thẻ tín dụng</option>
              <option value="Ví điện tử">Ví điện tử</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">
                  Mã giao dịch
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Mã đơn</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Số tiền</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Phương thức
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Thời gian</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{payment.id}</p>
                    <p className="text-xs text-gray-500">
                      {payment.transactionId}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {payment.bookingId}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{payment.user}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {payment.amount.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      {getMethodIcon(payment.method)}
                      {payment.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {payment.transactionDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
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
