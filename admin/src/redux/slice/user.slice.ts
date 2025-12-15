import { createSlice } from "@reduxjs/toolkit";
import { blockUser, getAllUser, unblockUser } from "../../api/user.api";
import type { InitialUserState } from "../../interfaces/user.interface";

const initialState: InitialUserState = {
  status: "pending",
  data: [],
  error: undefined,
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
