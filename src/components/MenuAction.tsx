import { FC } from 'react';

import ActiveIcon from '@/assets/icons/ic-active.svg?react';
import InactiveIcon from '@/assets/icons/ic-inactive.svg?react';
import EditIcon from '@/assets/icons/ic-btn-edit.svg?react';
import DeleteIcon from '@/assets/icons/ic-trash.svg?react';
import { Button, Modal } from 'antd';
type Props = {
  item: any;
  showStatus?: boolean;
  isActiveStatus?: boolean;
  txtActionChangeStatus?: string;
  showEdit?: boolean;
  showDelete?: boolean;
  onStatusChange?: (item?: any) => void;
  onEdit?: (item?: any) => void;
  onDelete?: (item?: any) => void;
};

const MenuAction: FC<Props> = ({
  item,
  isActiveStatus = false,
  txtActionChangeStatus = '',
  showStatus = true,
  showEdit = true,
  showDelete = true,
  onStatusChange = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className='flex items-center justify-center'>
      <EditIcon className='cursor-pointer' onClick={onEdit}></EditIcon>
      <DeleteIcon className='cursor-pointer' onClick={onDelete}></DeleteIcon>
    </div>
  );
};

export default MenuAction;
