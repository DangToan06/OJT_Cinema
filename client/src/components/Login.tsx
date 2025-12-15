import { useState } from "react";
import Swal from "sweetalert2";

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
  Switch: () => void;
};

export default function Login({ isOpen, onClose, Switch }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch("http://localhost:8080/users");
      const users = await res.json();

      const user = users.find(
        (u: any) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!user) {
        setErrors({ server: "Email hoặc mật khẩu không đúng" });
        return;
      }

      if (user.status === "BLOCKED") {
        Swal.fire({
          icon: "error",
          title: "Tài khoản bị chặn",
          text: "Tài khoản của bạn đã bị chặn",
          confirmButtonText: "OK",
        });
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: `Chào mừng ${user.first_name || user.firstName} ${
          user.last_name || user.lastName
        }!`,
        toast: true,
        position: "top-end",
        timer: 2000,
        background: "#1e293b",
        color: "#fff",
      }).then(() => {
        onClose();
        window.location.href = "/";
      });
    } catch (error) {
      setErrors({ server: "Không kết nối được server" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div
        className="relative bg-[#1e293b]/95 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Đăng nhập
        </h2>

        <div className="space-y-6">
          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  email: undefined,
                  server: undefined,
                }));
              }}
              className={`w-full px-5 py-4 bg-[#334155]/50 border rounded-2xl text-white placeholder-gray-500
                ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: undefined,
                  server: undefined,
                }));
              }}
              className={`w-full px-5 py-4 bg-[#334155]/50 border rounded-2xl text-white placeholder-gray-500
                ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* SERVER ERROR */}
          {errors.server && (
            <p className="text-red-400 text-center font-medium">
              {errors.server}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              background: isLoading
                ? "#666"
                : "linear-gradient(to right, #dc2626, #ec4899)",
            }}
            className="w-full py-4 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-500/50 active:scale-95 transition-all"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-gray-400">
            Chưa có tài khoản?{" "}
            <button
              onClick={() => {
                onClose();
                Switch();
              }}
              className="text-red-400 font-medium hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
