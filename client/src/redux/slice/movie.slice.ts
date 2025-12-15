import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "../../api/movie.api";
import type { Movie } from "../../types/movie.interface";
import type { InitialStateType } from "../../types/type.interface";

const initialState: InitialStateType<Movie> = {
  status: "idle",
  data: [],
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi tải danh sách phim";
      });
  },
});

export default movieSlice.reducer;
