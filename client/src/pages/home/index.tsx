import { Genres, Loading, MovieCard, Nav } from "@/components";
import { useGetMoviesQuery } from "@/store/services";
import styles from "./home.module.css";

const Home = () => {
  const { data: movies, isLoading } = useGetMoviesQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!movies) {
    return <div>No Movies Found :/</div>;
  }

  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.movies}>
        <Genres />

        <div className={styles.movieList}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;