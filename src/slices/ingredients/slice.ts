import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Ingredient } from '@/utils/types';

export type IngredientsState = {
  selectedIngredient: Ingredient | null;
};

const initialState: IngredientsState = {
  selectedIngredient: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.selectedIngredient = action.payload;
    },
    resetSelectedIngredient: (state) => {
      state.selectedIngredient = initialState.selectedIngredient;
    },
  },
});

export const { setSelectedIngredient, resetSelectedIngredient } =
  ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
