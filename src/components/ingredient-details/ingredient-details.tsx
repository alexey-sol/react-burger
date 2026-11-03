import type { Ingredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type IngredientNutrientProps = {
  label: string;
  value: number;
};

const IngredientNutrient: React.FC<IngredientNutrientProps> = ({ label, value }) => {
  return (
    <>
      <p className="text text_type_main-default text_color_inactive">{label}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </>
  );
};

type IngredientDetailsProps = {
  ingredient: Ingredient;
};

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
  return (
    <section className={styles.ingredient_details}>
      <img src={ingredient.image_large} alt={ingredient.name} loading="lazy" />

      <section className={styles.ingredient_info}>
        <h3 className="text text_type_main-medium">{ingredient.name}</h3>

        <ul className={styles.ingredient_nutrition}>
          <li className={styles.ingredient_nutrient}>
            <IngredientNutrient label="Калории, ккал" value={ingredient.calories} />
          </li>

          <li className={styles.ingredient_nutrient}>
            <IngredientNutrient label="Белки, г" value={ingredient.proteins} />
          </li>

          <li className={styles.ingredient_nutrient}>
            <IngredientNutrient label="Жиры, г" value={ingredient.fat} />
          </li>

          <li className={styles.ingredient_nutrient}>
            <IngredientNutrient label="Углеводы, г" value={ingredient.carbohydrates} />
          </li>
        </ul>
      </section>
    </section>
  );
};
