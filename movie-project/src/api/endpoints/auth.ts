import { apiCall } from '../apiClient'
import { API_ENDPOINTS } from '../config'
import { TRegisterData, TRegisterResponse, TTokens, TLoginData } from '../../types/auth'

export const registerUser = async (userData: TRegisterData): Promise<TRegisterResponse> => {
  try {
    const response = await apiCall<TRegisterResponse>({
      endpoint: API_ENDPOINTS.REGISTER,
      method: 'post',
      data: userData,
    });

    console.log('유저 등록됨:', response);
    return response;
  } catch (error) {
    console.error('유저 등록 오류:', error);
    alert(error);
    throw error;
  }
};

export const userlogin = async (userData: TLoginData): Promise<TTokens> => {
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
    throw error;
  }
};
