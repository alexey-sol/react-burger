import { authApi } from '@/services/auth-api/api';
import { burgerConstructorSlice } from '@/services/burger-constructor/slice';
import { ingredientsSlice } from '@/services/ingredients/slice';
import { userSlice } from '@/services/user/slice';
import { combineReducers } from '@reduxjs/toolkit';

import { appApi } from './api';

export const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
});
