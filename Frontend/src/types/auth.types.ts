export interface RegisterResponse {
  message: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: string; 
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
