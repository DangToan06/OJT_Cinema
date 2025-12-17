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
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL 
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
        state.error = action.payload as string ?? "Không thể tải thể loại";
      })

      // CREATE 
      .addCase(createGenre.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createGenre.fulfilled, (state, action) => {
        state.status = "success";
        state.data.unshift(action.payload); 
      })
      .addCase(createGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string ?? "Không thể thêm thể loại";
      })

      // UPDATE
      .addCase(updateGenre.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateGenre.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.data.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string ?? "Không thể cập nhật thể loại";
      })

      // DELETE 
      .addCase(deleteGenre.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter((g) => g.id !== action.payload);
      })
      .addCase(deleteGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string ?? "Không thể xóa thể loại";
      });
  },
});

export default genresSlice.reducer;