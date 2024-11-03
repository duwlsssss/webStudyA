import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from './config.js';
import { handleAPIError } from './errorHandling.js';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL, 
});

let isRefreshing = false;

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
    console.log("갱신 응답 데이터:", response);
    if (!response || !response.accessToken || !response.refreshToken) {
      throw new Error("유효하지 않은 토큰 갱신 응답");
    }
 
    console.log(response)
    const { accessToken: newAccessToken, refreshToken } = response;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    throw error;
  }
};

// 요청을 인터셉트해서 요청마다 accessToken을 추가
api.interceptors.request.use((config) => {

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
});

// 응답을 인터셉트해서 401 오류가 발생할 경우 토큰을 갱신하고 재시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // 갱신된 originalRequest로 재시도
        return api(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 중 오류 발생:', refreshError);
        // 갱신 실패 시 강제로 로그아웃
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        alert('다시 로그인해주세요')
        return Promise.reject(refreshError);
      }
    }

    // 401 오류가 아닌 다른 오류 or 이미 재시도를 수행한 요청이면 기존 오류를 그대로 반환
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