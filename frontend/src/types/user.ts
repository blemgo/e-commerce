export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
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
