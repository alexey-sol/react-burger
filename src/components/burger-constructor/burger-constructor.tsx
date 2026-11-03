import { useToggle } from '@/utils/hooks/use-toggle';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { Ingredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type BurgerConstructorProps = {
  ingredients: Ingredient[];
};

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
  ingredients,
}: BurgerConstructorProps) => {
  console.log(ingredients);

  const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
  const otherIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');

  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientPrice = ingredients.reduce(
    (total, ingredient) => total + ingredient.price,
    0
  );
  const totalPrice = bunPrice + ingredientPrice;

  const { isOn, on, off } = useToggle();

  return (
    <section className={styles.burger_constructor}>
      <ul className={clsx(styles.ingredient_list_container, styles.ingredient_list)}>
        {!!bun && (
          <li className={styles.ingredient_item}>
            <div className={styles.icon_stub} />
            <ConstructorElement
              // eslint-disable-next-line @typescript-eslint/no-empty-function -- TODO Implement
              handleClose={function fee() {}}
              isLocked
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              type="top"
            />
          </li>
        )}

        {!!otherIngredients.length && (
          <ul className={clsx(styles.ingredient_list, 'custom-scroll')}>
            {otherIngredients.map((ingredient) => (
              <li className={styles.ingredient_item} key={ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  // eslint-disable-next-line @typescript-eslint/no-empty-function -- TODO Implement
                  handleClose={function fee() {}}
                  price={ingredient.price}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                />
              </li>
            ))}
          </ul>
        )}

        {!!bun && (
          <li className={styles.ingredient_item}>
            <div className={styles.icon_stub} />
            <ConstructorElement
              // eslint-disable-next-line @typescript-eslint/no-empty-function -- TODO Implement
              handleClose={function fee() {}}
              isLocked
              price={bun.price}
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              type="bottom"
            />
          </li>
        )}
      </ul>

      <section className={styles.order_summary}>
        <div className={styles.summary_price}>
          <p className="text text_type_main-medium">{totalPrice.toLocaleString()}</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" onClick={on} size="medium" type="primary">
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
