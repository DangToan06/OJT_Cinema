import { createSlice } from "@reduxjs/toolkit";
import type { InitialPriceType } from "../../interfaces/price.interface";
import {
  createPrice,
  deletePrice,
  getAllPrice,
  updatePrice,
} from "../../api/price.api";

const initialState: InitialPriceType = {
  status: "idle",
  data: [],
  error: undefined,
  ticketPrice: null,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPrice.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllPrice.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPrice.fulfilled, (state, action) => {
        state.status = "success";
        state.data.unshift(action.payload);
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.data.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter((p) => p.id !== action.payload);
      });
  },
});

export default priceSlice.reducer;
