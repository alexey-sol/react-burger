import { useAppDispatch } from '@/app/store/hooks';
import { ForgotPasswordPage } from '@/pages/forgot-password-page/forgot-password-page';
import { Home } from '@/pages/home/home';
import { IngredientDetailsModal } from '@/pages/ingredient-details-modal/ingredient-details-modal';
import { IngredientDetails } from '@/pages/ingredient-details/ingredient-details';
import { LoginPage } from '@/pages/login-page/login-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import {
  ProfileSettingsPage,
  ProfileOrderPage,
  ProfilePage,
} from '@/pages/profile-page/profile-page';
import { RegisterPage } from '@/pages/register-page/register-page';
import { ResetPasswordPage } from '@/pages/reset-password-page/reset-password-page';
import { checkUserAuth } from '@/services/user/actions';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const backgroundLocation = location.state?.backgroundLocation as string;

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route
          path="/register"
          element={<ProtectedRoute component={<RegisterPage />} onlyUnAuth />}
        />
        <Route
          path="/login"
          element={<ProtectedRoute component={<LoginPage />} onlyUnAuth />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute component={<ForgotPasswordPage />} onlyUnAuth />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute component={<ResetPasswordPage />} onlyUnAuth />}
        />
        <Route path="/profile" element={<ProtectedRoute component={<ProfilePage />} />}>
          <Route index element={<ProfileSettingsPage />} />
          <Route path="orders" element={<ProfileOrderPage />} />
        </Route>
        <Route path="/feed" element={<div>Лента заказов в разработке</div>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
