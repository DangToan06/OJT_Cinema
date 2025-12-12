import React, { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "../assets/image.png";
import fb from "../assets/Facebook.png";
import zalo from "../assets/Zalo.png";
import ytb from "../assets/Youtube.png";
import gp from "../assets/GG Play.png";
import as from "../assets/App store.png";
import tem from "../assets/Copyright.png";

import LoginModal from "../components/Login";
import RegisterModal from "../components/Register";

interface LayoutProps {
  children: React.ReactNode;
}

interface UserInfo {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  role?: { role_name: string };
}

export default function Layout({ children }: LayoutProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        const mockToken = btoa(`user:${Date.now()}`);
        localStorage.setItem("auth_token", mockToken);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);
  const CheckLogin = (token) => {
    if(!token) return null;
    const payload = token.split(":")[0];
    return JSON.parse(atob(payload));
  }

  // Đăng xuất
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Đăng xuất?",
      text: "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Có, đăng xuất",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#1e293b",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-6 py-3 rounded-xl font-medium",
        cancelButton: "px-6 py-3 rounded-xl font-medium",
      },
    });

    if (result.isConfirmed) {
      localStorage.removeItem("user");
      setUser(null);
      Swal.fire({
        icon: "success",
        title: "Đã đăng xuất thành công!",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
        background: "#1e293b",
        color: "#fff",
      });
      navigate("/");
    }
  };

  const menuItems = [
    { name: "Trang chủ", link: "/" },
    { name: "Lịch chiếu", link: "/movie-calendar" },
    { name: "Tin tức", link: "/news" },
    { name: "Khuyến mãi", link: "/promotions" },
    { name: "Giá vé", link: "/ticketPrice" },
    { name: "Liên hoan phim", link: "/festival" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* Overlay khi mở modal */}
      {(isLoginModalOpen || isRegisterModalOpen) && (
        <div className="fixed inset-0 bg-black/80 z-30" />
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-black h-20 z-40 flex items-center px-6 shadow-2xl">
        <img src={logo} alt="Logo" className="w-[60px] h-[45px]" />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10 ml-10 text-white font-medium">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.link)}
              className={`hover:text-red-500 transition ${
                location.pathname === item.link ? "text-red-500" : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Desktop: User Info hoặc Login/Register */}
        <div className="hidden lg:flex items-center gap-6 ml-auto">
          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 bg-gray-800/70 backdrop-blur px-5 py-2 rounded-full border border-white/20 hover:bg-gray-800/90 transition">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white/30"
                  />
                ) : (
                  <div className="w-9 h-9 bg-linear-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {(user.first_name || "?")[0].toUpperCase()}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-white font-semibold text-sm leading-tight">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {user.role?.role_name === "admin"
                      ? "Quản trị viên"
                      : "Khách hàng"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 font-medium"
              >
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-7 py-3 border border-white rounded-full text-white hover:bg-white/10 transition font-medium"
              >
                Đăng ký
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-7 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition shadow-md"
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden ml-auto text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur z-30 py-6 px-6 shadow-2xl">
          <nav className="space-y-4 mb-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.link);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-white hover:text-red-500 transition text-lg font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="border-t border-gray-700 pt-6">
            {user ? (
              <div className="space-y-5">
                <div className="flex items-center gap-4 bg-gray-800/50 rounded-xl p-5">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-linear-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {(user.first_name || "?")[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-bold text-xl">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-gray-400">
                      {user.role?.role_name === "admin"
                        ? "Quản trị viên"
                        : "Khách hàng"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition"
                >
                  <LogOut className="w-6 h-6" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsRegisterModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-4 border border-white rounded-xl text-white hover:bg-white/10 transition font-medium"
                >
                  Đăng ký
                </button>
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold transition"
                >
                  Đăng nhập
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <main className="flex-1 mt-20">{children}</main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-14 z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Menu */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm md:text-base font-medium">
            {[
              "Chính sách",
              "Lịch chiếu",
              "Tin tức",
              "Giá vé",
              "Hỏi đáp",
              "Liên hệ",
            ].map((item) => (
              <span
                key={item}
                className="cursor-pointer hover:text-red-500 transition"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Social + Store */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
            <img src={fb} className="w-8 h-8 cursor-pointer hover:opacity-80" />
            <img
              src={zalo}
              className="w-8 h-8 cursor-pointer hover:opacity-80"
            />
            <img
              src={ytb}
              className="w-8 h-8 cursor-pointer hover:opacity-80"
            />
            <img src={gp} className="h-11 cursor-pointer hover:opacity-90" />
            <img src={as} className="h-11 cursor-pointer hover:opacity-90" />
            <img
              src={tem}
              className="h-[50px] cursor-pointer hover:opacity-90"
            />
          </div>

          {/* Info */}
          <div className="mt-12 text-center flex flex-col gap-2 text-sm md:text-base leading-relaxed opacity-90">
            <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
            <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
            <p>Giấy phép số: 224/GP - TTĐT ngày 31/8/2010</p>
            <p>
              Địa chỉ: 87 Láng Hạ, Ba Đình, Hà Nội • Điện thoại: 024.35141791
            </p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <span>&copy; 2023 By NCC • All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        Switch={() => setIsLoginModalOpen(true)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        Switch={() => setIsRegisterModalOpen(true)}
      />
    </div>
  );
}
