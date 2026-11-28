import { AppLink } from '@/components/app-link/app-link';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useRegisterMutation } from '@/services/auth-api/api';
import { useForm } from '@/utils/hooks/use-form';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

import type { RegisterRequest } from '@/services/auth-api/types';

import styles from './register-page.module.css';

const INITIAL_VALUES: RegisterRequest = {
  email: '',
  name: '',
  password: '',
};

export const RegisterPage = (): React.JSX.Element => {
  const [register, { isLoading }] = useRegisterMutation();
  const { values, handleChange } = useForm(INITIAL_VALUES);
  const passwordToggle = useToggle(true);

  return (
    <PageLayout>
      <div className={styles.form_wrapper}>
        <h2 className="text text_type_main-medium">Регистрация</h2>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();

            if (!Object.values(values).every(Boolean)) {
              console.error('Не все поля заполнены');

              return;
            }

            register(values).unwrap().catch(console.error);
            // TODO redirect on then
          }}
        >
          <Input
            placeholder="Имя"
            value={values.name ?? ''}
            name="name"
            onChange={handleChange}
          />
          <Input
            placeholder="E-mail"
            value={values.email ?? ''}
            name="email"
            onChange={handleChange}
          />
          <Input
            placeholder="Пароль"
            icon="ShowIcon"
            value={values.password ?? ''}
            onIconClick={passwordToggle.toggle}
            type={passwordToggle.isOn ? 'password' : 'text'}
            name="password"
            onChange={handleChange}
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
