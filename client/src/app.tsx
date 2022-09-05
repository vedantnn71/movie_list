import { Add, Home, Login, Signup } from '@/pages';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';

const App = () => {
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