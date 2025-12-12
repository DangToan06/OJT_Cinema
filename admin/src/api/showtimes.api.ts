import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8080/showtimes";

/* lấy ALL */
export const fetchShowtimes = createAsyncThunk(
  "showtimes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi tải lịch chiếu");
    }
  }
);

/* thêm */
export const createShowtime = createAsyncThunk(
  "showtimes/create",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(API_URL, payload);
      // Tự động fetch lại để đồng bộ UI
      dispatch(fetchShowtimes());
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi tạo suất chiếu");
    }
  }
);

/* sửa */
export const updateShowtime = createAsyncThunk(
  "showtimes/update",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      dispatch(fetchShowtimes());
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi cập nhật");
    }
  }
);

/* xóa */
export const deleteShowtime = createAsyncThunk(
  "showtimes/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(fetchShowtimes());
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi xóa");
    }
  }
);