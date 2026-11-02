import type { Ingredient } from '@/utils/types';

export const INGREDIENT_TYPES: Ingredient['type'][] = ['bun', 'main', 'sauce'];

export const TYPE_LABELS: Record<Ingredient['type'], string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};
