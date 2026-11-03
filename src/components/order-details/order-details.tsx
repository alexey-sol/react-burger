import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import styles from './order-details.module.css';

const ORDER_MOCK = {
  orderNumber: 123456,
};

export const OrderDetails: React.FC = () => {
  return (
    <section className={clsx(styles.order_details, 'p-10')}>
      <p className="text text_type_digits-large">{ORDER_MOCK.orderNumber}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <section className={styles.order_status}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </section>
    </section>
  );
};
