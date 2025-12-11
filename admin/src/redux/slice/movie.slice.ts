import { createSlice } from "@reduxjs/toolkit";
import {
  addNewMovie,
  deleteMovie,
  fetchMovies,
  updateMovie,
} from "../../api/movie.api";
import type { InitialStateType, Movie } from "../../util/type.util";

interface MovieState extends InitialStateType<Movie> {
  totalMovies: number;
}

const initialState: MovieState = {
  status: "idle",
  data: [],
  error: null,
  totalMovies: 0,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMovieState: (state) => {
      state.status = "idle";
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
        state.totalMovies = action.payload.total;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi tải danh sách phim";
      })

      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
        state.totalMovies += 1;
      })

      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.data = state.data.filter((movie) => movie.id !== action.payload);
        state.totalMovies -= 1;
      })

      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export const { resetMovieState } = movieSlice.actions;
export default movieSlice.reducer;
