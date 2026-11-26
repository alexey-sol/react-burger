import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { useGetIngredientsQuery } from '@/services/ingredients-api/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import type { Ingredient } from '@/utils/types';

const DEFAULT_INGREDIENTS: Ingredient[] = [];

export const IngredientDetailsModal = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetIngredientsQuery();
  const ingredients = data?.data ?? DEFAULT_INGREDIENTS;
  const ingredient = id ? ingredients.find((i) => id === i._id) : undefined;

  const onClose = (): void => {
    void navigate(-1);
  };

  if (!ingredient && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      {isLoading ? <Preloader /> : <IngredientDetails ingredient={ingredient!} />}
    </Modal>
  );
};
