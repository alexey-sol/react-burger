import { BASE_URL } from '@/utils/const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  endpoints: () => ({}),
  reducerPath: 'appApi',
});
