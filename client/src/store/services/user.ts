import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type User } from "./types";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_API!}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => `/user`,
    }),
  }),
})

export const { useGetUserQuery: useUser } = userApi;