import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/auth.store';
import { ROUTE_PATH } from '@/constants/common';
import LoginForm from './LoginForm';

const Login: FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <Navigate to={ROUTE_PATH.DASHBOARD} />
  ) : (
    <div className='flex h-screen w-full bg-transparent'>
      <div className='flex-center relative flex-1 flex-shrink-0 overflow-hidden'></div>
      <div className='flex-center flex-1 bg-white'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
