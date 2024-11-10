import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from './config.js';
import { handleAPIError } from './errorHandling.js';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL, 
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
     // accessToken이 필요 없는 엔드포인트 리스트
    const publicEndpoints = [
      API_ENDPOINTS.LOGIN,       
      API_ENDPOINTS.SIGNUP, 
      API_ENDPOINTS.REFRESH_TOKEN,     
    ];
    
    // 요청 URL이 publicEndpoints에 포함되지 않는 경우에만 Authorization 헤더 추가
    if (accessToken && !publicEndpoints.includes(config.url)) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답을 인터셉트해서 401 오류가 발생할 경우 토큰을 갱신하고 재시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("갱신 요청 시작 - refreshToken:", refreshToken);

        const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });

        console.log(response.data)
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // 원래 요청에 갱신된 accessToken 설정
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (error) {
        console.error('토큰 오류:', error);
      }
    }

    return Promise.reject(error);
  }
);


export async function apiCall({
  endpoint,
  method = 'get',
  data = null,
  headers = {},
}) {
  try {
    const response = await api({
      baseURL: API_BASE_URL,
      url: endpoint,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers, 
      },
    });

    return response.data;
  } catch (error) {
    const apiError = handleAPIError(error);
    throw apiError;
  }
}


// Movie API 전용 인스턴스 (토큰 갱신 인터셉터 없음)
export const movieApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_MOVIE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
});