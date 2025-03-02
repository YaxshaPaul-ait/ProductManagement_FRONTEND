import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import productReducer from './productslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // Now products have a separate slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
