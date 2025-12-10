import { configureStore } from "@reduxjs/toolkit";
import { newsStore } from "../slice/news.slice";

export const store = configureStore({
  reducer: {news:newsStore},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
