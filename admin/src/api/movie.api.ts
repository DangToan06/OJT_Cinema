import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllMovies = createAsyncThunk(
  "movies/getAllmovies",
  async () => {
    const response = await axiosInstance.get("/movies");
    return response.data;
  }
);
