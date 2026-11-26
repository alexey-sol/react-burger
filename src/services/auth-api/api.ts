import { BASE_URL } from '@/utils/const';
import { ApiError, request } from '@/utils/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import type {
  LoginRequest,
  AuthResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RequestExtraOptions,
  GetUserResponse,
  UpdateUserResponse,
  UpdateUserRequest,
} from './types';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';

const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const refreshData = await request<RefreshTokenResponse>(`${BASE_URL}/api/auth/token`, {
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  Cookies.set('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
};

const baseQueryWithRefresh = async (
  args: RequestExtraOptions,
  _api: BaseQueryApi,
  _extraOptions: unknown
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  try {
    const { body, url, method = 'GET', ...rest } = args;
    const token = Cookies.get('accessToken');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.authorization = token;
    }

    const options: RequestInit & { body?: string } = {
      method,
      ...rest,
      body: JSON.stringify(body),
      headers: {
        ...headers,
        ...rest.headers!,
      },
    };

    const data = await fetchWithRefresh(`${BASE_URL}/api${url}`, options);
    return { data };
  } catch (error) {
    return error as never;
  }
};

const fetchWithRefresh = async (
  endpoint: string,
  options: RequestInit & { body?: string }
): Promise<unknown> => {
  try {
    return await request(endpoint, options);
  } catch (error) {
    if (error instanceof ApiError && error.status === 403) {
      const refreshData = await refreshToken();

      return request(endpoint, {
        ...options,
        headers: {
          ...(options.headers as Record<string, string>),
          Authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (request) => ({
        url: `/auth/register`,
        body: request,
        method: 'POST',
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.accessToken) {
          Cookies.set('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
      },
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (request) => ({
        url: `/auth/login`,
        body: request,
        method: 'POST',
      }),
      transformResponse: (response: AuthResponse) => {
        Cookies.set('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        return response;
      },
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: `/auth/logout`,
        body: {
          token: localStorage.getItem('refreshToken'),
        },
        method: 'POST',
      }),
      transformResponse: () => {
        Cookies.remove('accessToken');
        localStorage.removeItem('refreshToken');

        return null;
      },
    }),
    getUser: builder.query<GetUserResponse, void>({
      query: (request) => ({
        url: `/auth/user`,
        body: request,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (request) => ({
        url: `/auth/user`,
        body: request,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} = authApi;
