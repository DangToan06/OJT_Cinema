import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import type { TicketPrice } from "../interfaces/price.interface";

export const getAllPrice = createAsyncThunk("/getAllPrice", async () => {
  const res = await axiosInstance.get("/prices");
  return res.data;
});

export const createPrice = createAsyncThunk(
  "/prices/create",
  async (price: TicketPrice) => {
    const res = await axiosInstance.post("/prices", price);
    return res.data;
  }
);

export const updatePrice = createAsyncThunk(
  "/prices/update",
  async (price: TicketPrice) => {
    const { id, ...payload } = price; 
    const res = await axiosInstance.patch(`/prices/${id}`, payload);
    return res.data;
  }
);


export const deletePrice = createAsyncThunk(
  "/prices/delete",
  async (id: string) => {
    await axiosInstance.delete(`/prices/${id}`);
    return id;
  }
);
