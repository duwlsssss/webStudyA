interface TRegisterData {
  email: string;
  password: string;
  passwordCheck: string;
}

interface TLoginData {
  email: string;
  password: string;
}

interface TTokens {
  accessToken: string;
  refreshToken: string;
}