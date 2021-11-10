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

export const searchMovie = async (query:string) => {
  const movie = await axios.get(`${TMDB_API_URL}/3/search/movie?query=${query}` , {
    headers: {
      Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
    }
  });

  return movie.data;
}

export const trendingMovieDay = async () => {
  const movies = await axios.get(`${TMDB_API_URL}/3/trending/movie/day`,{
    headers : {
      Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
    }
  });

  return movies.data;
}

export const cinemaToday = async () => {
  const movies = await axios.get(`${process.env.SCRAPING_URL}/movie/major/movietoday`,{
  });

  return movies.data;
}