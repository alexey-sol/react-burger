import { AppLink } from '@/components/app-link/app-link';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useLoginMutation } from '@/services/auth-api/api';
import { useForm } from '@/utils/hooks/use-form';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

import type { LoginRequest } from '@/services/auth-api/types';

import styles from './login-page.module.css';

const INITIAL_VALUES: LoginRequest = {
  email: '',
  password: '',
};

export const LoginPage = (): React.JSX.Element => {
  const [login, { isLoading }] = useLoginMutation();
  const { values, handleChange } = useForm(INITIAL_VALUES);
  const passwordToggle = useToggle(true);

  return (
    <PageLayout>
      <div className={styles.form_wrapper}>
        <h2 className="text text_type_main-medium">Вход</h2>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();

            if (!Object.values(values).every(Boolean)) {
              console.error('Не все поля заполнены');

              return;
            }

            login(values).unwrap().catch(console.error);
            // TODO redirect on then
          }}
        >
          <Input
            placeholder="E-mail"
            value={values.email ?? ''}
            name="email"
            onChange={handleChange}
          />
          <Input
            placeholder="Пароль"
            icon="ShowIcon"
            type={passwordToggle.isOn ? 'password' : 'text'}
            onIconClick={passwordToggle.toggle}
            value={values.password ?? ''}
            name="password"
            onChange={handleChange}
          />
          <div>
            <Button htmlType="submit" disabled={isLoading}>
              Войти
            </Button>
          </div>
        </form>
      </div>

      <div className={styles.footer}>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вы - новый пользователь? <AppLink to="/register">Зарегистироваться</AppLink>
        </p>

        <p className="mt-6 text text_type_main-default text_color_inactive">
          Забыли пароль? <AppLink to="/forgot-password">Восстановить пароль</AppLink>
        </p>
      </div>
    </PageLayout>
  );
};
