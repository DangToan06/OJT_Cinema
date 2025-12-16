import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllPrice = createAsyncThunk("getAllPrice", async () => {
  const res = await axiosInstance.get("/prices");
  return res.data;
});
