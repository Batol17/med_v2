import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";

export const store = configureStore({
  reducer: {
    // إضافة reducer الخاص بـ RTK Query
    [authApi.reducerPath]: authApi.reducer,
  },

  // إضافة middleware الخاص بـ RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});