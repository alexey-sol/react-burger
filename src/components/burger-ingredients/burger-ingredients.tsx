import { useToggle } from '@/utils/hooks/use-toggle';
import { Counter, CurrencyIcon, Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { TYPE_LABELS, INGREDIENT_TYPES } from './const';

import type { Ingredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

const handleScroll = (id: string): void => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = id;
  }
};

type BurgerIngredientsProps = {
  ingredients: Ingredient[];
};

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
  ingredients,
}: BurgerIngredientsProps) => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();

  const groupedIngredients = ingredients.reduce(
    (acc, ingredient) => {
      const { type } = ingredient;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(ingredient);

      return acc;
    },
    {} as Record<Ingredient['type'], Ingredient[]>
  );

  const { isOn, on, off } = useToggle();

  const [current, setCurrent] = useState('bun');

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <Tab
              key={type}
              value={type}
              active={current === type}
              onClick={() => {
                setCurrent(type);
                handleScroll(type);
              }}
            >
              {label}
            </Tab>
          ))}
        </ul>
      </nav>

      <section className={clsx(styles.ingredients_container, 'custom-scroll', 'p-2')}>
        {INGREDIENT_TYPES.map((type) => {
          const sectionItems = groupedIngredients[type] || [];

          if (sectionItems.length === 0) {
            return null;
          }

          return (
            <section id={type} key={type} className={styles.ingredients_section}>
              <h2 className="text text_type_main-medium">{TYPE_LABELS[type]}</h2>
              <div className={styles.ingredients_grid}>
                {sectionItems.map((item) => (
                  <div
                    onClick={() => {
                      setSelectedIngredient(item);
                      on();
                    }}
                    key={item._id}
                    className={clsx(styles.ingredient_card, 'p-2')}
                  >
                    <img src={item.image} alt={item.name} loading="lazy" />

                    <div className={styles.ingredient_price}>
                      <p className="text text_type_main-default">{item.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>

                    <p className="text text_type_main-default">{item.name}</p>

                    <Counter count={1} size="default" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      {isOn && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={off}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
