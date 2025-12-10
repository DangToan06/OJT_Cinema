
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";

const GENRES_ENDPOINT = "/genres";

export interface Genre {
  id: string;
  genreName: string;
}

// LẤY all
export const fetchGenres = createAsyncThunk<Genre[], void>(
  "genres/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Genre[]>(GENRES_ENDPOINT);
      return response.data; 
    } catch (error: any) {
      const message = error.response?.data?.message || "Không thể tải thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);

// THÊM
export const createGenre = createAsyncThunk<Genre, string>(
  "genres/create",
  async (genreName, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Genre>(GENRES_ENDPOINT, {
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
      const message = error.response?.data?.message || "Không thể thêm thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);

// SỬA
export const updateGenre = createAsyncThunk<
  Genre,
  { id: string; genreName: string }
>(
  "genres/update",
  async ({ id, genreName }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<Genre>(`${GENRES_ENDPOINT}/${id}`, {
        genreName: genreName.trim(),
      });
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        toast: true,
        position: "top-end",
        timer: 1500,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Không thể cập nhật thể loại";
      Swal.fire("Lỗi!", message, "error");
      return rejectWithValue(message);
    }
  }
);

// XÓA
export const deleteGenre = createAsyncThunk<string, string>(
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