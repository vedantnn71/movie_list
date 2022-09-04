import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './app.module.css';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <h1>Welcome to app!</h1>
      </div>
    </QueryClientProvider>
  )
}

export default App;