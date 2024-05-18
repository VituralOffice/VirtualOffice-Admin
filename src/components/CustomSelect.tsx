import { FC } from 'react';
import { Dropdown, MenuProps } from 'antd';
import clsx from 'clsx';

import DropdownIcon from '@/assets/icons/ic-select-dropdown.svg?react';

type Props = {
  items: MenuProps['items'];
  currentValue: string;
  className?: string;
};

const CustomSelect: FC<Props> = ({ items, currentValue, className = '' }) => {
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div
        className={clsx(
          'flex h-12 w-44 cursor-pointer items-center justify-between rounded-2 bg-white px-3',
          className,
        )}
      >
        <span className='text-sm text-gray'>{currentValue}</span>
        <DropdownIcon />
      </div>
    </Dropdown>
  );
};

export default CustomSelect;
