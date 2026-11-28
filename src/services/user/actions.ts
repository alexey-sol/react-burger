import { authApi } from '@/services/auth-api/api';
import { isTokenExists } from '@/utils/token';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setIsAuthChecked, setUser } from './slice';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const response = await dispatch(
          authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true })
        );

        if (response.data) {
          dispatch(setUser(response.data.user));
        }
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
