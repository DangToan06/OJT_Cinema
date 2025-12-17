import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Movie, MovieGenre } from "../util/type.util";
import { addNewMovie, updateMovie } from "../api/movie.api";
import { useAppDispatch } from "../hook/useRedux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import type { RootState } from "../redux/store/store";
import { fetchGenres } from "../api/genres.api";
import { useSelector } from "react-redux";

interface MovieModalProps {
  movie: Movie | undefined;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const idRandom = uuidv4();
  const dateNow = new Date();
  const [formData, setFormData] = useState<Movie>({
    title: movie?.title || "",
    description: movie?.description || "",
    author: movie?.author || "",
    image: movie?.image || "",
    trailer: movie?.trailer || "",
    type: movie?.type || "2D",
    duration: movie?.duration || 120,
    genres_movie: movie?.genres_movie || [],
    status: movie?.status || "SAPCHIEU",
    release_date: movie?.release_date || "",
    created_at: movie?.created_at || dateNow.toISOString(),
    updated_at: movie?.updated_at || dateNow.toISOString(),
    id: movie?.id || idRandom,
    showtimes: movie?.showtimes || [],
  });

  const dispatch = useAppDispatch();

  const { data: genresMovie } = useSelector((state: RootState) => state.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title === "") {
      toast.error("Vui lòng điền các trường bắt buộc!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else {
      if (!movie) {
        dispatch(addNewMovie(formData));
        toast.success("Thêm mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.success("Cập nhật thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        dispatch(updateMovie({ id: formData.id, movieData: formData }));
      }
    }

    onClose();
  };

  const [openGenreDropdown, setOpenGenreDropdown] = useState(false);

  const toggleGenre = (genre: MovieGenre) => {
    let newGenres;
    if (formData.genres_movie.some((item) => item.id === genre.id)) {
      newGenres = formData.genres_movie.filter((item) => item.id !== genre.id);
    } else {
      newGenres = [...formData.genres_movie, genre];
    }
    setFormData({ ...formData, genres_movie: newGenres });
  };

  const removeGenre = (e: React.MouseEvent, genre: MovieGenre) => {
    e.stopPropagation();
    const newGenres = formData.genres_movie.filter(
      (item) => item.id !== genre.id
    );
    setFormData({ ...formData, genres_movie: newGenres });
  };

  const inputClass =
    "w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-500";
  const labelClass = "block text-gray-300 mb-2 font-medium";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-white text-xl font-bold">
            {movie ? "Chỉnh sửa phim" : "Thêm phim mới"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Tên phim *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={inputClass}
                placeholder="Nhập tên phim"
              />
            </div>

            <div className="mb-4 relative">
              <label className={labelClass}>Thể loại *</label>

              <div className="relative">
                <div
                  onClick={() => setOpenGenreDropdown(!openGenreDropdown)}
                  className={`w-full min-h-[42px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-red-600 transition-all ${
                    openGenreDropdown
                      ? "ring-2 ring-red-600 border-transparent"
                      : ""
                  }`}
                >
                  {formData.genres_movie.length === 0 ? (
                    <span className="text-gray-500">Chọn thể loại...</span>
                  ) : (
                    formData.genres_movie.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-red-900/30 border border-red-900/50 text-red-200 px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1"
                      >
                        {genre.genreName}
                        <button
                          type="button"
                          onClick={(e) => removeGenre(e, genre)}
                          className="hover:text-white focus:outline-none transition-colors"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}

                  <div className="ml-auto text-gray-500">
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openGenreDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                {openGenreDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                    {genresMovie.map((genre) => (
                      <div
                        key={genre.id}
                        onClick={() => toggleGenre(genre)}
                        className={`px-4 py-2 cursor-pointer flex justify-between items-center transition-colors ${
                          formData.genres_movie.some((g) => g.id === genre.id)
                            ? "bg-red-900/20 text-red-400 font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        {genre.genreName}
                        {formData.genres_movie.some(
                          (g) => g.id === genre.id
                        ) && <span className="text-red-500">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {openGenreDropdown && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenGenreDropdown(false)}
                ></div>
              )}
            </div>

            <div>
              <label className={labelClass}>Thời lượng (phút) *</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: Number(e.target.value) })
                }
                className={inputClass}
                placeholder="120"
              />
            </div>

            <div>
              <label className={labelClass}>Ngày phát hành *</label>
              <input
                type="date"
                value={formData.release_date}
                onChange={(e) =>
                  setFormData({ ...formData, release_date: e.target.value })
                }
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>

            <div>
              <label className={labelClass}>Trạng thái *</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className={inputClass}
              >
                <option value="Đang chiếu">Đang chiếu</option>
                <option value="Sắp chiếu">Sắp chiếu</option>
                <option value="Ngừng chiếu">Ngừng chiếu</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Đạo diễn / Tác giả</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className={inputClass}
                placeholder="Nhập tên đạo diễn"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>URL Poster</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className={inputClass}
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>URL Trailer</label>
              <input
                type="url"
                value={formData.trailer}
                onChange={(e) =>
                  setFormData({ ...formData, trailer: e.target.value })
                }
                className={inputClass}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Mô tả *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={inputClass}
                placeholder="Nhập mô tả phim..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-900/20"
            >
              {movie ? "Cập nhật" : "Thêm phim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
