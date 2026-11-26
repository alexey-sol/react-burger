import { AppLink } from '@/components/app-link/app-link';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useResetPasswordMutation } from '@/services/password-reset-api/api';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ResetPasswordRequest } from '@/services/password-reset-api/types';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [fields, setFields] = useState<ResetPasswordRequest>({
    token: '',
    password: '',
  });

  const passwordToggle = useToggle(true);

  return (
    <PageLayout>
      <div className={styles.form_wrapper}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();

            if (!Object.values(fields).every(Boolean)) {
              console.error('Не все поля заполнены');

              return;
            }

            resetPassword(fields)
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
            value={fields.password ?? ''}
            onChange={(event) =>
              setFields((prev) => ({ ...prev, password: event.target.value.trim() }))
            }
          />
          <Input
            placeholder="Введите код из письма"
            value={fields.token ?? ''}
            onChange={(event) =>
              setFields((prev) => ({ ...prev, token: event.target.value.trim() }))
            }
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
