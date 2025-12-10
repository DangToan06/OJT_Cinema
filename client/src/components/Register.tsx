
import { useState } from "react";
import Swal from "sweetalert2";

type RegisterProps = {
  isOpen: boolean;
  onClose: () => void;
  Switch: () => void;
};

export default function Register({ isOpen, onClose, Switch }: RegisterProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.firstName.trim()) err.firstName = "Vui lòng nhập Họ";
    if (!form.lastName.trim()) err.lastName = "Vui lòng nhập Tên";

    if (!form.email.trim()) err.email = "Vui lòng nhập Email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Email không hợp lệ";

    if (!form.phone.trim()) err.phone = "Vui lòng nhập Số điện thoại";
    else if (!/^0\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      err.phone = "Số điện thoại phải 10 số, bắt đầu bằng 0";

    if (!form.password) err.password = "Vui lòng nhập mật khẩu";
    else if (form.password.length < 6) err.password = "Mật khẩu ít nhất 6 ký tự";

    if (form.confirmPassword !== form.password)
      err.confirmPassword = "Mật khẩu xác nhận không khớp";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          avatar: "",
          address: "",
          status: "ACTIVE",
          role: [
            {
              id: 2,
              role_name: "user",
            },
          ],
          bookings: [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Email đã tồn tại!");
      }

      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công!",
        text: `Chào mừng ${form.firstName}! Bạn có thể đăng nhập ngay`,
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
        background: "#1e293b",
        color: "#fff",
      }).then(() => {
        onClose();    
        Switch();      
      });
    } catch (error: any) {
      setErrors({ server: error.message || "Đăng ký thất bại. Vui lòng thử lại!" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div
        className="relative bg-[#1e293b]/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-white/5 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-10">Đăng ký</h2>

        <div className="space-y-6">
          {/* Họ & Tên */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Họ</label>
              <input
                type="text"
                placeholder="Họ"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Tên</label>
              <input
                type="text"
                placeholder="Tên"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Số điện thoại</label>
            <input
              type="tel"
              placeholder="0901234567"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Mật khẩu */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Mật khẩu</label>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Xác nhận mật khẩu</label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Lỗi server */}
          {errors.server && (
            <p className="text-red-400 text-center font-medium text-lg">{errors.server}</p>
          )}

          {/* NÚT ĐĂNG KÝ ĐẸP */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            style={{
              background: isLoading
                ? "#666"
                : "linear-gradient(to right, #dc2626, #ec4899)",
            }}
            className="w-full py-4 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-600/50 active:scale-95 transition-all disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          {/* Chuyển sang Đăng nhập */}
          <p className="text-center text-gray-400">
            Đã có tài khoản?{" "}
            <button
              onClick={() => {
                onClose();
                Switch();
              }}
              className="text-red-400 font-medium hover:underline"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}