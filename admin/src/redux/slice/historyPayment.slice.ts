import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType, Payment } from "../../util/type.util";
import { getAllHistoryPayment } from "../../api/historyPayment.api";

const initialState: InitialStateType<Payment> = {
  data: [],
  status: "idle",
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllHistoryPayment.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllHistoryPayment.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllHistoryPayment.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default historySlice.reducer;
