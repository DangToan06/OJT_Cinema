export interface InitialStateType<T> {
  status: "idle" | "pending" | "success" | "failed";
  data: T[];
  error: null | undefined | string;
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

export interface MovieResponse {
  movies: Movie[];
}
