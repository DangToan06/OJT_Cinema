import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "../../types/type.interface";
import { getAllShowtimes } from "../../api/showTime.api";
import type { Showtimes } from "../../types/showtime.interface";

const initialState: InitialStateType<Showtimes> = {
  status: "pending",
  data: [],
  error: undefined,
};

const showtimeSlice = createSlice({
  name: "showtime",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllShowtimes.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllShowtimes.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllShowtimes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default showtimeSlice.reducer;
