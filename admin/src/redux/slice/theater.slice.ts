import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  createTheater,
  deleteTheater,
  getAllTheaters,
  updateStatusTheater,
} from "../../api/theater.api";
import type {
  InitialTheaterState,
  ITheater,
  UpdateStatusData,
} from "../../interfaces/theater.interface";

const initialState: InitialTheaterState = {
  theaters: [],
  status: "idle",
  error: null,
  theaterCurrent: null,
};

const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTheaters.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        getAllTheaters.fulfilled,
        (state, action: PayloadAction<ITheater[]>) => {
          state.status = "success";
          state.theaters = action.payload;
        }
      )
      .addCase(getAllTheaters.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(
        createTheater.fulfilled,
        (state, action: PayloadAction<ITheater>) => {
          state.theaters.push(action.payload);
        }
      )
      .addCase(
        deleteTheater.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.theaters = state.theaters.filter(
            (theater) => theater.id !== action.payload
          );
        }
      )
      .addCase(
        updateStatusTheater.fulfilled,
        (state, action: PayloadAction<UpdateStatusData>) => {
          const index = state.theaters.findIndex(
            (theater) => theater.id === action.payload.id
          );
          if (index !== -1) {
            state.theaters[index].status = action.payload.status;
          }
        }
      );
  },
});

export default theaterSlice.reducer;
