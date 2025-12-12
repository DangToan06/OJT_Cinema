import { createSlice } from "@reduxjs/toolkit";
import type { InitialBookingState } from "../../interfaces/booking.interface";
import { getAllBooking } from "../../api/booking.api";

const initialState: InitialBookingState = {
  status: "idle",
  data: [],
  error: undefined,
  booking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllBooking.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllBooking.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default bookingSlice.reducer;
