import { Movie } from "@/store/services/types"

interface IGetGenres {
  movies: Movie[] | undefined;
}

export const getGenres = ({ movies }: IGetGenres): string[] => {
  if (!movies) return [];
  const genres = movies.map((movie) => movie.genre);

  return [...new Set(genres)];
}