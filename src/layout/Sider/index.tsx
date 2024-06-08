import { FC, Key, ReactNode, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import useGlobalStore from '@/stores/global.store';
import useAuthStore from '@/stores/auth.store';

import { TITLE, ROUTE_PATH } from '@/constants/common';

import Logo from '@/assets/icons/logo.svg?react';
import DashboardIcon from '@/assets/icons/sider/ic-dashboard.svg?react';
import MapIcon from '@/assets/icons/ic-map.svg?react';

import ManageUserIcon from '@/assets/icons/ic-manage-user.svg?react';

import './style.scss';

type TSiderItem = {
  key: string;
  label: string;
  icon: ReactNode;
  route: string;
};

const Sider: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const collapsed = useGlobalStore((state) => state.siderCollapsed);
  const role = useAuthStore((state) => state.role);

  const items: TSiderItem[] = useMemo(
    () => [
      {
        key: '0',
        label: TITLE.DASHBOARD,
        icon: <DashboardIcon />,
        route: ROUTE_PATH.DASHBOARD,
      },
      {
        key: '1',
        label: TITLE.MAP,
        icon: <MapIcon height={20} style={{ color: 'white' }} />,
        route: ROUTE_PATH.MAP,
      },
      {
        key: '2',
        label: TITLE.ROOM,
        icon: <DashboardIcon />,
        route: ROUTE_PATH.ROOM,
      },
      {
        key: '3',
        label: TITLE.PLAN,
        icon: <DashboardIcon />,
        route: ROUTE_PATH.PLAN,
      },
      {
        key: '4',
        label: TITLE.SUBSCRIPTION,
        icon: <DashboardIcon />,
        route: ROUTE_PATH.SUBSCRIPTION,
      },
      {
        key: '6',
        label: TITLE.USER,
        icon: <ManageUserIcon />,
        route: ROUTE_PATH.USER,
        disabled: false,
      },
    ],
    [role],
  );

  const currentItem = useMemo(() => {
    return [...items].find((s) => s.route === pathname)?.key ?? '';
  }, [items, pathname]);

  const handleClick = (key: Key) => {
    const route = items.find((it) => it.key === key)?.route || '/';

    navigate(route);
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='sider'
    >
      <div className='flex w-full justify-center'>
        <Link to='/' className='flex items-center'>
          <Logo width={60} height={60} />
        </Link>
      </div>
      <Menu
        mode='inline'
        items={items}
        // defaultSelectedKeys={[currentItem]}
        selectedKeys={[currentItem]}
        onClick={({ key }) => handleClick(key)}
      />
    </Layout.Sider>
  );
};

export default Sider;
