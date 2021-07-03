import axios from 'axios';

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
export const discoverMovie = async () => {
    const movies = await axios.get(`${TMDB_API_URL}/3/discover/movie` , {
      headers: {
        Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
      }
    });
    return movies.data;
}