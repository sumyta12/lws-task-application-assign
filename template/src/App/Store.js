import { configureStore } from "@reduxjs/toolkit";
import Api from "../Feature/Api/Api";
import FilterTask from "../Feature/Filter/FilterTask";

const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    filter : FilterTask
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
