import { X } from "lucide-react";
import { useState } from "react";

interface MovieModalProps {
  movie: any;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    genre: movie?.genre || "",
    duration: movie?.duration || "",
    releaseDate: movie?.releaseDate || "",
    status: movie?.status || "Sắp chiếu",
    rating: movie?.rating || "",
    poster: movie?.poster || "",
    trailer: movie?.trailer || "",
    description: movie?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving movie:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">
            {movie ? "Chỉnh sửa phim" : "Thêm phim mới"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Tên phim *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập tên phim"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Thể loại *</label>
              <input
                type="text"
                required
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="VD: Hành động, Khoa học viễn tưởng"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Thời lượng (phút) *
              </label>
              <input
                type="number"
                required
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="120"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Ngày phát hành *
              </label>
              <input
                type="date"
                required
                value={formData.releaseDate}
                onChange={(e) =>
                  setFormData({ ...formData, releaseDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Trạng thái *</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Đang chiếu">Đang chiếu</option>
                <option value="Sắp chiếu">Sắp chiếu</option>
                <option value="Ngừng chiếu">Ngừng chiếu</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Đánh giá *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="8.5"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">URL Poster</label>
              <input
                type="url"
                value={formData.poster}
                onChange={(e) =>
                  setFormData({ ...formData, poster: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">URL Trailer</label>
              <input
                type="url"
                value={formData.trailer}
                onChange={(e) =>
                  setFormData({ ...formData, trailer: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Mô tả *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập mô tả phim..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {movie ? "Cập nhật" : "Thêm phim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
