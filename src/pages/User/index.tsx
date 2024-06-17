import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { TableColumnsType } from 'antd';

import { PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalUser from './ModalUser';
import useUserStore from '@/stores/user.store';
import { IUser } from '@/interfaces/user';
import { convertDate } from '@/utils/common';

const UserManagement: FC = () => {
  const { loading, isProcessing, listUser, total, getListUser } = useUserStore(
    useShallow((state) => ({
      loading: state.loading,
      isProcessing: state.isProcessing,
      total: state.total,
      listUser: state.listUser,
      getListUser: state.getListUser,
      param: state.param,
      setParam: state.setParam,
    })),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [showModal, setShowModal] = useState<boolean>(false);
  //const [selectedUser, setSelectedUser] = useState<IUser>();
  //const [keyword, setKeyword] = useState<string>('');
  //const [suggestion, setSuggestion] = useState<DefaultOptionType[]>([]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = useCallback(() => {
    //setKeyword(value);
    setCurrentPage(1);
  }, []);

  // const handleSuccess = () => {
  //   setShowModal(false);
  //   setSelectedUser(undefined);
  //   getListUser();
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedUser(undefined);
  // };

  const handleClickEdit = () => {
    //setSelectedUser(record);
    //setShowModal(true);
  };

  useEffect(() => {
    getListUser();
  }, []);

  const columns: TableColumnsType<IUser> = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        align: 'center',
        width: '14%',
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Fullname',
        key: 'fullname',
        dataIndex: 'fullname',
        align: 'center',
        width: '10%',
      },
      {
        title: 'CreatedAt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: '10%',
        render: (_, r) => <>{convertDate(r.createdAt)}</>,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: '5%',
        render: (_, r) => (
          <MenuAction item={r} txtActionChangeStatus={'Inactive'} onEdit={() => handleClickEdit()} showDelete={false} />
        ),
      },
    ];
  }, [getListUser]);

  return (
    <>
      <CustomView
        title={TITLE.USER}
        searchPlaceholder="Search"
        onSearch={handleSearch}
        textCreateButton="Create User"
        showCreateButton={false}
      >
        <CustomTable
          loading={loading || isProcessing}
          dataSource={listUser}
          columns={columns}
          rowKey={(r) => r.id}
          pagination={{
            total,
            current: currentPage,
            pageSize: PAGE_LIMIT,
            onChange: handleChangePage,
          }}
          onRow={() => ({
            // onClick: () => handleClickEdit(record),
          })}
        />
      </CustomView>
    </>
  );
};

export default UserManagement;
