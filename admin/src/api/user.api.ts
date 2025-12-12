import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const getAllUser = createAsyncThunk("/getAllUsers", async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
});

export const blockUser = createAsyncThunk("/blockUser", async (id: number) => {
  const res = await axiosInstance.patch(`/users/${id}`, {status: "BLOCKED"});
  return res.data;
});

export const unblockUser = createAsyncThunk(
  "/unblockUser",
  async (id: number) => {
    const res = await axiosInstance.patch(`/users/${id}`, {status: "ACTIVE"});
    return res.data;
  }
);
