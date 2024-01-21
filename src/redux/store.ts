import { configureStore } from '@reduxjs/toolkit';

import FavoritesSlice from './slices/FavoritesSlice';
import LoginSlice from './slices/LoginSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    FavoritesSlice,
    LoginSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
