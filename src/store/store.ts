import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { colorsApi, industriesApi, manufacturersApi, materialsApi, tagsApi } from "./apis";
import userReducer from "./slices/userSlice";
import favsReducer from "./slices/favoritesSlice";
import collectionsReducer from "./slices/collectionsSlice";

const store = configureStore({
  reducer: {
    [colorsApi.reducerPath]: colorsApi.reducer,
    [industriesApi.reducerPath]: industriesApi.reducer,
    [manufacturersApi.reducerPath]: manufacturersApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    userState: userReducer,
    favItems: favsReducer,
    collections: collectionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(colorsApi.middleware)
      .concat(industriesApi.middleware)
      .concat(manufacturersApi.middleware)
      .concat(materialsApi.middleware)
      .concat(tagsApi.middleware)
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
