import { appApi } from '@/app/store/api';

import type { IngredientsResponse } from './types';

export const INGREDIENTS_TAG = 'Ingredients' as const;

const appApiWithTag = appApi.enhanceEndpoints({
  addTagTypes: [INGREDIENTS_TAG],
});

export const ingredientsApi = appApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientsResponse, void>({
      query: () => ({
        url: `/ingredients`,
      }),
      providesTags: [INGREDIENTS_TAG],
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
