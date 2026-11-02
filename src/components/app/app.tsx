import { BASE_URL } from '@/utils/const';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { Ingredient } from '@/utils/types';

import styles from './app.module.css';

type IngredientsResponse = {
  data: Ingredient[];
  success: boolean;
};

const DEFAULT_INGREDIENTS: Ingredient[] = [];

export const App = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>(DEFAULT_INGREDIENTS);

  useEffect(() => {
    const fetchIngredients = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await axios.get<IngredientsResponse>(
          `${BASE_URL}/api/ingredients`
        );

        setIngredients(response.data.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchIngredients();
  }, []);

  // TODO
  const selectedIngredients = ingredients.slice(0, 6);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && <Preloader />}
      {!isLoading && (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={selectedIngredients} />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
