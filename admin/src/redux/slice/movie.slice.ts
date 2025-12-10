import { createSlice } from "@reduxjs/toolkit";
import { addNewMovie, getAllMovies } from "../../api/movie.api";
import type { InitialStateType, Movie } from "../../util/type.util";

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
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default movieSlice.reducer;
