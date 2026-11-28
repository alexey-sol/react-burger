export type RequestExtraOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  url: string;
  [key: string]: unknown;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  success: boolean;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

export type GetUserResponse = {
  success: true;
  user: {
    email: string;
    name: string;
  };
};

export type UpdateUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type UpdateUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};
