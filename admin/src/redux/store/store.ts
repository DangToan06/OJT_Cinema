import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../slice/news.slice";
import movieSlice from "../slice/movie.slice";
import genresReducer from "../slice/genres.slice";
import priceReducer from "../slice/price.slice";
import showtimesReducer from "../slice/showtimes.slice";
import theaterSlice from "../slice/theater.slice";
import screenSlice from "../slice/screen.slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    genres: genresReducer,
    price: priceSlice,
    showtimes: showtimesReducer,
    theater: theaterSlice,
    news: newsSlice,
    screens: screenSlice,
    user: userSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
