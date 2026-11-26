import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuthChecked, selectUser } from '@/services/user/selectors';
import { Navigate, useLocation } from 'react-router-dom';

import type { FC } from 'react';

type ProtectedRouteProps = {
  component?: React.ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component,
  onlyUnAuth = false,
}) => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { from } = location.state ?? { from: { pathname: '/' } };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};
