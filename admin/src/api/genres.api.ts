import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";
import type { MovieGenre } from "../util/type.util";

const GENRES_ENDPOINT = "/genres";

// LẤY tất cả thể loại
export const fetchGenres = createAsyncThunk<MovieGenre[], void>(
  "genres/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<MovieGenre[]>(GENRES_ENDPOINT);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Không thể tải thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);

// THÊM thể loại mới
export const createGenre = createAsyncThunk<
  MovieGenre,
  { genreName: string; movieCount?: number }
>(
  "genres/create",
  async ({ genreName, movieCount = 0 }, { rejectWithValue }) => {
    try {
      const payload: Partial<MovieGenre> = {
        genreName: genreName.trim(),
      };

      if (movieCount !== undefined && movieCount >= 0) {
        payload.movieCount = movieCount;
      }

      const response = await axiosInstance.post<MovieGenre>(
        GENRES_ENDPOINT,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Thêm thể loại thành công!",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Không thể thêm thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);

// SỬA thể loại
export const updateGenre = createAsyncThunk<
  MovieGenre,
  { id: string; genreName: string; movieCount?: number }
>(
  "genres/update",
  async ({ id, genreName, movieCount }, { rejectWithValue }) => {
    try {
      const payload: Partial<MovieGenre> = {
        genreName: genreName.trim(),
      };

      if (movieCount !== undefined && movieCount >= 0) {
        payload.movieCount = movieCount;
      }

      const response = await axiosInstance.patch<MovieGenre>(
        `${GENRES_ENDPOINT}/${id}`,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Cập nhật thể loại thành công!",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Không thể cập nhật thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);

// XÓA thể loại

export const deleteGenre = createAsyncThunk<string, string>(
  "genres/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${GENRES_ENDPOINT}/${id}`);

      Swal.fire({
        icon: "success",
        title: "Đã xóa thể loại thành công!",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });

      return id;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Không thể xóa thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);