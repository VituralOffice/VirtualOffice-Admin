import { CSSProperties, FC, useState } from 'react';
import { AutoComplete, Button, Flex, Input } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import clsx from 'clsx';

import SearchIcon from '@/assets/icons/ic-search.svg?react';
import DeleteIcon from '@/assets/icons/ic-close.svg?react';
import './style.scss';

type Props = {
  placeholder?: string;
  customClass?: string;
  options?: DefaultOptionType[];
  autoCompleteStyle?: CSSProperties;
  onSearch?: (value: string) => void;
};

const SearchInput: FC<Props> = ({
  placeholder = 'Search',
  customClass = '',
  options = [],
  autoCompleteStyle = {},
  onSearch,
}) => {
  const [keyword, setKeyword] = useState('');

  return (
    <Flex
      className='ml-100 basis-100 !yankees-bg relative grow justify-end text-transparent'
      style={autoCompleteStyle}
    >
      <AutoComplete
        popupClassName='search-dropdown'
        className='flex-1'
        options={options}
        onSelect={(value) => setKeyword(value)}
      >
        <Input
          className={clsx(
            'search-input yankees-bg !border !border-solid !border-blue-500 !text-white',
            customClass,
          )}
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          allowClear={{
            clearIcon: (
              <DeleteIcon
                className='h-5.5 w-5.5'
                onClick={() => {
                  setKeyword('');
                  onSearch && onSearch('');
                }}
              />
            ),
          }}
          onPressEnter={() => !!onSearch && onSearch(keyword)}
          width={400}
        />
      </AutoComplete>

      <Button
        icon={<SearchIcon />}
        onClick={() => !!onSearch && onSearch(keyword)}
        className='flex-center absolute right-0 z-[1] h-12 !w-12 !border-none !bg-primary'
      />
    </Flex>
  );
};

export default SearchInput;
