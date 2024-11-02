const { VITE_SERVER_URL } = import.meta.env;

if (!VITE_SERVER_URL) {
  console.log(
    'server url이 존재하지 않습니다. 기본 url(localhost:3000)을 사용합니다.',
  );
}

export const API_BASE_URL = VITE_SERVER_URL || 'http://localhost:3000';
export const TMDB_MOVIE_URL = import.meta.env.VITE_TMDB_MOVIE_URL;

const apiUrl = (path) => {
  const baseUrl = API_BASE_URL.endsWith('/')
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
};

export const API_ENDPOINTS = {
  REGISTER: apiUrl('auth/register'),
  LOGIN: apiUrl('auth/login'),
  REFRESH_TOKEN: apiUrl('auth/token/access'),
  USER: apiUrl('user/me'),
};
