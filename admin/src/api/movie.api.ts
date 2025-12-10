import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import type { Movie } from "../util/type.util";

export const getAllMovies = createAsyncThunk(
  "movies/getAllmovies",
  async () => {
    const response = await axiosInstance.get("movies");
    return response.data;
  }
);

export const addNewMovie = createAsyncThunk(
  "movies/addNewMovie",
  async (movieData: Movie) => {
    const response = await axiosInstance.post("movies", movieData);
    return response.data;
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movieData }: { id: number; movieData: FormData }) => {
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
