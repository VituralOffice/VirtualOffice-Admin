import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button, Flex, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import useGlobalStore from '@/stores/global.store';

import MenuUser from './MenuUser';
import Notification from './Notification';

import './style.scss';

const Header: FC = () => {
  const { collapsed, setCollapsed } = useGlobalStore(
    useShallow((state) => ({
      collapsed: state.siderCollapsed,
      setCollapsed: state.setSiderCollapsed,
    })),
  );

  return (
    <Layout.Header className='yankees-bg flex h-17.5 items-center justify-between  pl-4 pr-6'>
      <Button
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className='h-8 !w-8 border-none !p-0 hover:!text-primary'
      />
      <Flex gap={28} align='center'>
        <Notification />
        <MenuUser />
      </Flex>
    </Layout.Header>
  );
};

export default Header;
