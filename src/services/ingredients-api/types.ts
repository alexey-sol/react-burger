import type { Ingredient } from '@/utils/types';

export type IngredientsResponse = {
  data: Ingredient[];
  success: boolean;
};
