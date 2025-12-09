import type { ID, MovieType } from "./enums";

/**
 * Thể loại phim (hành động, kinh dị, lãng mạn…)
 */
export interface Genre {
  id: ID;
  genreName: string;
}

/**
 * Thông tin phim hiển thị ở trang danh sách và trang chi tiết
 */
export interface Movie {
  id: ID;
  title: string;
  description?: string;
  director?: string;
  cast?: string[]; // danh sách diễn viên
  posterUrl?: string;
  trailerUrl?: string;
  type?: MovieType; // 2D / 3D
  duration?: number; // thời lượng phim (phút)
  releaseDate?: string;
  status?: 'NOW_SHOWING' | 'COMING_SOON' | 'STOPPED';
  genres?: Genre[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Dữ liệu khi admin tạo phim mới
 */
export interface MovieCreateDTO {
  title: string;
  description?: string;
  director?: string;
  cast?: string[];
  posterUrl?: string;
  trailerUrl?: string;
  type?: MovieType;
  duration?: number;
  releaseDate?: string;
  genreIds?: ID[];
}
