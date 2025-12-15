import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import type { Movie } from "../util/type.util";

interface FetchMoviesParams {
  page: number;
  pageSize: number;
  search?: string;
  genre?: string;
  status?: string;
}

// export const getAllMovies = createAsyncThunk(
//   "movies/getAllmovies",
//   async () => {
//     const response = await axiosInstance.get("movies");
//     return response.data;
//   }
// );

export const addNewMovie = createAsyncThunk(
  "movies/addNewMovie",
  async (movieData: Movie) => {
    const response = await axiosInstance.post("movies", movieData);
    return response.data;
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movieData }: { id: string; movieData: Movie }) => {
    const response = await axiosInstance.put(`movies/${id}`, movieData);
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id: string) => {
    await axiosInstance.delete(`movies/${id}`);
    return id;
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params: FetchMoviesParams) => {
    const { page, pageSize, search, genre, status } = params;

    const queryParams = new URLSearchParams();

    queryParams.append("_page", page.toString());
    queryParams.append("_limit", pageSize.toString());

    if (search) {
      queryParams.append("q", search);
    }

    if (genre) {
      queryParams.append("genre", genre);
    }

    if (status) {
      queryParams.append("status", status);
    }

    const response = await axiosInstance.get(
      `movies?${queryParams.toString()}`
    );

    return {
      data: response.data,
      total: response.headers["x-total-count"],
    };
  }
);
