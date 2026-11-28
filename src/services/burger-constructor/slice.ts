import { BUN_TYPE } from '@/components/burger-ingredients/const';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { Ingredient } from '@/utils/types';

export type ConstructorIngredient = Ingredient & {
  id: string;
};

export type BurgerConstructorState = {
  bun: Ingredient | null;
  ingredients: ConstructorIngredient[];
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    updateBun: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type !== BUN_TYPE) {
        return;
      }

      state.bun = action.payload;
    },
    insertIngredient: {
      reducer: (
        state,
        action: PayloadAction<{
          index: number;
          ingredient: ConstructorIngredient;
        }>
      ) => {
        const { index, ingredient } = action.payload;

        if (ingredient.type === BUN_TYPE) {
          return;
        }

        const insertionIndex = Math.max(0, Math.min(index, state.ingredients.length));
        state.ingredients.splice(insertionIndex, 0, ingredient);
      },
      prepare: (payload: { index: number; ingredient: Ingredient }) => ({
        payload: {
          ...payload,
          ingredient: {
            ...payload.ingredient,
            id: nanoid(),
          },
        },
      }),
    },
    deleteIngredientById: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex < 0 ||
        toIndex >= state.ingredients.length ||
        fromIndex === toIndex
      ) {
        return;
      }

      const [ingredient] = state.ingredients.splice(fromIndex, 1);

      if (ingredient) {
        state.ingredients.splice(toIndex, 0, ingredient);
      }
    },
    resetConstructor: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    },
  },
});

export const {
  updateBun,
  insertIngredient,
  deleteIngredientById,
  moveIngredient,
  resetConstructor,
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
