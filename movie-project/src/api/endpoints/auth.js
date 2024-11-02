import {apiCall} from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export const registerUser = async (userData) => {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.REGISTER,
      method: 'post',
      data: userData,
    });

    console.log('회원 등록됨:', response);
    return response;
  } catch (error) {
    console.error('유저 등록 오류:', error);
    alert(error);
    return error;
  }
};

export const Userlogin = async (userData) => {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.LOGIN,
      method: 'post',
      data: userData,
    });

    console.log('로그인됨:', response);
    return response;
  } catch (error) {
    console.error('로그인 오류:', error);
    alert(error);
    return error;
  }
};
