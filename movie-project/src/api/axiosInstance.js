import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_TMDB_MOVIE_URL,
});