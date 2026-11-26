import { useAppSelector } from '@/app/store/hooks';
import { selectTotalPrice } from '@/services/burger-constructor/selectors';
import { useCreateOrderMutation } from '@/services/orders-api/api';
import { selectUser } from '@/services/user/selectors';
import { useToggle } from '@/utils/hooks/use-toggle';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import {
  DraggableConstructorElement,
  IngredientDropTarget,
  IngredientItemStub,
} from './components';

import type { CreateOrderRequest } from '@/services/orders-api/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor: React.FC = () => {
  const { bun, ingredients: otherIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const totalPrice = useAppSelector(selectTotalPrice);
  const user = useAppSelector(selectUser);

  const [createOrder, { isLoading: isLoadingCreateOrder }] = useCreateOrderMutation({
    fixedCacheKey: 'createOrder',
  });

  const { isOn, on, off } = useToggle();

  const mapCreateOrderRequest = (): CreateOrderRequest | null => {
    const binId = bun?._id;

    if (!binId) {
      return null;
    }

    return {
      ingredients: [
        binId,
        ...otherIngredients.map((ingredient) => ingredient._id),
        binId,
      ],
    };
  };

  const submitOrder = async (): Promise<void> => {
    if (!user) {
      throw new Error('Заказ может оформить только авторизрованный пользователь');
    }

    try {
      const request = mapCreateOrderRequest();

      if (!request) {
        throw new Error('Неверный состав ингредиентов');
      }

      await createOrder(request).unwrap();

      on();
    } catch (error) {
      console.error('Не удалось сформировать заказ:', error);
    }
  };

  return (
    <section className={styles.burger_constructor}>
      <ul className={clsx(styles.ingredient_list_container, styles.ingredient_list)}>
        <IngredientDropTarget
          className={styles.ingredient_item}
          position="top"
          renderChildren={(isDropActive) => (
            <>
              <div className={styles.icon_stub} />
              {bun ? (
                <ConstructorElement
                  extraClass={clsx({ [styles.drop_target_highlight]: isDropActive })}
                  isLocked
                  price={bun.price}
                  text={`${bun.name} (верх)`}
                  thumbnail={bun.image}
                  type="top"
                />
              ) : (
                <IngredientItemStub
                  extraClass={clsx({ [styles.drop_target_highlight]: isDropActive })}
                  text="Выберите булки"
                  position="top"
                />
              )}
            </>
          )}
        ></IngredientDropTarget>

        <ul className={clsx(styles.ingredient_list, 'custom-scroll')}>
          {otherIngredients.length ? (
            otherIngredients.map((ingredient, index) => (
              <IngredientDropTarget
                className={styles.ingredient_item}
                index={index}
                key={ingredient.id}
                position="middle"
                renderChildren={(isDropActive) => (
                  <DraggableConstructorElement
                    extraClass={clsx({ [styles.drop_target_highlight]: isDropActive })}
                    ingredient={ingredient}
                    index={index}
                  />
                )}
              />
            ))
          ) : (
            <IngredientDropTarget
              className={styles.ingredient_item}
              index={otherIngredients.length}
              position="middle"
              renderChildren={(isDropActive) => (
                <>
                  <div className={styles.icon_stub} />
                  <IngredientItemStub
                    extraClass={clsx({ [styles.drop_target_highlight]: isDropActive })}
                    text="Выберите начинку"
                  />
                </>
              )}
            />
          )}
        </ul>

        <IngredientDropTarget
          className={styles.ingredient_item}
          position="bottom"
          renderChildren={(isDropActive) => (
            <>
              <div className={styles.icon_stub} />
              {bun ? (
                <ConstructorElement
                  extraClass={clsx({ [styles.drop_target_highlight]: isDropActive })}
                  isLocked
                  price={bun.price}
                  text={`${bun.name} (низ)`}
                  thumbnail={bun.image}
                  type="bottom"
                />
              ) : (
                <IngredientItemStub
                  extraClass={clsx({ [styles.drop_target_highlight]: isDropActive })}
                  text="Выберите булки"
                  position="bottom"
                />
              )}
            </>
          )}
        />
      </ul>

      <section className={styles.order_summary}>
        <div className={styles.summary_price}>
          <p className="text text_type_main-medium">{totalPrice.toLocaleString()}</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          disabled={isLoadingCreateOrder}
          htmlType="button"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={submitOrder}
          size="medium"
          type="primary"
        >
          Оформить заказ
        </Button>
      </section>

      {isOn && (
        <Modal onClose={off}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
