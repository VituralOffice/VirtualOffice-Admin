import { FC } from 'react';
import { Table, TableProps } from 'antd';

import './style.scss';

type Props = TableProps<any>;

const CustomTable: FC<Props> = (props) => {
  return (
    <Table
      {...props}
      className='custom-table'
      scroll={{ y: 'calc(100vh - 22.8125rem)' }}
      style={{ minWidth: '1000px' }}
    />
  );
};

export default CustomTable;
