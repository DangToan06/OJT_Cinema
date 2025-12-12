
import { createSlice } from "@reduxjs/toolkit";
import { createShowtime, deleteShowtime, fetchShowtimes, updateShowtime } from "../../api/showtimes.api";

const showtimesSlice = createSlice({
  name: "showtimes",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
        // them sua xoa
      .addCase(createShowtime.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateShowtime.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteShowtime.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default showtimesSlice.reducer;