import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";
import type { MovieGenre } from "../util/type.util";

const GENRES_ENDPOINT = "/genres";

// LẤY all
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

// THÊM
export const createGenre = createAsyncThunk<MovieGenre, string>(
  "genres/create",
  async (genreName, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<MovieGenre>(GENRES_ENDPOINT, {
        genreName: genreName.trim(),
      });
      Swal.fire({
        icon: "success",
        title: "Thêm thành công!",
        toast: true,
        position: "top-end",
        timer: 1500,
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

// SỬA
export const updateGenre = createAsyncThunk<
  MovieGenre,
  { id: string; genreName: string }
>("genres/update", async ({ id, genreName }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<MovieGenre>(
      `${GENRES_ENDPOINT}/${id}`,
      {
        genreName: genreName.trim(),
      }
    );
    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công!",
      toast: true,
      position: "top-end",
      timer: 1500,
    });
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Không thể cập nhật thể loại";
    Swal.fire("Lỗi!", message, "error");
    return rejectWithValue(message);
  }
});

// XÓA
export const deleteGenre = createAsyncThunk<number, number>(
  "genres/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${GENRES_ENDPOINT}/${id}`);
      Swal.fire({
        icon: "success",
        title: "Đã xóa thể loại!",
        toast: true,
        position: "top-end",
        timer: 1500,
      });
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Không thể xóa thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);
