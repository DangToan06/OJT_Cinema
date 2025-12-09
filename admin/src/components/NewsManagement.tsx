import { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

export function NewsManagement() {
  const [news] = useState([
    {
      id: 1,
      title: "Giảm giá 50% vé xem phim mỗi thứ 3",
      content:
        "Chương trình khuyến mãi đặc biệt dành cho thành viên. Áp dụng cho tất cả các suất chiếu vào thứ 3 hàng tuần.",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
      status: "Đang hoạt động",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      views: 1520,
    },
    {
      id: 2,
      title: "Mua 1 tặng 1 combo bắp nước",
      content:
        "Áp dụng cho combo size L. Chương trình có hiệu lực từ 15/12 đến hết 20/12.",
      image:
        "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=800&h=400&fit=crop",
      status: "Đang hoạt động",
      startDate: "2025-12-15",
      endDate: "2025-12-20",
      views: 980,
    },
    {
      id: 3,
      title: "Ra mắt phòng chiếu IMAX mới",
      content:
        "Trải nghiệm điện ảnh đỉnh cao với công nghệ IMAX hiện đại nhất tại CGV Vincom.",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop",
      status: "Sắp diễn ra",
      startDate: "2025-12-25",
      endDate: "2026-01-31",
      views: 450,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang hoạt động":
        return "bg-green-100 text-green-700";
      case "Sắp diễn ra":
        return "bg-blue-100 text-blue-700";
      case "Đã kết thúc":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý tin tức & khuyến mãi</h1>
          <p className="text-gray-600">
            Tạo và quản lý các chương trình khuyến mãi, tin tức
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm bài viết
        </button>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-2">{item.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Từ: {item.startDate}</span>
                    <span>Đến: {item.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{item.views} lượt xem</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-gray-900">Thêm tin tức / khuyến mãi</h2>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Tiêu đề *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Nội dung *</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nhập nội dung chi tiết"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Hình ảnh (URL)
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xuất bản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
