import { apiCall } from '../apiClient'
import { API_ENDPOINTS } from '../config'
import { TRegisterData, TTokens, TLoginData } from '../../types/auth'

export const registerUser = async (userData: TRegisterData): Promise<TTokens | null> => {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.REGISTER,
      method: 'post',
      data: userData,
    });

    console.log('유저 등록됨:', response);
    return response;
  } catch (error) {
    console.error('유저 등록 오류:', error);
    alert(error);
    return error;
  }
};

export const userlogin = async (userData: TLoginData): Promise<TTokens | null> => {
  try {
    const response = await apiCall<TTokens>({
      endpoint: API_ENDPOINTS.LOGIN,
      method: 'post',
      data: userData,
    });

    console.log('로그인됨:', response);
    return response;
  } catch (error) {
    console.error('로그인 오류:', error);
  }
};
