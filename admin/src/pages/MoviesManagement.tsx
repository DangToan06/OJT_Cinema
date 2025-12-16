import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { MovieModal } from '../components/MovieModal';
import type { Movie } from '../util/type.util';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { deleteMovie, fetchMovies } from '../api/movie.api';

import PaginationComp from '../components/PaginationComp';
import debounce from 'lodash/debounce';
import { notify } from '../util/toast';

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
        search: '',
        status: '',
    });

    const loadData = useCallback(() => {
        dispatch(
            fetchMovies({
                page: params.page,
                pageSize: params.pageSize,
                search: params.search,
                status: params.status === 'all' ? '' : params.status,
            })
        );
    }, [dispatch, params]);

    useEffect(() => {
        loadData();
      } else {
        toast.error("Xóa thất bại!");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DANGCHIEU":
        return "bg-green-500/20 text-green-400";
      case "SAPCHIEU":
        return "bg-blue-500/20 text-blue-400";
      case "NGUNGCHIEU":
        return "bg-gray-500/20 text-gray-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
            Quản lý phim
          </h1>
          <p className="text-gray-400">
            Thêm, sửa, xóa và cập nhật thông tin phim
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMovie(undefined);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-5 h-5" /> Thêm phim mới
        </button>
      </div>

      <div className="bg-[#1e2939] rounded-lg border border-gray-700 mb-6">
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên phim..."
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#263445] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={params.status}
                onChange={handleFilterChange}
                className="pl-10 pr-8 py-2 rounded-lg bg-[#263445] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
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
            <div className="col-span-full text-center py-10 text-gray-400">
              Đang tải dữ liệu...
            </div>
          ) : movies.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-400">
              Không tìm thấy phim nào.
            </div>
          ) : (
            movies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="bg-[#1e2939] border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        movie.status
                      )}`}
                    >
                      {movie.status}
                    </span>
                  </div>
                </div>

                {/* Movie grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {movieStatus === 'idle' ? (
                        <div className="col-span-full text-center py-10 text-gray-400">
                            Đang tải dữ liệu...
                        </div>
                    ) : movies.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-400">
                            Không tìm thấy phim nào.
                        </div>
                    ) : (
                        movies.map((movie: Movie) => (
                            <div
                                key={movie.id}
                                className="bg-[#1e2939] border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition group"
                            >
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                movie.status
                                            )}`}
                                        >
                                            {movie.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3
                                        className="text-white font-semibold mb-1 line-clamp-1"
                                        title={movie.title}
                                    >
                                        {movie.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                                        {movie.genres_movie
                                            ?.map((g) => g.genreName)
                                            .join(', ')}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                                        <span>⏳ {movie.duration} phút</span>
                                        <span className="font-medium">
                                            ⭐ 7.6
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(movie)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition text-sm"
                                        >
                                            <Edit className="w-4 h-4" /> Sửa
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(movie.id)
                                            }
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition text-sm"
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
