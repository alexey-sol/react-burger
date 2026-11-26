import { AppLink } from '@/components/app-link/app-link';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useRestorePasswordByEmailMutation } from '@/services/password-reset-api/api';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { RestorePasswordByEmailRequest } from '@/services/password-reset-api/types';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [restorePasswordByEmail, { isLoading }] = useRestorePasswordByEmailMutation();

  const [fields, setFields] = useState<RestorePasswordByEmailRequest>({
    email: '',
  });

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

            restorePasswordByEmail(fields)
              .unwrap()
              .then(() => navigate('/reset-password'))
              .catch(console.error);
          }}
        >
          <Input
            placeholder="Укажите e-mail"
            value={fields.email ?? ''}
            onChange={(event) =>
              setFields((prev) => ({ ...prev, email: event.target.value.trim() }))
            }
          />
          <div>
            <Button htmlType="submit" disabled={isLoading}>
              Восстановить
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
