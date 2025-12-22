import { useEffect, useState } from "react";
import {
  Search,
  Download,
  CreditCard,
  Smartphone,
  Wallet,
  Film,
  Armchair,
} from "lucide-react";
import { getAllUser } from "../api/user.api";
import { getAllHistoryPayment } from "../api/historyPayment.api";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import type { User } from "../interfaces/user.interface";
import type { Seat } from "../interfaces/seat.interface";

export function PaymentsManagement() {
  const dispatch = useAppDispatch();
  const { data: payments, status: paymentsStatus } = useAppSelector(
    (state) => state.history
  );
  const { data: users } = useAppSelector((store) => store.user);
  console.log(users);

  useEffect(() => {
    if (payments.length === 0) {
      dispatch(getAllHistoryPayment());
    }
  }, [payments.length, dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUser());
    }
  }, [users.length, dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      payment.id.toString().includes(term) ||
      payment.userId.toLowerCase().includes(term) ||
      payment.nameFilm.toLowerCase().includes(term);

    const matchesMethod =
      filterMethod === "all" || payment.paymentMethod === filterMethod;

    return matchesSearch && matchesMethod;
  });

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " ₫";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSeats = (seats: Seat[]) => {
    return seats.map((s) => `${s.row}${s.number}`).join(", ");
  };

  const getMethodIcon = (method: string) => {
    const m = method.toLowerCase();
    if (m.includes("vnpay") || m.includes("wallet"))
      return <Smartphone className="w-5 h-5 text-blue-400" />;
    if (m.includes("card") || m.includes("visa"))
      return <CreditCard className="w-5 h-5 text-green-400" />;
    return <Wallet className="w-5 h-5 text-gray-400" />;
  };

  const displayUsser = (user: User[], id: string) => {
    if (id === "" || !id) return "Không có người nào dặt ghế này";
    const nameUser = user.find((u) => u.id.toString() === id);
    if (nameUser) return nameUser.first_name + " " + nameUser.last_name;
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
              Quản lý thanh toán
            </h1>
            <p className="text-gray-400">
              Lịch sử giao dịch dựa trên dữ liệu đặt vé
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/50 font-medium">
            <Download className="w-5 h-5" />
            Xuất báo cáo
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo ID, Tên phim"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-700 bg-gray-900 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              <div className="relative min-w-[200px]">
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả phương thức</option>
                  <option value="vnpay">VNPay</option>
                  <option value="payoo">payoo</option>
                  <option value="viettel">viettel</option>
                  <option value="vietqr">vietqr</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {paymentsStatus === "pending" ? (
              <div>Loading...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      ID / Thời gian
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Thông tin phim
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Ghế & Suất
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Phương thức
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-700/30 transition duration-150"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white font-bold">#{payment.id}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(payment.bookingDate)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Film className="w-4 h-4 text-gray-500" />
                          <span className="text-white font-medium">
                            {payment.nameFilm}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                          {displayUsser(users, payment.userId)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <Armchair className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-gray-300 text-sm">
                              {formatSeats(payment.seatBooked)}
                            </p>
                            <p
                              className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[100px]"
                              title={payment.showTimeId}
                            >
                              ID Suất: {payment.showTimeId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-red-400 font-bold text-base">
                          {formatCurrency(payment.totalAmount)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.paymentMethod)}
                          <span className="text-gray-300 text-sm uppercase">
                            {payment.paymentMethod}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {filteredPayments.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                Không tìm thấy giao dịch nào phù hợp.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
