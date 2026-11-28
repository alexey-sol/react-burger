import { authApi } from '@/services/auth-api/api';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { GetUserResponse } from '@/services/auth-api/types';

export type UserState = {
  user: GetUserResponse['user'] | null;
  isAuthChecked: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<UserState['isAuthChecked']>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
