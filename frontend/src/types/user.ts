export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
}

export interface LocalLoginResponse {
  user: User;
  accessToken: string;
}

export interface LocalRegisterDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface LocalLoginDTO {
  email: string;
  password: string;
}
