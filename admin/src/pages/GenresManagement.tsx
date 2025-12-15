import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store/store";
import {
  createGenre,
  deleteGenre,
  fetchGenres,
  updateGenre,
} from "../api/genres.api";
import Swal from "sweetalert2";
import type { MovieGenre } from "../util/type.util";

export function GenresManagement() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: genres, status } = useSelector(
    (state: RootState) => state.genres
  );

  const [showModal, setShowModal] = useState(false);
  const [editingGenre, setEditingGenre] = useState<any>(null);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingGenre(null);
    setGenreName("");
    setShowModal(true);
  };

  const handleEdit = (genre: any) => {
    setEditingGenre(genre);
    setGenreName(genre.genreName);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!genreName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Lỗi",
        text: "Tên thể loại không được để trống",
        timer: 2000,
        toast: true,
        position: "top-end",
      });
      return;
    }

    const nameToCheck = genreName.trim().toLowerCase();

    if (!editingGenre) {
      const isDuplicate = genres.some(
        (g) => g.genreName.trim().toLowerCase() === nameToCheck
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Thể loại đã tồn tại!",
          text: "Vui lòng nhập tên khác.",
          timer: 2000,
          toast: true,
          position: "top-end",
        });
        return;
      }
    }

    if (editingGenre) {
      const isDuplicate = genres.some(
        (g) =>
          g.id !== editingGenre.id &&
          g.genreName.trim().toLowerCase() === nameToCheck
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Tên thể loại đã tồn tại!",
          text: "Vui lòng nhập tên khác.",
          timer: 2000,
          toast: true,
          position: "top-end",
        });
        return;
      }
    }

    if (editingGenre) {
      dispatch(
        updateGenre({ id: editingGenre.id, genreName: genreName.trim() })
      );
    } else {
      dispatch(createGenre(genreName.trim()));
    }

    setShowModal(false);
    setGenreName("");
    setEditingGenre(null);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Xóa thể loại?",
      text: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      dispatch(deleteGenre(id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white mb-2 font-bold text-2xl">
              Quản lý thể loại phim
            </h1>
            <p className="text-gray-400">
              Tạo mới, chỉnh sửa và xóa thể loại phim
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Thêm thể loại
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#1e2939] rounded-lg border border-gray-700 overflow-hidden">
          {status === "idle" ? (
            <div className="p-16 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-400">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr>
                    {["ID", "Tên thể loại", "Số lượng phim", "Thao tác"].map(
                      (h) => (
                        <th
                          key={h}
                          className={`px-6 py-4 text-sm font-medium text-gray-400 ${
                            h === "Thao tác" ? "text-right" : "text-left"
                          }`}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {genres.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-16 text-gray-400"
                      >
                        Chưa có thể loại nào
                      </td>
                    </tr>
                  ) : (
                    genres.map((genre: MovieGenre, index: number) => (
                      <tr
                        key={genre.id}
                        className="hover:bg-[#263445] transition"
                      >
                        <td className="px-6 py-4 text-white font-medium">
                          #{index + 1}
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {genre.genreName}
                        </td>
                        <td className="px-6 py-4 text-gray-400 font-medium">
                          12
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => handleEdit(genre)}
                              className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(genre.id)}
                              className="p-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1e2939] rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingGenre ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}
              </h2>

              <div className="mb-6">
                <label className="block text-gray-400 font-medium mb-2">
                  Tên thể loại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={genreName}
                  onChange={(e) => setGenreName(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-[#263445] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Ví dụ: Hành động, Tình cảm..."
                  autoFocus
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingGenre(null);
                    setGenreName("");
                  }}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-[#263445] transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={!genreName.trim()}
                  className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition disabled:opacity-60"
                >
                  {editingGenre ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
