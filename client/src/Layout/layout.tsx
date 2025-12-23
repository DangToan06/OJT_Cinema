import React, { useState, useEffect } from "react";
import { Menu, X, LogOut, Ticket, Calendar, Clock } from "lucide-react";
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
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { getAllHistoryPayment } from "../api/historyPayment.api";
import ScrollToTop from "../util/ScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

interface UserInfo {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status?: string;
  role?: { role_name: string };
}

export default function Layout({ children }: LayoutProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { data: historyPayment } = useAppSelector((state) => state.history);

  useEffect(() => {
    if (historyPayment.length === 0) {
      dispatch(getAllHistoryPayment());
    }
  }, [historyPayment.length, dispatch]);

  // Các hàm logout, check status, update profile... giữ nguyên như cũ
  const performLogout = (reason: "manual" | "blocked") => {
    localStorage.removeItem("user");
    setUser(null);

    if (reason === "blocked") {
      Swal.fire({
        icon: "error",
        title: "Tài khoản bị chặn",
        text: "Tài khoản của bạn đã bị chặn, bạn đã bị đăng xuất.",
        confirmButtonText: "OK",
        background: "#1e293b",
        color: "#fff",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "px-6 py-3 rounded-xl font-medium",
        },
      });
    } else {
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
    }
    navigate("/");
  };

  const checkUserStatus = async () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setUser(null);
      return;
    }

    try {
      const parsedUser: UserInfo = JSON.parse(savedUser);
      if (!parsedUser.id) {
        performLogout("manual");
        return;
      }

      const res = await fetch(`http://localhost:8080/users/${parsedUser.id}`);
      if (!res.ok) {
        performLogout("manual");
        return;
      }

      const currentUser = await res.json();

      if (currentUser.status === "BLOCKED") {
        performLogout("blocked");
      } else {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    } catch (err) {
      console.error("Lỗi khi kiểm tra trạng thái tài khoản:", err);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    const handleFocus = () => checkUserStatus();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkUserStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (user) {
      checkUserStatus();
    }
  }, [location.pathname, mobileMenuOpen]);

  const handleManualLogout = async () => {
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
      performLogout("manual");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    const formData = new FormData(e.currentTarget);
    const first_name = (formData.get("first_name") as string).trim();
    const last_name = (formData.get("last_name") as string).trim();
    const email = (formData.get("email") as string).trim().toLowerCase();
    const phone = (formData.get("phone") as string).trim();
    const avatarFile = formData.get("avatar") as File;

    // Validation
    if (!first_name || !last_name || !email || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng điền đầy đủ các trường!",
        background: "#1e293b",
        color: "#fff",
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email không hợp lệ",
        background: "#1e293b",
        color: "#fff",
      });
      return;
    }
    if (!/^0\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      Swal.fire({
        icon: "error",
        title: "Số điện thoại phải có 10 số, bắt đầu bằng 0",
        background: "#1e293b",
        color: "#fff",
      });
      return;
    }

    let avatarUrl = user.avatar || "";
    if (avatarFile && avatarFile.size > 0) {
      avatarUrl = URL.createObjectURL(avatarFile);
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          first_name,
          last_name,
          email,
          phone,
          avatar: avatarUrl,
          updated_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại");

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        text: "Thông tin và avatar đã được lưu.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        background: "#1e293b",
        color: "#fff",
      });

      setPreviewAvatar(null);
      setIsProfileModalOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể cập nhật, vui lòng thử lại!",
        background: "#1e293b",
        color: "#fff",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
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
      <ScrollToTop />
      {(isLoginModalOpen || isRegisterModalOpen) && (
        <div className="fixed inset-0 bg-black/80 z-30" />
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black h-20 z-40 flex items-center px-6 shadow-2xl">
        <img src={logo} alt="Logo" className="w-[60px] h-[45px]" />

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

        <div className="hidden lg:flex items-center gap-6 ml-auto">
          {user ? (
            <div className="flex items-center gap-6">
              <div
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-4 bg-gray-800/70 backdrop-blur px-5 py-2 rounded-full border border-white/20 hover:bg-gray-800/90 transition cursor-pointer"
              >
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
                    {user.first_name || ""} {user.last_name || ""}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {user.role?.role_name === "admin"
                      ? "Quản trị viên"
                      : "Khách hàng"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleManualLogout}
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
                      {user.first_name || ""} {user.last_name || ""}
                    </p>
                    <p className="text-gray-400">
                      {user.role?.role_name === "admin"
                        ? "Quản trị viên"
                        : "Khách hàng"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleManualLogout}
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

      <main className="flex-1 mt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 z-10">
        <div className="max-w-6xl mx-auto px-6">
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

          <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
            <img src={fb} className="w-8 h-8 cursor-pointer hover:opacity-80" alt="Facebook" />
            <img src={zalo} className="w-8 h-8 cursor-pointer hover:opacity-80" alt="Zalo" />
            <img src={ytb} className="w-8 h-8 cursor-pointer hover:opacity-80" alt="Youtube" />
            <img src={gp} className="h-11 cursor-pointer hover:opacity-90" alt="Google Play" />
            <img src={as} className="h-11 cursor-pointer hover:opacity-90" alt="App Store" />
            <img src={tem} className="h-[50px] cursor-pointer hover:opacity-90" alt="Copyright" />
          </div>

          <div className="mt-12 text-center flex flex-col gap-2 text-sm md:text-base leading-relaxed opacity-90">
            <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
            <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
            <p>Giấy phép số: 224/GP - TTĐT ngày 31/8/2010</p>
            <p>Địa chỉ: 87 Láng Hạ, Ba Đình, Hà Nội • Điện thoại: 024.35141791</p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <span>© 2023 By NCC • All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Modal Profile + Lịch sử đặt vé ===== */}
      {isProfileModalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setIsProfileModalOpen(false);
              setPreviewAvatar(null);
            }}
          />

          <div
            className="relative bg-[#1e293b]/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-white/5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                setPreviewAvatar(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Thông tin cá nhân
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    {previewAvatar || user.avatar ? (
                      <img
                        src={previewAvatar || user.avatar}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-5xl">
                        {(user.first_name || "?")[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  >
                    <span className="text-white text-sm font-medium">Thay đổi</span>
                  </label>
                </div>

                <input
                  id="avatar-upload"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreviewAvatar(URL.createObjectURL(file));
                  }}
                />
                <p className="text-gray-400 text-sm mt-3">Nhấp vào ảnh để thay đổi</p>
              </div>

              {/* Thông tin */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Họ</label>
                  <input
                    name="first_name"
                    type="text"
                    defaultValue={user.first_name || ""}
                    required
                    className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Tên</label>
                  <input
                    name="last_name"
                    type="text"
                    defaultValue={user.last_name || ""}
                    required
                    className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email || ""}
                  required
                  className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Số điện thoại</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={user.phone || ""}
                  required
                  className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>

              {/* Lịch sử đặt vé */}
              <div className="border-t border-gray-600 pt-6">
                <p
                  onClick={() => setIsShowHistory(true)}
                  className="text-white text-xl font-bold hover:border-b-red-500 hover:border-b w-fit cursor-pointer hover:text-red-500 transition"
                >
                  Lịch sử đặt vé
                </p>

                {isShowHistory && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-700">
                      <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                        <h3 className="text-white font-bold text-2xl flex items-center gap-3">
                          <Ticket className="w-7 h-7 text-red-500" />
                          Lịch sử đặt vé
                        </h3>
                        <button
                          onClick={() => setIsShowHistory(false)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X size={28} />
                        </button>
                      </div>

                      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                        {historyPayment.filter((h) => h.userId === user.id).length === 0 ? (
                          <div className="text-center py-12 text-gray-400">
                            Bạn chưa có giao dịch nào.
                          </div>
                        ) : (
                          historyPayment
                            .filter((h) => h.userId === user.id)
                            .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
                            .map((payment) => (
                              <div
                                key={payment.id}
                                className="mb-4 p-5 bg-gray-900 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-lg font-bold text-white mb-1">
                                      {payment.nameFilm}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                      <Calendar className="w-4 h-4" />
                                      <span>{formatDate(payment.bookingDate)}</span>
                                      <Clock className="w-4 h-4" />
                                      <span>
                                        {payment.seatBooked.length} ghế
                                      </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {payment.seatBooked.map((seat, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300"
                                        >
                                          {seat.row}
                                          {seat.number}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <p className="text-2xl font-bold text-red-500">
                                      {payment.totalAmount.toLocaleString()} VNĐ
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Thanh toán: {payment.paymentMethod.toUpperCase()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                        )}
                      </div>

                      <div className="p-6 border-t border-gray-700 flex justify-end">
                        <button
                          onClick={() => setIsShowHistory(false)}
                          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition"
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nút Lưu */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setPreviewAvatar(null);
                  }}
                  className="flex-1 py-4 border border-white/30 rounded-full text-white hover:bg-white/10 transition font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-600/50 active:scale-95 transition-all"
                  style={{
                    background: "linear-gradient(to right, #dc2626, #ec4899)",
                  }}
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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