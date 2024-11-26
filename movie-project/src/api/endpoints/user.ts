import { apiCall } from '../apiClient'
import { API_ENDPOINTS } from '../config'
import { TUserData } from '../../types/user'

export const fetchUser = async(): Promise<TUserData | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return null;

    const response = await apiCall<TUserData>({
      endpoint: API_ENDPOINTS.USER,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('유저 fetch됨:', response);
    return response;
  } catch (error) {
    console.error('유저 fetch 오류:', error);
    return null;
  }
}
