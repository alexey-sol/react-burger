import { useAppDispatch } from '@/app/store/hooks';
import {
  deleteIngredientById,
  insertIngredient,
  moveIngredient,
  updateBun,
  type ConstructorIngredient,
} from '@/services/burger-constructor/slice';
import {
  CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
  INGREDIENT_BUN_DRAG_TYPE,
  INGREDIENT_DRAG_TYPE,
} from '@/utils/const';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { Ingredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type ConstructorIngredientDragItem = {
  sourceIndex: number;
};

type IngredientItemStubProps = {
  extraClass?: string;
  text: string;
  position?: 'top' | 'bottom' | 'center';
};

export const IngredientItemStub: React.FC<IngredientItemStubProps> = ({
  extraClass,
  text,
  position = 'center',
}) => {
  return (
    <div
      className={clsx(
        'constructor-element',
        {
          'constructor-element_pos_top': position === 'top',
          'constructor-element_pos_bottom': position === 'bottom',
        },
        styles.bun_stub,
        extraClass
      )}
    >
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};

type IngredientDropTargetProps = {
  className: string;
  position: 'top' | 'bottom' | 'middle';
  index?: number;
  renderChildren: (isDropActive: boolean) => React.ReactNode;
};

export const IngredientDropTarget: React.FC<IngredientDropTargetProps> = ({
  className,
  position,
  index = 0,
  renderChildren,
}) => {
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLLIElement>(null);
  const [{ isDropActive }, dropRef] = useDrop<
    Ingredient | ConstructorIngredientDragItem,
    void,
    { isDropActive: boolean }
  >(
    () => ({
      accept: [
        INGREDIENT_DRAG_TYPE,
        INGREDIENT_BUN_DRAG_TYPE,
        CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
      ],
      canDrop: (ingredient): boolean => {
        if ('sourceIndex' in ingredient) {
          return position === 'middle';
        }

        return position === 'middle'
          ? ingredient.type !== 'bun'
          : ingredient.type === 'bun';
      },
      drop: (ingredient): void => {
        if ('sourceIndex' in ingredient) {
          dispatch(
            moveIngredient({
              fromIndex: ingredient.sourceIndex,
              toIndex: index,
            })
          );
          return;
        }

        if (position !== 'middle') {
          dispatch(updateBun(ingredient));
          return;
        }

        dispatch(insertIngredient({ index: index + 1, ingredient }));
      },
      collect: (monitor): { isDropActive: boolean } => {
        return {
          isDropActive: monitor.isOver() && monitor.canDrop(),
        };
      },
    }),
    [dispatch, index, position]
  );

  return (
    <li
      ref={(element) => {
        targetRef.current = element;
        dropRef(element);
      }}
      className={className}
    >
      {renderChildren(isDropActive)}
    </li>
  );
};

type DraggableConstructorElementProps = {
  extraClass?: string;
  ingredient: ConstructorIngredient;
  index: number;
};

export const DraggableConstructorElement: React.FC<DraggableConstructorElementProps> = ({
  extraClass,
  ingredient,
  index,
}) => {
  const dispatch = useAppDispatch();
  const [, drag] = useDrag<ConstructorIngredientDragItem>(
    () => ({
      type: CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
      item: { sourceIndex: index },
    }),
    [index]
  );

  return (
    <>
      <div
        ref={(element) => {
          drag(element);
        }}
        className={styles.drag_handle}
      >
        <DragIcon type="primary" />

        <ConstructorElement
          extraClass={extraClass}
          handleClose={() => dispatch(deleteIngredientById(ingredient.id))}
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image}
        />
      </div>
    </>
  );
};
