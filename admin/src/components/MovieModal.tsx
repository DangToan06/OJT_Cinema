import { X } from "lucide-react";
import React, { useState } from "react";
import type { Movie, MovieGenre } from "../util/type.util";
import { addNewMovie } from "../api/movie.api";
import { useAppDispatch } from "../hook/useRedux";
import { v4 as uuidv4 } from "uuid";

interface MovieModalProps {
  movie: Movie;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.duration ||
      !formData.release_date ||
      !formData.description ||
      !formData.genres_movie
    ) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    } else {
      dispatch(addNewMovie(formData));
    }

    onClose();
  };

  const AVAILABLE_GENRES = [
    {
      id: 1,
      genre_name: "Hành động",
    },
    {
      id: 2,
      genre_name: "Kinh dị",
    },
    {
      id: 3,
      genre_name: "Tình cảm",
    },
  ];

  const [openGenreDropdown, setOpenGenreDropdown] = useState(false);

  const toggleGenre = (genre: MovieGenre) => {
    let newGenres;
    if (formData.genres_movie.includes(genre)) {
      newGenres = formData.genres_movie.filter((item) => item !== genre);
    } else {
      newGenres = [...formData.genres_movie, genre];
    }
    setFormData({ ...formData, genres_movie: newGenres });
  };

  const removeGenre = (e: React.MouseEvent, genre: MovieGenre) => {
    e.stopPropagation();
    const newGenres = formData.genres_movie.filter((item) => item !== genre);
    setFormData({ ...formData, genres_movie: newGenres });
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

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Thể loại *</label>

              <div className="relative">
                <div
                  onClick={() => setOpenGenreDropdown(!openGenreDropdown)}
                  className="w-full min-h-[42px] px-4 py-2 border border-gray-300 rounded-lg cursor-pointer flex flex-wrap gap-2 items-center bg-white focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent"
                >
                  {formData.genres_movie.length === 0 ? (
                    <span className="text-gray-400">Chọn thể loại...</span>
                  ) : (
                    formData.genres_movie.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1"
                      >
                        {genre.genre_name}
                        <button
                          type="button"
                          onClick={(e) => removeGenre(e, genre)}
                          className="hover:text-red-900 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}

                  <div className="ml-auto text-gray-400">
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
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {AVAILABLE_GENRES.map((genre) => (
                      <div
                        key={genre.id}
                        onClick={() => toggleGenre(genre)}
                        className={`px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                          formData.genres_movie.includes(genre)
                            ? "bg-red-50 text-red-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {genre.genre_name}
                        {formData.genres_movie.includes(genre) && (
                          <span className="text-red-500">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {openGenreDropdown && (
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setOpenGenreDropdown(false)}
                ></div>
              )}
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
                  setFormData({ ...formData, duration: Number(e.target.value) })
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
                value={formData.release_date}
                onChange={(e) =>
                  setFormData({ ...formData, release_date: e.target.value })
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

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">URL Poster</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
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
