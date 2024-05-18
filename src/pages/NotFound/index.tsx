import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import { ROUTE_PATH } from '@/constants/common';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status='404'
      title='404'
      className='mx-auto text-white'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button
          type='primary'
          className='bg-primary'
          onClick={() => navigate(ROUTE_PATH.DASHBOARD)}
        >
          Back Dashboard
        </Button>
      }
    />
  );
};

export default NotFound;
