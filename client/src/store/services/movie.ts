import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Movie } from "./types";

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_API!}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => `/movies`,
    }),
    getMovie: builder.query<Movie, number>({
      query: (id) => `/movies/${id}`,
    }),
    addMovie: builder.mutation<Movie, Movie>({
      query: (movie) => ({
        url: `/movies`,
        method: 'POST',
        body: movie,
      }),
    }),
  }),
})

export const { useGetMoviesQuery, useAddMovieMutation, useGetMovieQuery } = movieApi; 
