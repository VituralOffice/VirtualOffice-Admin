import { FC, ReactNode } from 'react';
import { Button } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import clsx from 'clsx';

import SearchInput from '@/components/SearchInput';

import PlusIcon from '@/assets/icons/ic-plus.svg?react';
import './style.scss';

type Props = {
  title: string;
  paddingBottom?: number;
  searchPlaceholder?: string;
  suggestion?: DefaultOptionType[];
  filter?: ReactNode;
  showCreateButton?: boolean;
  textCreateButton?: string;
  showExportButton?: boolean;
  children?: ReactNode;
  onSearch?: (value: string) => void;
  onCreate?: () => void;
  onExport?: () => void;
};

const CustomView: FC<Props> = ({
  title,
  paddingBottom = 24,
  searchPlaceholder = 'Search',
  suggestion = [],
  filter,
  showCreateButton = true,
  textCreateButton = 'Create',
  children,
  onSearch,
  onCreate = () => {},
}) => {
  return (
    <div
      className={clsx(
        'custom-view',
        'yankees-bg flex w-full flex-col overflow-scroll',
      )}
      style={{ paddingBottom: paddingBottom + 'px' }}
    >
      <div className='mt-4 flex h-20 items-center  gap-3 py-4'>
        <h3 className='green-color ml-4 text-2xl font-bold leading-[29px]'>
          {title}
        </h3>
        <div className='w-100'></div>
        <SearchInput
          customClass='flex-1 '
          options={[]}
          placeholder={searchPlaceholder}
          onSearch={onSearch}
        />
        {filter}
        {showCreateButton && (
          <Button
            icon={<PlusIcon />}
            onClick={onCreate}
            className='custom-btn green-bg w-62'
          >
            {textCreateButton}
          </Button>
        )}
      </div>
      <div className='mt-4 flex-1 overflow-auto'>{children}</div>
    </div>
  );
};

export default CustomView;
