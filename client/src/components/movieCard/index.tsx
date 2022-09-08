import { Movie } from '@/store/services/types';
import Button from '../button';
import styles from './movieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    // <div className="wrap">
    //   <img src={movie.thumbnail} className={styles.background} />

    <div
      className={styles.container}
      style={{
        background: `linear-gradient(rgba(17, 17, 17, 0) 65.36%, rgb(17 17 25 / 55%) 100%), url(${movie.thumbnail}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={() => window.open(movie.trailer, '_blank')}
    >

      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.year}>{new Date(movie.releasedAt).getFullYear()}</div>
        </div>

        <div className={styles.cta}>
          <Button
            background='var(--white-color-50)'
            color='var(--white-color)'
            borderRadius='rounded'
          >
            Watch Now
          </Button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default MovieCard;