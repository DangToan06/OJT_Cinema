import { useState } from "react";
import Swal from "sweetalert2";
type Register = {
  isOpen: boolean;
  onClose: () => void;
  Switch: () => void;
};

export default function Register({ isOpen, onClose, Switch }: Register) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    
    if (!form.firstName.trim()) err.firstName = "Vui lòng nhập Họ";
    if (!form.lastName.trim()) err.lastName = "Vui lòng nhập Tên";
    if (!form.email.trim()) err.email = "Vui lòng nhập Email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Email không hợp lệ";

    if (!form.phone.trim()) err.phone = "Vui lòng nhập Số điện thoại";
    else if (!/^0\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      err.phone = "Số điện thoại phải 10 số, bắt đầu bằng 0";

    if (!form.password) err.password = "Vui lòng nhập mật khẩu";
    else if (form.password.length < 6)
      err.password = "Mật khẩu ít nhất 6 ký tự";

    if (form.confirmPassword !== form.password)
      err.confirmPassword = "Mật khẩu không khớp";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đăng kí thành công!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          icon: "swal-small-icon",
        },
      }).then(onClose);
    }
  };

  return (
    <div
      className={`min-h-screen  ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center px-4 fixed w-full z-50`}
    >
      <div className="relative bg-[#1e293b]/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-white/5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Đăng ký
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Họ
              </label>
              <input
                type="text"
                placeholder="Họ"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên
              </label>
              <input
                type="text"
                placeholder="Tên"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full py-4 bg-linear-to-r text-white  bg-red-500 font-semibold text-lg rounded-full transition shadow-lg cursor-pointer"
          >
            Đăng ký
          </button>

          <p className="text-center text-gray-400">
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => {
                onClose();
                Switch();
              }}
              className="text-red-400 font-medium cursor-pointer hover:underline"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
