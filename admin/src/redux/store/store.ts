import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../slice/news.slice";
import movieSlice from "../slice/movie.slice";
import genresReducer from "../slice/genres.slice";
import showtimesReducer from "../slice/showtimes.slice";
import theaterSlice from "../slice/theater.slice";
import screenSlice from "../slice/screen.slice";
import priceSlice from "../slice/price.slice";
import userSlice from "../slice/user.slice";
import bookingSlice from "../slice/booking.slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    genres: genresReducer,
    showtimes: showtimesReducer,
    theater: theaterSlice,
    news: newsSlice,
    screens: screenSlice,
    price: priceSlice,
    user: userSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
