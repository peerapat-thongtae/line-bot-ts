import axios from 'axios';

const TMDB_API_URL = process.env.TMDB_API_URL;
export const discoverMovie = async () => {
  try {
    const movies = await axios.get(`${TMDB_API_URL}/3/movie/discover`);
    return movies.data;

  } catch(e) {
    return e;
  }
}