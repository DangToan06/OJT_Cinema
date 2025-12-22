import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Lấy ra đường dẫn hiện tại (pathname)
  const { pathname } = useLocation();

  useEffect(() => {
    // Mỗi khi pathname thay đổi, cuộn lên đầu trang ngay lập tức
    window.scrollTo(0, 0);

    // Nếu muốn cuộn mượt (smooth), dùng dòng dưới đây (nhưng chuyển trang thường nên dùng instant):
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // Component này không cần render giao diện gì cả
}
