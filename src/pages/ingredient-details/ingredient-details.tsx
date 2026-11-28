import { IngredientDetails as IngredientDetailsComponent } from '@/components/ingredient-details/ingredient-details';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useGetIngredientsQuery } from '@/services/ingredients-api/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import type { Ingredient } from '@/utils/types';

const DEFAULT_INGREDIENTS: Ingredient[] = [];

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams();
  const { data, isLoading } = useGetIngredientsQuery();
  const ingredients = data?.data ?? DEFAULT_INGREDIENTS;
  const ingredient = id ? ingredients.find((i) => id === i._id) : undefined;

  return (
    <PageLayout>
      {isLoading && <Preloader />}
      {!isLoading && ingredient && (
        <IngredientDetailsComponent ingredient={ingredient} />
      )}
    </PageLayout>
  );
};
