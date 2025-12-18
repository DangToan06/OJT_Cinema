import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "../../types/type.interface";
import { getAllScreens } from "../../api/screen.api";
import type { IScreen } from "../../types/theater.interface";

const initialState: InitialStateType<IScreen> = {
  status: "idle",
  data: [],
  error: null,
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllScreens.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getAllScreens.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllScreens.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi tải danh sách phòng";
      });
  },
});

export default screenSlice.reducer;
