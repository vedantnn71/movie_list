import logo from '@/assets/logo.svg';
import styles from './logo.module.css';

const Logo = () => (
  <div className={styles.container}>
    <img className={styles.logo} src={logo} alt='Logo' />
    <h2>MOVIES</h2>
  </div>
);

export default Logo;