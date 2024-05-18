import { FC } from 'react';

import EditIcon from '@/assets/icons/ic-btn-edit.svg?react';
import DeleteIcon from '@/assets/icons/ic-trash.svg?react';
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
  showDelete = true,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className='flex items-center justify-center'>
      <EditIcon className='cursor-pointer' onClick={onEdit}></EditIcon>
      {showDelete ? (
        <DeleteIcon className='cursor-pointer' onClick={onDelete}></DeleteIcon>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuAction;
