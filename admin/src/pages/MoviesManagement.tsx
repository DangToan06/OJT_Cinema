import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { MovieModal } from "../components/MovieModal";
import type { Movie } from "../util/type.util";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { getAllMovies } from "../api/movie.api";

export function MoviesManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { data: movies, status: movieStatus } = useAppSelector(
    (state) => state.movie
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movieStatus === "idle") {
      dispatch(getAllMovies());
    }
  }, [dispatch, movieStatus]);

  const handleEdit = (movie: Movie) => {
    console.log(movie);

    setEditingMovie(false);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa phim này?")) {
      console.log("Delete movie:", id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DANGCHIEU":
        return "bg-green-100 text-green-700";
      case "SAPCHIEU":
        return "bg-blue-100 text-blue-700";
      case "NGƯNGCHIEU":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2 font-bold text-2xl">
            Quản lý phim
          </h1>
          <p className="text-gray-600">
            Thêm, sửa, xóa và cập nhật thông tin phim
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMovie(false);
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
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={`https://picsum.photos/id/${movie.id}/300`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      movie.status
                    )}`}
                  >
                    {movie.status === "DANGCHIEU"
                      ? "Đang chiếu"
                      : movie.status === "SAPCHIEU"
                      ? "Sắp chiếu"
                      : "Ngừng chiếu"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {movie.genres_movie
                    .map((genre) => genre.genre_name)
                    .join(", ")}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{movie.duration} phút</span>
                  <span className="flex items-center gap-1">⭐ 7.6</span>
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
            setEditingMovie(false);
          }}
        />
      )}
    </div>
  );
}
