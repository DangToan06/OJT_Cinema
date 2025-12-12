import { configureStore } from "@reduxjs/toolkit";
import { newsStore } from "../slice/news.slice";
import movieSlice from "../slice/movie.slice";
import genresReducer from "../slice/genres.slice";
import showtimesReducer from "../slice/showtimes.slice"; 
import userSlice from "../slice/user.slice";
import priceSlice from "../slice/price.slice";
import bookingSlice from "../slice/booking.slice";

export const store = configureStore({
  reducer: {
    news: newsStore,
    movie: movieSlice,
    genres: genresReducer,
    price: priceSlice,
    showtimes: showtimesReducer,
    user: userSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
