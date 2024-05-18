import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Checkbox, TableColumnsType } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { LS_KEYS, PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalUser from './ModalUser';
import { saveSuggestionLS } from '@/utils/localStorage';
import useUserStore from '@/stores/user.store';
import { convertDate } from '@/utils/common';
import { IUser } from '@/interfaces/user';
import ModalUser from './ModalUser';

const { CUSTOMER_SUGGESTION } = LS_KEYS;

const UserManagement: FC = () => {
  const {
    loading,
    isProcessing,
    params,
    total,
    listUser,
    setParams,
    resetParams,
    getListUser,
    updateUser,
  } = useUserStore(
    useShallow((state) => ({
      loading: state.loading,
      isProcessing: state.isProcessing,
      params: state.params,
      total: state.total,
      listUser: state.listUser,
      setParams: state.setParams,
      resetParams: state.resetParams,
      getListUser: state.getListUser,
      updateUser: state.updateUser,
    })),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [keyword, setKeyword] = useState<string>('');
  const [suggestion, setSuggestion] = useState<DefaultOptionType[]>([]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setParams({ ...params, page });
  };

  const handleSearch = useCallback(
    (value: string) => {
      console.log({ value });
      setKeyword(value);
      setCurrentPage(1);
      setParams({ q: value, page: 1 });
    },
    [setParams],
  );

  const handleSuccess = () => {
    setShowModal(false);
    setSelectedUser(undefined);
    getListUser();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(undefined);
  };

  const handleClickEdit = (record: any) => {
    setSelectedUser(record);
    setShowModal(true);
  };
  const handleUpdateUserType = async (record: IUser) => {
    await updateUser(record.user_id, {
      type: record.type == 'cfv' ? '' : 'cfv',
    });
    getListUser();
  };
  useEffect(() => {
    getListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    getListUser();
  }, []);

  useEffect(() => {
    let newSuggestion = saveSuggestionLS(CUSTOMER_SUGGESTION, keyword);

    newSuggestion = newSuggestion.map((s) => ({ value: s }));

    setSuggestion([...newSuggestion]);
  }, [keyword]);

  useEffect(() => {
    return () => resetParams();
  }, [resetParams]);

  const columns: TableColumnsType<IUser> = useMemo(() => {
    /*
    const handleChangeStatus = async ({ id, active, shop_id }: TUser) => {
      const newStatus = !active;

      const res = await editUser(shop_id || 0, id, {
        active: newStatus,
      });

      if (res === HTTP_STATUS_CODE.OK) {
        message.success(
          `${active ? 'Inactive' : 'Active'} customer successfully!`,
        );
        getListUser();
      }
    };
    */
    return [
      {
        title: 'ID',
        key: 'user_id',
        dataIndex: 'user_id',
        align: 'center',
        width: '5.6%',
      },
      {
        title: 'Avatar',
        key: 'avatar',
        dataIndex: 'avatar',
        align: 'center',
        width: '5.6%',
      },
      {
        title: 'Name',
        key: 'fullname',
        dataIndex: 'fullname',
        align: 'center',
        width: '14.2%',
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        align: 'center',
        width: '14.2%',
      },
      {
        title: 'Phone',
        key: 'phone',
        dataIndex: 'phone',
        align: 'center',
        width: '9.7%',
      },
      {
        title: 'Sinh nhật',
        key: 'birthday',
        dataIndex: 'birthday',
        align: 'center',
        width: '7.9%',
      },
      {
        title: 'Ngày tạo',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: '7.9%',
        render: (_, r) => <>{convertDate(r.createdAt)}</>,
      },
      {
        title: 'Cfv user',
        key: 'type',
        dataIndex: 'type',
        align: 'center',
        width: '7.9%',
        render: (_, r) => (
          <>
            <Checkbox
              checked={r.type === 'cfv'}
              onClick={() => handleUpdateUserType(r)}
            ></Checkbox>
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: '7.4%',
        render: (_, r) => (
          <MenuAction
            item={r}
            txtActionChangeStatus={'Inactive'}
            onEdit={() => handleClickEdit(r)}
            showDelete={false}
          />
        ),
      },
    ];
  }, [getListUser]);

  return (
    <>
      <CustomView
        title={TITLE.USER}
        searchPlaceholder='Tìm kiếm'
        suggestion={suggestion}
        onSearch={handleSearch}
        textCreateButton='Tạo người dùng'
        onCreate={() => setShowModal(true)}
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
          onRow={(record) => ({
            // onClick: () => handleClickEdit(record),
          })}
        />
      </CustomView>
      <ModalUser
        open={showModal}
        isEditing={!!selectedUser}
        userData={selectedUser}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default UserManagement;
