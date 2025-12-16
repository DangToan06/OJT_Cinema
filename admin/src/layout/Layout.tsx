import {
  Armchair,
  BarChart3,
  Building2,
  Calendar,
  CreditCard,
  DollarSign,
  Film,
  LayoutDashboard,
  MonitorPlay,
  Newspaper,
  Tags,
  Ticket,
  Users,
  LogOut,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export default function Layout() {
  const navigate = useNavigate();
  const currentPath = location.pathname.replace("/", "");

  const menuItems = [
    { id: "", label: "Tổng quan", icon: LayoutDashboard },
    { id: "movies", label: "Quản lý phim", icon: Film },
    { id: "genres", label: "Thể loại phim", icon: Tags },
    { id: "theaters", label: "Rạp chiếu", icon: Building2 },
    { id: "screens", label: "Phòng chiếu", icon: MonitorPlay },
    { id: "seats", label: "Ghế ngồi", icon: Armchair },
    { id: "showtimes", label: "Lịch chiếu", icon: Calendar },
    { id: "pricing", label: "Giá vé", icon: DollarSign },
    { id: "news", label: "Tin tức & KM", icon: Newspaper },
    { id: "users", label: "Người dùng", icon: Users },
    { id: "bookings", label: "Đặt vé", icon: Ticket },
    { id: "payments", label: "Thanh toán", icon: CreditCard },
    { id: "reports", label: "Báo cáo", icon: BarChart3 },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Đăng xuất?",
      text: "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        Swal.fire({
          icon: "success",
          title: "Đã đăng xuất",
          showConfirmButton: false,
          timer: 1000,
        });

        navigate("/login");
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-full">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Film className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-lg font-semibold">Cinema Admin</h1>
              <p className="text-gray-400 text-sm">Hệ thống quản lý</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left hover:bg-gray-700 transition-colors
                  ${currentPath === item.id ? "bg-gray-700" : ""}
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User + Logout Icon */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-400">admin@cinema.com</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="p-2 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-500 transition cursor-pointer hover:scale-110"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <Outlet />
      </main>
    </div>
  );
}
