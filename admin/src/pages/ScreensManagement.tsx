import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Film,
  ToggleRight,
  ToggleLeft,
  X,
} from "lucide-react";
import type {
  InitialScreenState,
  IScreen,
} from "../interfaces/screen.interface";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import {
  createScreen,
  getAllScreens,
  updateScreenStatus,
} from "../api/screen.api";
import { v4 as uuidv4 } from "uuid";

export function ScreensManagement() {
  const dataScreens: InitialScreenState = useAppSelector((s) => s.screens);
  const theatersData = useAppSelector((s) => s.theater.theaters);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (dataScreens.screens.length === 0) {
      dispatch(getAllScreens());
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [screenToDelete, setScreenToDelete] = useState<IScreen | null>(null);
  const [filterTheater, setFilterTheater] = useState("all");
  const [formData, setFormData] = useState<Omit<IScreen, "id">>({
    name: "",
    theaterId: "",
    capacity: 1,
    type: "2D",
    status: "Đang hoạt động",
    theater: "",
  });

  const filteredScreens =
    filterTheater === "all"
      ? dataScreens.screens
      : dataScreens.screens.filter((s) => s.theater === filterTheater);

  const theaters = [...new Set(dataScreens.screens.map((s) => s.theater))];

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

  const toggleStatus = (id: string) => {
    dispatch(
      updateScreenStatus({
        id,
        status:
          dataScreens.screens.find((screen) => screen.id.toString() === id)
            ?.status === "Đang hoạt động"
            ? "Ngừng hoạt động"
            : "Đang hoạt động",
      })
    );
  };

  const handleDeleteClick = (screen: IScreen) => {
    setScreenToDelete(screen);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (screenToDelete) {
      setShowDeleteModal(false);
      setScreenToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setScreenToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScreen: IScreen = {
      id: uuidv4(),
      name: formData.name,
      theater: formData.theater,
      capacity: Number(formData.capacity),
      theaterId: formData.theaterId,
      type: formData.type,
      status: formData.status,
    };
    dispatch(createScreen(newScreen));
    setShowModal(false);
    setFormData({
      name: "",
      theater: "",
      capacity: 0,
      type: "2D",
      status: "Đang hoạt động",
      theaterId: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "theaterId") {
      const selectedTheater = theatersData.find(
        (theater) => theater.id === value
      );
      setFormData((pre) => ({
        ...pre,
        theaterId: value,
        theater: selectedTheater ? selectedTheater.name : "",
      }));
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-200 mb-2 font-bold text-2xl">
            Quản lý phòng chiếu
          </h1>
          <p className="text-gray-300">
            Thêm, chỉnh sửa và quản lý phòng chiếu cho từng rạp
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
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
                      <button
                        onClick={() => toggleStatus(screen.id)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                        title="Đổi trạng thái"
                      >
                        {screen.status === "Đang hoạt động" ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(screen)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
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

      {/* Add Screen Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-linear-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-bold mb-1">
                  Thêm Phòng Chiếu Mới
                </h2>
                <p className="text-red-100 text-[15px]">
                  Điền thông tin phòng chiếu
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên phòng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="VD: Phòng 1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rạp chiếu <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="theaterId"
                    required
                    value={formData.theaterId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  >
                    <option value="">Chọn rạp</option>
                    {theatersData.map((theater) => (
                      <option key={theater.id} value={theater.id}>
                        {theater.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sức chứa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    required
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="VD: 120"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loại phòng <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  >
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="IMAX">IMAX</option>
                    <option value="4DX">4DX</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  Thêm Phòng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && screenToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            {/* Header */}
            <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Xác Nhận Xóa</h2>
                  <p className="text-red-100 text-sm mt-1">
                    Hành động này không thể hoàn tác
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Bạn có chắc chắn muốn xóa phòng chiếu này không?
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Film className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {screenToDelete.theater}
                    </p>
                    <p className="text-sm text-gray-600">
                      {screenToDelete.name}
                    </p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-sm text-gray-500">
                        {screenToDelete.capacity} ghế
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {screenToDelete.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  Xóa Phòng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
