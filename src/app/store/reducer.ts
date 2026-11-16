import { burgerConstructorSlice } from '@/slices/burger-constructor/slice';
import { ingredientsSlice } from '@/slices/ingredients/slice';
import { combineReducers } from '@reduxjs/toolkit';

import { appApi } from './api';

export const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
});
