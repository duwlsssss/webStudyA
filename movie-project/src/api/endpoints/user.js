import {apiCall} from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export async function fetchUser() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error("access token이 없음");

    const response = await apiCall({
      endpoint: API_ENDPOINTS.USER,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    console.log('유저 fetch됨:', response);
    return response;
  } catch (error) {
    console.error('유저 fetch 오류:', error);
    // 401 Unauthorized 발생 시 토큰 갱신 시도
    if (error.response && error.response.status === 401) {
      try {
        // 새 accessToken 발급
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem('accessToken', newAccessToken); // 새 토큰 저장

        // 새 accessToken으로 fetchUser 재시도
        const retryResponse = await apiCall({
          endpoint: API_ENDPOINTS.USER,
          method: 'get',
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          }
        });

        console.log('유저 fetch됨 (재시도):', retryResponse);
        return retryResponse;
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        
        // 로그아웃 처리 및 로그인 페이지로 리다이렉트
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    } else {
      alert("유저 정보를 불러오는 중 오류가 발생했습니다.");
    }
  }
}