import { configureStore } from "@reduxjs/toolkit";
import priceSlice from "../slice/price.slice";

export const store = configureStore({
  reducer: {
    price: priceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
