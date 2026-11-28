import { AppLink } from '@/components/app-link/app-link';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useResetPasswordMutation } from '@/services/password-reset-api/api';
import { useForm } from '@/utils/hooks/use-form';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import type { ResetPasswordRequest } from '@/services/password-reset-api/types';

import styles from './reset-password-page.module.css';

const INITIAL_VALUES: ResetPasswordRequest = {
  token: '',
  password: '',
};

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { values, handleChange } = useForm(INITIAL_VALUES);

  const passwordToggle = useToggle(true);

  return (
    <PageLayout>
      <div className={styles.form_wrapper}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();

            if (!Object.values(values).every(Boolean)) {
              console.error('Не все поля заполнены');

              return;
            }

            resetPassword(values)
              .unwrap()
              .then(() => navigate('/login'))
              .catch(console.error);
          }}
        >
          <Input
            icon="ShowIcon"
            placeholder="Введите новый пароль"
            onIconClick={passwordToggle.toggle}
            type={passwordToggle.isOn ? 'password' : 'text'}
            value={values.password ?? ''}
            onChange={handleChange}
            name="password"
          />
          <Input
            placeholder="Введите код из письма"
            value={values.token ?? ''}
            onChange={handleChange}
            name="token"
          />
          <div>
            <Button htmlType="submit" disabled={isLoading}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>

      <p className="mt-20 text text_type_main-default text_color_inactive">
        Вспомнили пароль? <AppLink to="/login">Войти</AppLink>
      </p>
    </PageLayout>
  );
};
