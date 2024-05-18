import { FC } from 'react';
import { Badge, Popover } from 'antd';

import BellIcon from '@/assets/icons/ic-bell.svg?react';

const Notification: FC = () => {
  return (
    <Popover
      trigger='click'
      placement='bottomRight'
      content={() => (
        <div>
          <p>Notification 1</p>
          <p>Notification 2</p>
        </div>
      )}
    >
      <Badge count={6}>
        <BellIcon className='cursor-pointer h-6 w-6' />
      </Badge>
    </Popover>
  );
};

export default Notification;
