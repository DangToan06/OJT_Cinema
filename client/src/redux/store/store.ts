import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slice/movie.slice";
import priceSlice from "../slice/price.slice";
import showtimeSlice from "../slice/showtimes.slice";
import seatSlice from "../slice/seats.slice";
import screenSlice from "../slice/screens.slice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    price: priceSlice,
    showTimes: showtimeSlice,
    screens: screenSlice,
    seats: seatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
