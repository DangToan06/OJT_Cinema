import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
type Login = {
  isOpen: boolean;
  onClose: () => void;
};
export default function Login({ isOpen, onClose }: Login) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;
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
  };

  return (
    <div
      className={`min-h-screen ${
        isOpen ? "flex" : "hidden"
      } flex items-center justify-center px-4 fixed z-50 w-full transition-all ease-linear`}
    >
      <div className="relative bg-[#1e293b]/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/5">
        {/* Nút đóng - bấm là về trang chủ hoặc login (tùy bạn) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Đăng nhập
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-[#334155]/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <a href="#" className="text-red-400 text-sm hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-4 bg-linear-to-r bg-red-500 text-white font-semibold text-lg rounded-full hover:from-red-700 hover:to-pink-700 transition shadow-lg cursor-pointer"
          >
            Đăng nhập
          </button>

          <p className="text-center text-gray-400">
            Bạn chưa có tài khoản?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-red-400 font-medium cursor-pointer hover:underline"
            >
              Đăng ký
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
