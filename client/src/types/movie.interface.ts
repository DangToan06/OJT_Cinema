import type { ID } from "./enums";
import type { Showtimes } from "./showtime.interface";

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
  id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  trailer: string;
  type: "2D" | "3D" | string;
  duration: number;
  genres_movie: MovieGenre[];
  status: "SAPCHIEU" | "DANGCHIEU" | string;
  release_date: string;
  created_at: string;
  updated_at: string;
  showtimes: Showtimes[];
}

export interface MovieGenre {
  id: number;
  genre_name: string;
}
