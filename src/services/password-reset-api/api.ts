import { appApi } from '@/app/store/api';

import type {
  RestorePasswordByEmailRequest,
  RestorePasswordByEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from './types';

export const passwordReset = appApi.injectEndpoints({
  endpoints: (builder) => ({
    restorePasswordByEmail: builder.mutation<
      RestorePasswordByEmailResponse,
      RestorePasswordByEmailRequest
    >({
      query: (request) => ({
        url: `/password-reset`,
        body: request,
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (request) => ({
        url: `/password-reset/reset`,
        body: request,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRestorePasswordByEmailMutation, useResetPasswordMutation } =
  passwordReset;
