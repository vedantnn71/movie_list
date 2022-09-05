import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { authApi, movieApi, userApi } from './services';

const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware, authApi.middleware, userApi.middleware),
})

setupListeners(store.dispatch)

export default store;