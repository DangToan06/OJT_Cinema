import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import type { Price } from "../interfaces/price.interface";

export const getAllPrices = createAsyncThunk("/getAllPrices", async () => {
  const res = axiosInstance.get("ticket_prices");
  return (await res).data;
});

export const editPrice = createAsyncThunk(
  "/editPrice",
  async (price: Price) => {
    const res = await axiosInstance.put(`/ticket_prices/${price.id}`, price);
    return res.data;
  }
);

// api/timeDiscount.api.ts

export const getTimeDiscounts = createAsyncThunk("timeDiscounts/getAll", async () => {
  const res = await axiosInstance.get("time_discounts");
  return res.data;
  return res.data;
});

export const updateTimeDiscount = createAsyncThunk("timeDiscounts/update", async (item: any) => {
  const res = await axiosInstance.put(`/time_discounts/${item.id}`, item);
  return res.data;
});

// api/dayMultiplier.api.ts

export const getDayMultipliers = createAsyncThunk("dayMultipliers/getAll", async () => {
  const res = await axiosInstance.get("day_multipliers");
  return res.data;
});

export const updateDayMultiplier = createAsyncThunk("dayMultipliers/update", async (item: any) => {
  const res = await axiosInstance.put(`/day_multipliers/${item.id}`, item);
  return res.data;
});

// api/screenType.api.ts

export const getScreenTypes = createAsyncThunk("screenTypes/getAll", async () => {
  const res = await axiosInstance.get("screen_types");
  return res.data;
});

export const updateScreenType = createAsyncThunk("screenTypes/update", async (item: any) => {
  const res = await axiosInstance.put(`/screen_types/${item.id}`, item);
  return res.data;
});

// api/seatType.api.ts

export const getSeatTypes = createAsyncThunk("seatTypes/getAll", async () => {
  const res = await axiosInstance.get("seat_types");
  return res.data;
});

export const updateSeatType = createAsyncThunk("seatTypes/update", async (item: any) => {
  {
  const res = await axiosInstance.put(`/seat_types/${item.id}`, item);
  return res.data;
}});