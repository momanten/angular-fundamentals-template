export interface User {
  name: string;
  email: string;
  password: string;
}

export type LoginUser = Omit<User, "name">;

export interface LoginResponse {
  result: string; // Bearer token
  user: Pick<User, "name" | "email">;
}

export interface LogoutResponse {
  result: string; // Bearer token
  user: Pick<User, "name" | "email">;
}

export interface ResgistrationResponse {
  successful: boolean;
  errors: string[];
}

export interface APIResult {
  result: boolean;
  error?: string;
}
