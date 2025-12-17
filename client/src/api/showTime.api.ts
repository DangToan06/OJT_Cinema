import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllShowtimes = createAsyncThunk("getAllShowtime", async () => {
  const response = await axiosInstance.get("/showtimes");
  return response.data;
});
