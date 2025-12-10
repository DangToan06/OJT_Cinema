import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../slice/genres.slice";

export const store = configureStore({
  reducer: {
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
