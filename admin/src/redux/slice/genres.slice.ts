import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../../api/genres.api";

export interface Genre {
  id: string;
  genreName: string;
}

interface GenresState {
  list: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  list: [],
  loading: false,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGenres.fulfilled,
        (state, action: PayloadAction<Genre[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD

      .addCase(createGenre.fulfilled, (state, action: PayloadAction<Genre>) => {
        state.list.unshift(action.payload);
      })

      // UPDATE

      .addCase(updateGenre.fulfilled, (state, action: PayloadAction<Genre>) => {
        const index = state.list.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(
        deleteGenre.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter((g) => g.id !== action.payload);
        }
      );
  },
});

export default genresSlice.reducer;
