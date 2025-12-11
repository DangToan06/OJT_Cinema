import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../slice/genres.slice";
import priceReducer from "../slice/price.slice";
import showtimesReducer from "../slice/showtimes.slice"; 

export const store = configureStore({
  reducer: {
    genres: genresReducer,
    price: priceReducer,
    showtimes: showtimesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
