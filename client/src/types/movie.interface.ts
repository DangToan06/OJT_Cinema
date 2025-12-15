import type { ID } from "./enums";

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
  showtimes: Showtime[];
}

export interface MovieGenre {
  id: number;
  genre_name: string;
}
export interface Showtime {
  id: number;
  screen_id: number;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

// export interface MovieCreateDTO {
//   title: string;
//   description?: string;
//   director?: string;
//   cast?: string[];
//   posterUrl?: string;
//   trailerUrl?: string;
//   type?: MovieType;
//   duration?: number;
//   releaseDate?: string;
//   genreIds?: ID[];
// }
