import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

export const selectIngredientCounts = createSelector(
  [(state: RootState): RootState['burgerConstructor'] => state.burgerConstructor],
  ({ bun, ingredients }): Record<string, number> => {
    const counts: Record<string, number> = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    for (const ingredient of ingredients) {
      counts[ingredient._id] = (counts[ingredient._id] ?? 0) + 1;
    }

    return counts;
  }
);

export const selectTotalPrice = createSelector(
  [(state: RootState): RootState['burgerConstructor'] => state.burgerConstructor],
  ({ bun, ingredients: otherIngredients }): number => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientPrice = otherIngredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );

    return bunPrice + ingredientPrice;
  }
);
