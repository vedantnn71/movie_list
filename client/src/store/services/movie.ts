import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddMovie, type Movie } from "./types";

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_API!}`,
    prepareHeaders(headers, api) {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => `/movies`,
    }),
    getMovie: builder.query<Movie, number>({
      query: (id) => `/movies/${id}`,
    }),
    addMovie: builder.mutation<Movie, FormData>({
      query: (movie) => ({
        url: `/movies/add`,
        method: 'POST',
        body: movie,
      }),
    }),
  }),
})

export const { useGetMoviesQuery, useAddMovieMutation, useGetMovieQuery } = movieApi; 
