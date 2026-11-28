import { useAppSelector } from '@/app/store/hooks';
import { selectIngredientCounts } from '@/services/burger-constructor/selectors';
import { useGetIngredientsQuery } from '@/services/ingredients-api/api';
import { INGREDIENT_BUN_DRAG_TYPE, INGREDIENT_DRAG_TYPE } from '@/utils/const';
import { Counter, CurrencyIcon, Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import { INGREDIENT_TYPES, TYPE_LABELS } from './const';

import type { Ingredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

const DEFAULT_INGREDIENTS: Ingredient[] = [];

const handleScroll = (id: string): void => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = id;
  }
};

export const BurgerIngredients: React.FC = () => {
  const { data } = useGetIngredientsQuery();
  const ingredients = data?.data ?? DEFAULT_INGREDIENTS;

  const ingredientCounts = useAppSelector(selectIngredientCounts);
  const location = useLocation();

  const ingredientsContainerRef = useRef<HTMLElement | null>(null);

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

  const [current, setCurrent] = useState<Ingredient['type']>('bun');

  useEffect(() => {
    const container = ingredientsContainerRef.current;

    if (!container) {
      return;
    }

    const updateCurrentTab = (): void => {
      const containerRect = container.getBoundingClientRect();
      const sections = INGREDIENT_TYPES.flatMap((type) => {
        const section = container.querySelector<HTMLElement>(`#${type}`);

        return section ? [{ type, section }] : [];
      });

      let activeType = sections[0]?.type;

      for (const { type, section } of sections) {
        if (section.getBoundingClientRect().top <= containerRect.top + 1) {
          activeType = type;
        }
      }

      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
        activeType = sections.at(-1)?.type ?? activeType;
      }

      if (activeType) {
        setCurrent(activeType);
      }
    };

    updateCurrentTab();
    container.addEventListener('scroll', updateCurrentTab);

    return (): void => {
      container.removeEventListener('scroll', updateCurrentTab);
    };
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <Tab
              key={type}
              value={type}
              active={current === type}
              onClick={(): void => {
                setCurrent(type);
                handleScroll(type);
              }}
            >
              {label}
            </Tab>
          ))}
        </ul>
      </nav>

      <section
        ref={ingredientsContainerRef}
        className={clsx(styles.ingredients_container, 'custom-scroll', 'p-2')}
      >
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
                  <Link
                    className={styles.link}
                    to={`/ingredients/${item._id}`}
                    key={item._id}
                    state={{ backgroundLocation: location }}
                  >
                    <IngredientCard
                      key={item._id}
                      count={ingredientCounts[item._id] ?? 0}
                      ingredient={item}
                    />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </section>
  );
};

type IngredientCardProps = {
  count: number;
  ingredient: Ingredient;
};

const IngredientCard: React.FC<IngredientCardProps> = ({ count, ingredient }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ingredient.type === 'bun' ? INGREDIENT_BUN_DRAG_TYPE : INGREDIENT_DRAG_TYPE,
      item: ingredient,
      collect: (monitor): { isDragging: boolean } => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [ingredient]
  );

  return drag(
    <div
      className={clsx(styles.ingredient_card, 'p-2')}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={ingredient.image} alt={ingredient.name} loading="lazy" />

      <div className={styles.ingredient_price}>
        <p className="text text_type_main-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-default">{ingredient.name}</p>

      {count > 0 && <Counter count={count} size="default" />}
    </div>
  );
};
