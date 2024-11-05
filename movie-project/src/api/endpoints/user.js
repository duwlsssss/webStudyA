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
  }
}