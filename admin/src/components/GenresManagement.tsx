import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export function GenresManagement() {
  const [genres, setGenres] = useState([
    { id: 1, name: "Hành động", movieCount: 45 },
    { id: 2, name: "Khoa học viễn tưởng", movieCount: 32 },
    { id: 3, name: "Kinh dị", movieCount: 28 },
    { id: 4, name: "Hài", movieCount: 38 },
    { id: 5, name: "Tình cảm", movieCount: 42 },
    { id: 6, name: "Phiêu lưu", movieCount: 35 },
    { id: 7, name: "Hoạt hình", movieCount: 25 },
    { id: 8, name: "Tài liệu", movieCount: 15 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingGenre, setEditingGenre] = useState<any>(null);
  const [genreName, setGenreName] = useState("");

  const handleEdit = (genre: any) => {
    setEditingGenre(genre);
    setGenreName(genre.name);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingGenre(null);
    setGenreName("");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!genreName.trim()) return;

    if (editingGenre) {
      setGenres(
        genres.map((g) =>
          g.id === editingGenre.id ? { ...g, name: genreName } : g
        )
      );
    } else {
      setGenres([
        ...genres,
        {
          id: genres.length + 1,
          name: genreName,
          movieCount: 0,
        },
      ]);
    }

    setShowModal(false);
    setGenreName("");
    setEditingGenre(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa thể loại này?")) {
      setGenres(genres.filter((g) => g.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý thể loại phim</h1>
          <p className="text-gray-600">
            Tạo mới, chỉnh sửa và xóa thể loại phim
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm thể loại
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">ID</th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Tên thể loại
                </th>
                <th className="px-6 py-4 text-left text-gray-600">
                  Số lượng phim
                </th>
                <th className="px-6 py-4 text-right text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {genres.map((genre) => (
                <tr key={genre.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">#{genre.id}</td>
                  <td className="px-6 py-4 text-gray-900">{genre.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {genre.movieCount} phim
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(genre)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(genre.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">
                {editingGenre ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}
              </h2>
            </div>
            <div className="p-6">
              <label className="block text-gray-700 mb-2">Tên thể loại *</label>
              <input
                type="text"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập tên thể loại"
                autoFocus
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {editingGenre ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
