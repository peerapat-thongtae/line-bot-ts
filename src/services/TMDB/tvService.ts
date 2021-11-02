import axios from 'axios';

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
export const discoverTV = async () => {
    const tvs = await axios.get(`${TMDB_API_URL}/3/discover/tv` , {
      headers: {
        Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
      }
    });
    return tvs.data;
}

export const searchTV = async (query:string) => {
  const tv = await axios.get(`${TMDB_API_URL}/3/search/tv?query=${query}` , {
    headers: {
      Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
    }
  });

  return tv.data;
}

export const trendingTVDay = async () => {
  const tvs = await axios.get(`${TMDB_API_URL}/3/trending/tv/day`,{
    headers : {
      Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
    }
  });

  return tvs.data;
}

export const myTVOnAir = async () => {
  try {
    const tvs = await axios.get(`https://nest-media-list.herokuapp.com/todo/tvonair/1`,{
    
    });
    console.log(tvs.data);
    return tvs.data;
  } catch (err) {
    console.log(err);
  }
}