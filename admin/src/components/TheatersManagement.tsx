import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Phone, Globe } from "lucide-react";

export function TheatersManagement() {
  const [theaters] = useState([
    {
      id: 1,
      name: "CGV Vincom Center",
      address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      phone: "1900 6017",
      website: "https://www.cgv.vn",
      screens: 8,
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Lotte Cinema Keangnam",
      address: "Tầng 3, Keangnam Landmark, Phạm Hùng, Cầu Giấy, Hà Nội",
      phone: "1900 5454",
      website: "https://www.lottecinemavn.com",
      screens: 12,
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Galaxy Cinema Nguyễn Du",
      address: "116 Nguyễn Du, Hai Bà Trưng, Hà Nội",
      phone: "1900 2224",
      website: "https://www.galaxycine.vn",
      screens: 6,
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "BHD Star Vincom Royal City",
      address:
        "Tầng B1, Vincom Mega Mall Royal City, 72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
      phone: "1900 2099",
      website: "https://www.bhdstar.vn",
      screens: 10,
      status: "Hoạt động",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý rạp chiếu</h1>
          <p className="text-gray-600">
            Thêm, chỉnh sửa và quản lý thông tin rạp chiếu
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm rạp mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {theaters.map((theater) => (
          <div
            key={theater.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-2">{theater.name}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {theater.status}
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

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{theater.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>{theater.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Globe className="w-5 h-5 flex-shrink-0" />
                <a
                  href={theater.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {theater.website}
                </a>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Số phòng chiếu:</span>
                  <span className="text-gray-900">{theater.screens} phòng</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-gray-900">Thêm rạp chiếu mới</h2>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Tên rạp *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nhập tên rạp"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Địa chỉ *</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nhập địa chỉ đầy đủ"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="1900 xxxx"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://example.com"
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
                  Thêm rạp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
