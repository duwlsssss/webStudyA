export interface TRegisterData {
  email: string;
  password: string;
  passwordCheck: string;
}
export interface TRegisterResponse {
  id: number;
  email: string;
  password: string;
}

export interface TLoginData {
  email: string;
  password: string;
}

export interface TTokens {
  accessToken: string;
  refreshToken: string;
}