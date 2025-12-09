import {
  Film,
  Tags,
  Building2,
  MonitorPlay,
  Armchair,
  Calendar,
  DollarSign,
  Newspaper,
  Users,
  Ticket,
  CreditCard,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
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

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Film className="w-8 h-8 text-red-500" />
          <div>
            <h1>Cinema Admin</h1>
            <p className="text-gray-400 text-sm">Hệ thống quản lý</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p>Admin User</p>
            <p className="text-sm text-gray-400">admin@cinema.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
