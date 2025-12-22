import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllHistoryPayment = createAsyncThunk(
  "/getAllHistoryPayment",
  async () => {
    const res = await axiosInstance.get("/payment_history");
    return res.data;
  }
);
