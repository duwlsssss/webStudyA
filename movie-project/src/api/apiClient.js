import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from './config.js';
import { handleAPIError } from './errorHandling.js';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL, 
});

// 토큰 갱신 함수
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error("refresh token이 없음");

  try {
    console.log("갱신 요청 시작 - refreshToken:", refreshToken);
    const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // 응답 데이터 유효성 검사
    console.log("갱신 응답 데이터:", response.data);
    console.log(response)
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return accessToken;
  } catch (error) {
    console.log("갱신 요청 시작 - refreshToken:", refreshToken);
    console.log("갱신 응답 데이터:", response.data);
    console.log(response)
    console.error('토큰 갱신 중 오류 발생:', error);
    throw error;
  }
};

// 요청을 인터셉트해서 요청마다 accessToken을 추가
// api.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem('accessToken');
//   // accessToken이 필요 없는 엔드포인트 리스트
//   const publicEndpoints = [
//     API_ENDPOINTS.LOGIN,       
//     API_ENDPOINTS.SIGNUP,      
//     API_ENDPOINTS.REFRESH_TOKEN, 
//   ];
  
//   // 요청 URL이 publicEndpoints에 포함되지 않는 경우에만 Authorization 헤더 추가
//   if (accessToken && !publicEndpoints.includes(config.url)) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// });
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
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

        const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
          refreshToken
        });

        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 오류:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function apiCall({
  endpoint,
  method = 'get',
  params = {},
  data = null,
  headers = {},
}) {
  try {
    const response = await api({
      baseURL: API_BASE_URL,
      url: endpoint,
      method,
      params,
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