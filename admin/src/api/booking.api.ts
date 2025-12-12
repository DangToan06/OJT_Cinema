import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllBooking = createAsyncThunk("/getAllBooking", async () => {
    const res = await axiosInstance.get("/bookings");
    return res.data
})