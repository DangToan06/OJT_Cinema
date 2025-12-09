import { useState } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { MovieModal } from "./MovieModal";

export function MoviesManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const movies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      genre: "Hành động, Khoa học viễn tưởng",
      duration: 181,
      releaseDate: "2025-04-26",
      status: "Đang chiếu",
      rating: 8.4,
      poster:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      description:
        "Sau sự kiện tàn khốc của Infinity War, các Avengers tập hợp lần cuối để đảo ngược hành động của Thanos.",
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      genre: "Hành động, Phiêu lưu",
      duration: 148,
      releaseDate: "2025-12-17",
      status: "Đang chiếu",
      rating: 8.7,
      poster:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      description:
        "Peter Parker tìm kiếm sự giúp đỡ của Doctor Strange khi danh tính của anh bị tiết lộ.",
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Hành động, Tội phạm, Bí ẩn",
      duration: 176,
      releaseDate: "2025-03-04",
      status: "Sắp chiếu",
      rating: 7.9,
      poster:
        "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      description:
        "Batman khám phá tham nhũng ở Gotham City và liên hệ của nó với gia đình mình.",
    },
    {
      id: 4,
      title: "Avatar: The Way of Water",
      genre: "Khoa học viễn tưởng, Phiêu lưu",
      duration: 192,
      releaseDate: "2025-12-16",
      status: "Ngừng chiếu",
      rating: 7.8,
      poster:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      description:
        "Jake Sully và gia đình của anh phải đối mặt với những thách thức mới trên hành tinh Pandora.",
    },
  ];

  const handleEdit = (movie: any) => {
    setEditingMovie(movie);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa phim này?")) {
      // Handle delete
      console.log("Delete movie:", id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang chiếu":
        return "bg-green-100 text-green-700";
      case "Sắp chiếu":
        return "bg-blue-100 text-blue-700";
      case "Ngừng chiếu":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý phim</h1>
          <p className="text-gray-600">
            Thêm, sửa, xóa và cập nhật thông tin phim
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMovie(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm phim mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="showing">Đang chiếu</option>
                <option value="upcoming">Sắp chiếu</option>
                <option value="stopped">Ngừng chiếu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      movie.status
                    )}`}
                  >
                    {movie.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {movie.genre}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{movie.duration} phút</span>
                  <span className="flex items-center gap-1">
                    ⭐ {movie.rating}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <MovieModal
          movie={editingMovie}
          onClose={() => {
            setShowModal(false);
            setEditingMovie(null);
          }}
        />
      )}
    </div>
  );
}
