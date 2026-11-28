import type { IngredientsState } from './slice';
import type { RootState } from '@/app/store';

export const selectIngredient = (
  state: RootState
): IngredientsState['selectedIngredient'] => state.ingredients.selectedIngredient;
