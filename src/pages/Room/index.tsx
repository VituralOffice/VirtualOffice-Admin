import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { TableColumnsType } from 'antd';

import { PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalUser from './ModalUser';
import useRoomStore from '@/stores/room.store';
import { IRoom } from '@/interfaces/room';
import { convertDate } from '@/utils/common';

const RoomManagement: FC = () => {
  const { loading, isProcessing, listRoom, total, getListRoom } = useRoomStore(
    useShallow((state) => ({
      loading: state.loading,
      isProcessing: state.isProcessing,
      total: state.total,
      listRoom: state.listRoom,
      getListRoom: state.getListRoom,
      param: state.param,
      setParam: state.setParam,
    })),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [showModal, setShowModal] = useState<boolean>(false);
  //const [selectedRoom, setSelectedRoom] = useState<IRoom>();
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
  //   setSelectedRoom(undefined);
  //   getListRoom();
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedRoom(undefined);
  // };

  const handleClickEdit = () => {
    //setSelectedRoom(record);
    //setShowModal(true);
  };

  useEffect(() => {
    getListRoom();
  }, []);

  const columns: TableColumnsType<IRoom> = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        align: 'center',
        width: '14%',
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Map',
        key: 'map',
        dataIndex: 'map',
        align: 'center',
        width: '10%',
        render: (_, r) => <>{r.map?.name}</>,
      },
      {
        title: 'Creator',
        key: 'creator',
        dataIndex: 'creator',
        align: 'center',
        width: '10%',
        render: (_, r) => <>{r.creator.fullname}</>,
      },
      {
        title: 'Member',
        key: 'member',
        dataIndex: 'member',
        align: 'center',
        width: '10%',
        render: (_, r) => <>{r.members.length}</>,
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
          <MenuAction
            item={r}
            txtActionChangeStatus={'Inactive'}
            onEdit={() => handleClickEdit()}
            showDelete={false}
          />
        ),
      },
    ];
  }, [getListRoom]);

  return (
    <>
      <CustomView
        title={TITLE.ROOM}
        searchPlaceholder='Search'
        onSearch={handleSearch}
        textCreateButton='Create Room'
      >
        <CustomTable
          loading={loading || isProcessing}
          dataSource={listRoom}
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

export default RoomManagement;
