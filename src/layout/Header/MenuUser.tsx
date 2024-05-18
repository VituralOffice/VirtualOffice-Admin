import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Dropdown, Flex, Image, MenuProps, Typography } from 'antd';

import useAuthStore from '@/stores/auth.store';

import AvatarImage from '@/assets/images/avatar.png';
import InfoIcon from '@/assets/icons/ic-user-info.svg?react';
import SettingIcon from '@/assets/icons/ic-settings.svg?react';
import LogoutIcon from '@/assets/icons/ic-logout.svg?react';
import ArrowRightIcon from '@/assets/icons/ic-arrow-right.svg?react';
import DropdownIcon from '@/assets/icons/dropdown.svg?react';

const { Text } = Typography;

const MenuUser: FC = () => {
  const { user, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    })),
  );

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: '0',
        label: (
          <Flex gap={8} align='center'>
            {!!user && (
              <>
                <Image
                  height={28}
                  preview={false}
                  src={user.avatar || AvatarImage}
                />
                <Text className='line-clamp-1 flex-1 text-sm font-bold text-black'>
                  {user.fullname}
                </Text>
              </>
            )}
          </Flex>
        ),
      },
      {
        key: '1',
        icon: <InfoIcon />,
        label: (
          <Link to='/profile'>
            <Flex justify='space-between' align='center'>
              <Text className='text-base'>Profile Information</Text>
              <ArrowRightIcon />
            </Flex>
          </Link>
        ),
      },
      {
        key: '2',
        icon: <SettingIcon />,
        label: (
          <Link to='/profile'>
            <Flex justify='space-between' align='center'>
              <Text className='text-base'>Setting</Text>
              <ArrowRightIcon />
            </Flex>
          </Link>
        ),
      },
      {
        key: '3',
        icon: <LogoutIcon />,
        label: <Text className='text-base text-light-red'>Logout</Text>,
        onClick: () => logout(),
      },
    ],
    [user, logout],
  );

  return (
    <Dropdown menu={{ items }} overlayClassName='menu-user' trigger={['click']}>
      <div className='flex w-60 cursor-pointer items-center gap-2'>
        {!!user && (
          <>
            <Image preview={false} src={AvatarImage} height={46} />
            <div className='flex flex-1 flex-col gap-1'>
              <Text className='green-color line-clamp-1 text-sm font-bold leading-tight'>
                {user.fullname}
              </Text>
              <Text className='text-xs leading-tight text-gray'>
                Administrator
              </Text>
            </div>
            <div className='flex-center blue-color box-content h-6 w-6'>
              <DropdownIcon className='h-5' />
            </div>
          </>
        )}
      </div>
    </Dropdown>
  );
};

export default MenuUser;
