import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../slice/genres.slice";
import priceSlice from "../slice/price.slice";

export const store = configureStore({
  reducer: {
    genres: genresReducer,
    price: priceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
