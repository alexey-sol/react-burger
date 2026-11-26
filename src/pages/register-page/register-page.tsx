import { AppLink } from '@/components/app-link/app-link';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useRegisterMutation } from '@/services/auth-api/api';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import type { RegisterRequest } from '@/services/auth-api/types';

import styles from './register-page.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const [register, { isLoading }] = useRegisterMutation();

  const [fields, setFields] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
  });

  const passwordToggle = useToggle(true);

  return (
    <PageLayout>
      <div className={styles.form_wrapper}>
        <h2 className="text text_type_main-medium">Регистрация</h2>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();

            if (!Object.values(fields).every(Boolean)) {
              console.error('Не все поля заполнены');

              return;
            }

            register(fields).unwrap().catch(console.error);
            // TODO redirect on then
          }}
        >
          <Input
            placeholder="Имя"
            value={fields.name ?? ''}
            onChange={(event) =>
              setFields((prev) => ({ ...prev, name: event.target.value.trim() }))
            }
          />
          <Input
            placeholder="E-mail"
            value={fields.email ?? ''}
            onChange={(event) =>
              setFields((prev) => ({ ...prev, email: event.target.value.trim() }))
            }
          />
          <Input
            placeholder="Пароль"
            icon="ShowIcon"
            value={fields.password ?? ''}
            onIconClick={passwordToggle.toggle}
            type={passwordToggle.isOn ? 'password' : 'text'}
            onChange={(event) =>
              setFields((prev) => ({ ...prev, password: event.target.value.trim() }))
            }
          />
          <div>
            <Button disabled={isLoading} htmlType="submit">
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>

      <p className="mt-20 text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <AppLink to="/login">Войти</AppLink>
      </p>
    </PageLayout>
  );
};
