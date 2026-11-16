import { appApi } from '@/app/store/api';

import type { CreateOrderRequest, CreateOrderResponse } from './types';

export const INGREDIENTS_TAG = 'Ingredients' as const;

export const ordersApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (request) => ({
        url: `/orders`,
        body: request,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
