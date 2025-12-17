export interface InitialStateType<T> {
  status: "idle" | "pending" | "success" | "failed";
  data: T[];
  error: null | undefined | string;
}

export interface MovieGenre {
  id: string;
  genreName: string;
  movieCount?: number;
}

export interface Showtimes {
  movie: string;
  theater: string;
  screen: string;
  date: string;
  startTime: string;
  endTime: string;
  availableSeats: number;
  totalSeats: number;
  status: string;
  id: string;
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
  showtimes: string[];
}

export interface MovieResponse {
  movies: Movie[];
}
