import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from './config.js'
import { TTokens } from '../types/auth'

// axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL, 
});

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 모든 요청에 accessToken 추가
api.interceptors.request.use(
  (config: RequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    // accessToken이 필요 없는 엔드포인트 리스트
    const publicEndpoints = [
      API_ENDPOINTS.LOGIN,       
      API_ENDPOINTS.REGISTER,      
    ];
    
    // 요청 URL이 publicEndpoints에 포함되지 않는 경우에만 Authorization 헤더 추가
    if (accessToken && !publicEndpoints.includes(config.url as string)) {
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
    const originalRequest = error.config as RequestConfig;

    if (error.response?.status === 401 
      && !originalRequest._retry 
      && originalRequest.url !== API_ENDPOINTS.REFRESH_TOKEN) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post<TTokens>(API_ENDPOINTS.REFRESH_TOKEN, {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // 원래 요청에 갱신된 accessToken 설정
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        // 갱신 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace('/login'); 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


interface ApiCallOptions {
  endpoint: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  data?: any;
  headers?: Record<string, string>;
}

export async function apiCall<T>({
  endpoint,
  method = 'get',
  data = null,
  headers = {},
}: ApiCallOptions): Promise<T> {
  try {
    const response = await api<T>({
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
    throw error;
  }
}


// Movie API 전용 인스턴스 (토큰 갱신 인터셉터 없음)
export const movieApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_MOVIE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
});