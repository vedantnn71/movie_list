import { getGenres } from '@/lib';
import { useGetMoviesQuery } from '@/store/services';
import { useEffect, useState } from 'react';
import styles from './genres.module.css';

const Genres = () => {
  const { data: movies, isLoading } = useGetMoviesQuery();
  const [genres, setGenres] = useState<string[] | null>(null);
  const [activeGenre, setActiveGenre] = useState<number | null>(0);

  useEffect(() => {
    if (!isLoading) {
      const genres = getGenres({ movies });
      setGenres(genres);
    }
  }, [movies])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Genre</h1>
      <ul className={styles.genreList}>
        {genres?.map((genre, index) => (
          <li
            key={genre}
            className={styles.genre}
            data-active={activeGenre === index}
            onClick={() => setActiveGenre(index)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;