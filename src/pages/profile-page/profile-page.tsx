import { useAppSelector } from '@/app/store/hooks';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useLogoutMutation, useUpdateUserMutation } from '@/services/auth-api/api';
import { selectUser } from '@/services/user/selectors';
import { setUser } from '@/services/user/slice';
import { useToggle } from '@/utils/hooks/use-toggle';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import type { UpdateUserRequest } from '@/services/auth-api/types';

import styles from './profile-page.module.css';

const INITIAL_FIELDS: UpdateUserRequest = {
  email: '',
  name: '',
  password: '',
};

export const ProfileSettingsPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [fields, setFields] = useState<UpdateUserRequest>(INITIAL_FIELDS);

  useEffect(() => {
    if (user) {
      setFields((prev) => ({
        ...prev,
        email: user.email,
        name: user.name,
      }));
    }
  }, []);

  const actionsToggle = useToggle();
  const passwordToggle = useToggle(true);

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();

          updateUser(fields)
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
          value={fields.name ?? ''}
          onChange={(event) => {
            setFields((prev) => ({ ...prev, name: event.target.value.trim() }));
            actionsToggle.on();
          }}
        />
        <Input
          placeholder="E-mail"
          value={fields.email ?? ''}
          onChange={(event) => {
            setFields((prev) => ({ ...prev, email: event.target.value.trim() }));
            actionsToggle.on();
          }}
        />
        <Input
          icon="ShowIcon"
          placeholder="Пароль"
          value={fields.password ?? ''}
          type={passwordToggle.isOn ? 'password' : 'text'}
          onIconClick={passwordToggle.toggle}
          onChange={(event) => {
            setFields((prev) => ({ ...prev, password: event.target.value.trim() }));
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
                setFields({ ...INITIAL_FIELDS, ...user });
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
