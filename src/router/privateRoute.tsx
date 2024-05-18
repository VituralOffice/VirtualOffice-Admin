import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import useAuthStore from '@/stores/auth.store';

import { ROUTE_PATH } from '@/constants/common';

interface IPrivateRouteProps {
  title?: string;
  element: ReactElement;
  auth?: boolean;
  hasPermission?: boolean;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  title,
  element,
  auth,
  hasPermission = true,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (title) document.title = title;

  if (!auth) return element;

  return isAuthenticated && hasPermission ? (
    element
  ) : (
    <Navigate to={ROUTE_PATH.LOGIN} />
  );
};

export default PrivateRoute;
