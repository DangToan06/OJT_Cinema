import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export function ScreensManagement() {
  const [screens] = useState([
    {
      id: 1,
      name: "Phòng 1",
      theater: "CGV Vincom Center",
      capacity: 120,
      type: "2D",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Phòng 2",
      theater: "CGV Vincom Center",
      capacity: 150,
      type: "3D",
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Phòng VIP",
      theater: "CGV Vincom Center",
      capacity: 80,
      type: "IMAX",
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "Phòng 1",
      theater: "Lotte Cinema Keangnam",
      capacity: 200,
      type: "2D",
      status: "Hoạt động",
    },
    {
      id: 5,
      name: "Phòng 2",
      theater: "Lotte Cinema Keangnam",
      capacity: 180,
      type: "3D",
      status: "Hoạt động",
    },
    {
      id: 6,
      name: "Phòng 3",
      theater: "Lotte Cinema Keangnam",
      capacity: 160,
      type: "4DX",
      status: "Bảo trì",
    },
    {
      id: 7,
      name: "Phòng 1",
      theater: "Galaxy Cinema Nguyễn Du",
      capacity: 100,
      type: "2D",
      status: "Hoạt động",
    },
    {
      id: 8,
      name: "Phòng 2",
      theater: "Galaxy Cinema Nguyễn Du",
      capacity: 120,
      type: "3D",
      status: "Hoạt động",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterTheater, setFilterTheater] = useState("all");

  const filteredScreens =
    filterTheater === "all"
      ? screens
      : screens.filter((s) => s.theater === filterTheater);

  const theaters = [...new Set(screens.map((s) => s.theater))];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "2D":
        return "bg-blue-100 text-blue-700";
      case "3D":
        return "bg-purple-100 text-purple-700";
      case "IMAX":
        return "bg-red-100 text-red-700";
      case "4DX":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Hoạt động"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2 font-bold text-2xl">
            Quản lý phòng chiếu
          </h1>
          <p className="text-gray-600">
            Thêm, chỉnh sửa và quản lý phòng chiếu cho từng rạp
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm phòng chiếu
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <select
            value={filterTheater}
            onChange={(e) => setFilterTheater(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tất cả rạp</option>
            {theaters.map((theater) => (
              <option key={theater} value={theater}>
                {theater}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">ID</th>
                <th className="px-6 py-4 text-left text-gray-600">Tên phòng</th>
                <th className="px-6 py-4 text-left text-gray-600">Rạp chiếu</th>
                <th className="px-6 py-4 text-left text-gray-600">Sức chứa</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Loại phòng
                </th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredScreens.map((screen) => (
                <tr key={screen.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">#{screen.id}</td>
                  <td className="px-6 py-4 text-gray-900">{screen.name}</td>
                  <td className="px-6 py-4 text-gray-600">{screen.theater}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {screen.capacity} ghế
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getTypeColor(
                        screen.type
                      )}`}
                    >
                      {screen.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        screen.status
                      )}`}
                    >
                      {screen.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Thêm phòng chiếu mới</h2>
            </div>
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Tên phòng *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Phòng 1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Rạp chiếu *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Chọn rạp</option>
                    {theaters.map((theater) => (
                      <option key={theater} value={theater}>
                        {theater}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Sức chứa *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="120"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Loại phòng *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="IMAX">IMAX</option>
                    <option value="4DX">4DX</option>
                  </select>
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
                  Thêm phòng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
