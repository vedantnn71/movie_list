import axios from 'axios';

const getMovies = async () => {
  const { data } = await axios.get('/movies');
  return data;
}

export default getMovies;