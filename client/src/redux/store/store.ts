import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slice/movie.slice";
import priceSlice from "../slice/price.slice";
import showtimeSlice from "../slice/showtimes.slice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    price: priceSlice,
    showTimes: showtimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
