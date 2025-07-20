import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./RTKApi";
import cartReducer from "./slices/cart/cartSlice";

const rootReducer = combineReducers({
  // Add your reducers here
  cart: cartReducer,
  [api.reducerPath]: api.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const middlewares = [api.middleware];
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares);
    },
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
