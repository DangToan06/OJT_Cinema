import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllSeats = createAsyncThunk("getAllSeats", async () => {
  const response = await axiosInstance.get("/seat_map");
  return response.data;
});
