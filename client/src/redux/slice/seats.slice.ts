import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "../../types/type.interface";
import type { SeatsMapEntity } from "../../types/theater.interface";
import { getAllSeats } from "../../api/seat.api";

const initialState: InitialStateType<SeatsMapEntity> = {
  status: "idle",
  data: [],
  error: null,
};

const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSeats.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getAllSeats.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllSeats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi tải danh sách ghế";
      });
  },
});

export default seatSlice.reducer;
