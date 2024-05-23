import { FC, lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { ROUTE_PATH, TITLE } from '@/constants/common';
import Login from '@/pages/Login';
import PrivateRoute from './privateRoute';
import MapManagement from '@/pages/Map';
import RoomManagement from '@/pages/Room';
import UserManagement from '@/pages/User';
import PlanManagement from '@/pages/Plan';

const LayoutPage = lazy(() => import('@/layout/index'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

const routeList: () => RouteObject[] = () => {
  return [
    {
      path: ROUTE_PATH.LOGIN,
      element: <PrivateRoute title={TITLE.LOGIN} element={<Login />} />,
    },
    {
      path: '/',
      element: <PrivateRoute element={<LayoutPage />} />,
      children: [
        {
          path: '',
          element: <Navigate to={ROUTE_PATH.LOGIN} />,
        },
        {
          path: ROUTE_PATH.DASHBOARD,
          element: (
            <PrivateRoute
              auth
              title={TITLE.DASHBOARD}
              element={<Dashboard />}
            />
          ),
        },
        {
          path: ROUTE_PATH.MAP,
          element: (
            <PrivateRoute auth title={TITLE.MAP} element={<MapManagement />} />
          ),
        },
        {
          path: ROUTE_PATH.ROOM,
          element: (
            <PrivateRoute
              auth
              title={TITLE.ROOM}
              element={<RoomManagement />}
            />
          ),
        },
        {
          path: ROUTE_PATH.USER,
          element: (
            <PrivateRoute
              auth
              title={TITLE.USER}
              element={<UserManagement />}
            />
          ),
        },
        {
          path: ROUTE_PATH.PLAN,
          element: (
            <PrivateRoute
              auth
              title={TITLE.PLAN}
              element={<PlanManagement />}
            />
          ),
        },
      ],
    },
  ];
};

const RenderRouter: FC = () => {
  const routes = routeList();
  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
