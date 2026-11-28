import { useAppSelector } from '@/app/store/hooks';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useLogoutMutation, useUpdateUserMutation } from '@/services/auth-api/api';
import { selectUser } from '@/services/user/selectors';
import { setUser } from '@/services/user/slice';
import { useForm } from '@/utils/hooks/use-form';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import type { UpdateUserRequest } from '@/services/auth-api/types';

import styles from './profile-page.module.css';

const INITIAL_VALUES: UpdateUserRequest = {
  email: '',
  name: '',
  password: '',
};

export const ProfileSettingsPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { values, handleChange, setValues } = useForm(INITIAL_VALUES);

  useEffect(() => {
    if (user) {
      setValues((prev) => ({
        ...prev,
        email: user.email,
        name: user.name,
      }));
    }
  }, [user, setValues]);

  const actionsToggle = useToggle();
  const passwordToggle = useToggle(true);

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();

          updateUser(values)
            .unwrap()
            .then((response) => {
              dispatch(setUser(response.user));
              actionsToggle.off();
            })
            .catch(console.error);
        }}
      >
        <Input
          placeholder="Имя"
          value={values.name ?? ''}
          name="name"
          onChange={(event) => {
            handleChange(event);
            actionsToggle.on();
          }}
        />
        <Input
          placeholder="E-mail"
          value={values.email ?? ''}
          name="email"
          onChange={(event) => {
            handleChange(event);
            actionsToggle.on();
          }}
        />
        <Input
          icon="ShowIcon"
          placeholder="Пароль"
          name="password"
          value={values.password ?? ''}
          type={passwordToggle.isOn ? 'password' : 'text'}
          onIconClick={passwordToggle.toggle}
          onChange={(event) => {
            handleChange(event);
            actionsToggle.on();
          }}
        />

        {actionsToggle.isOn && (
          <div className={styles.actions}>
            <Button disabled={isLoading} htmlType="submit">
              Сохранить
            </Button>
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={() => {
                setValues({ ...INITIAL_VALUES, ...user });
                actionsToggle.off();
              }}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
      <p
        className={clsx(
          styles.hint,
          'mt-20 text text_type_main-small text_color_inactive'
        )}
      >
        В этом разделе вы можете
        <br />
        изменить свои персональные данные
      </p>
    </div>
  );
};

export const ProfileOrderPage = (): React.JSX.Element => {
  return <div>Страница в разработке</div>;
};

export const ProfilePage = (): React.JSX.Element => {
  const [logout] = useLogoutMutation();

  return (
    <PageLayout>
      <div className={styles.content}>
        <div>
          <ul className={styles.menu}>
            <li>
              <NavLink end className={styles.link} to="/profile">
                {({ isActive }) => (
                  <span
                    className={clsx('text text_type_main-medium', {
                      text_color_inactive: !isActive,
                    })}
                  >
                    Профиль
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/profile/orders">
                {({ isActive }) => (
                  <span
                    className={clsx('text text_type_main-medium', {
                      text_color_inactive: !isActive,
                    })}
                  >
                    История заказов
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                onClick={() => {
                  logout().unwrap().catch(console.error);
                  // TODO redirect
                }}
                to=""
              >
                {({ isActive }) => (
                  <span
                    className={clsx('text text_type_main-medium', {
                      text_color_inactive: !isActive,
                    })}
                  >
                    Выход
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet />
      </div>
    </PageLayout>
  );
};
