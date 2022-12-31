import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import categoriesReducer from '../features/categories/categorySlice';
import { carApiSlice } from "../features/categories/categorySlice"

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [carApiSlice.reducerPath]: carApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, carApiSlice.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
