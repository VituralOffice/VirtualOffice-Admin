import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import clsx from 'clsx';

import useGlobalStore from '@/stores/global.store';

import ModalLoading from '@/components/ModalLoading';
import Header from './Header';
import Sider from './Sider';

const App: React.FC = () => {
  const loading = useGlobalStore((state) => state.loading);

  return (
    <>
      <Layout className='bg-b min-h-screen'>
        <Sider />
        <Layout>
          <Header />
          <Layout.Content
            className={clsx('layout-content', 'bg-[#091C34] px-6 pt-6')}
          >
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </Layout.Content>
        </Layout>
      </Layout>

      <ModalLoading loading={loading} />
    </>
  );
};

export default App;
