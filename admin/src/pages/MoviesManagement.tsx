import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { MovieModal } from "../components/MovieModal";
import type { Movie } from "../util/type.util";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { deleteMovie, fetchMovies } from "../api/movie.api";
import { toast, ToastContainer } from "react-toastify";
import PaginationComp from "../components/PaginationComp";
import debounce from "lodash/debounce";

export function MoviesManagement() {
  const dispatch = useAppDispatch();

  const { data: movies, status: movieStatus } = useAppSelector(
    (state) => state.movie
  );

  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 8,
    search: "",
    status: "",
  });

  const loadData = useCallback(() => {
    dispatch(
      fetchMovies({
        page: params.page,
        pageSize: params.pageSize,
        search: params.search,
        status: params.status === "all" ? "" : params.status,
      })
    );
  }, [dispatch, params]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setParams((prev) => ({ ...prev, search: value, page: 1 }));
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, status: e.target.value, page: 1 }));
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setParams((prev) => ({ ...prev, page, pageSize }));
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa phim này?")) {
      const result = await dispatch(deleteMovie(id));
      if (deleteMovie.fulfilled.match(result)) {
        toast.success("Xóa thành công!");
        loadData();
      } else {
        toast.error("Xóa thất bại!");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DANGCHIEU":
        return "bg-green-100 text-green-700";
      case "SAPCHIEU":
        return "bg-blue-100 text-blue-700";
      case "NGUNGCHIEU":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // console.log(movies);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

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
            setEditingMovie(undefined);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" /> Thêm phim mới
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
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={params.status}
                onChange={handleFilterChange}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="DANGCHIEU">Đang chiếu</option>
                <option value="SAPCHIEU">Sắp chiếu</option>
                <option value="NGUNGCHIEU">Ngừng chiếu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {movieStatus === "idle" ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : movies.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              Không tìm thấy phim nào.
            </div>
          ) : (
            movies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative overflow-hidden aspect-[2/3]">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusColor(
                        movie.status
                      )}`}
                    >
                      {movie.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3
                    className="text-gray-900 font-semibold mb-1 line-clamp-1"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {movie.genres_movie?.map((g) => g.genreName).join(", ")}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    <span>⏳ {movie.duration} phút</span>
                    <span className="flex items-center gap-1 font-medium">
                      ⭐ 7.6
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <MovieModal
          movie={editingMovie}
          onClose={() => {
            setShowModal(false);
            loadData();
          }}
        />
      )}

      <div className="flex justify-center pb-8">
        <PaginationComp
          pageSize={params.pageSize}
          total={20}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
