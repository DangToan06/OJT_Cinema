import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllScreens = createAsyncThunk("getAllScreen", async () => {
  const response = await axiosInstance.get("/screens");
  return response.data;
});
