import { Add, Home, Login, Signup } from '@/pages';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSession } from '@/hooks';
import store from '@/store';
import { useEffect } from 'react';

const App = () => {
  const { isLoading, status } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && status === 'unauthenticated') {
      navigate('/signup')
    }
  }, [isLoading, status]);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Provider>
  )
}

export default App;