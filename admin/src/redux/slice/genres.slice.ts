import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../../api/genres.api";
import type { InitialStateType, MovieGenre } from "../../util/type.util";

const initialState: InitialStateType<MovieGenre> = {
  data: [],
  status: "idle",
  error: null,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH

      .addCase(fetchGenres.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // ADD

      .addCase(createGenre.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })

      // UPDATE

      .addCase(updateGenre.fulfilled, (state, action) => {
        const index = state.data.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (g) => Number(g.id) !== Number(action.payload)
        );
      });
  },
});

export default genresSlice.reducer;
