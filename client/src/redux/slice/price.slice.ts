import { createSlice } from "@reduxjs/toolkit";
import type { InitialPriceType } from "../../types/price.interface";
import { getAllPrice } from "../../api/price.api";

const initialState: InitialPriceType = {
  status: "pending",
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
      });
  },
});

export default priceSlice.reducer;
