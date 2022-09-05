import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Auth } from "./types";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_API!}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Auth, { email: string, password: string }>({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<Auth, { email: string, password: string }>({
      query: (body) => ({
        url: `/auth/signup`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi;