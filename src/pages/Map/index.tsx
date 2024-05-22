import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Checkbox, TableColumnsType } from 'antd';

import { PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalUser from './ModalUser';
import { convertDate } from '@/utils/common';
import useMapStore from '@/stores/map.store';
import { IMap } from '@/interfaces/map';
import MapModal from './Modal';
const MapManagement: FC = () => {
  const { loading, isProcessing, listMap, total, getListMap } = useMapStore(
    useShallow((state) => ({
      loading: state.loading,
      isProcessing: state.isProcessing,
      total: state.total,
      listMap: state.listMap,
      getListMap: state.getListMap,
    })),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMap, setSelectedMap] = useState<IMap>();
  //const [keyword, setKeyword] = useState<string>('');
  //const [suggestion, setSuggestion] = useState<DefaultOptionType[]>([]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = useCallback((value: string) => {
    console.log({ value });
    setCurrentPage(1);
  }, []);

  const handleSuccess = () => {
    setShowModal(false);
    setSelectedMap(undefined);
    getListMap();
  };
  const handleCreate = () => {
    setShowModal(true);
    setSelectedMap(undefined);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMap(undefined);
  };

  const handleClickEdit = (map: IMap) => {
    console.log({ handleClickEdit: map });
    setSelectedMap(map);
    setShowModal(true);
  };

  useEffect(() => {
    getListMap();
  }, []);

  const columns: TableColumnsType<IMap> = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        align: 'center',
        width: '12%',
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Capacity',
        key: 'capacity',
        dataIndex: 'capacity',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Total meeting',
        key: 'totalMeeting',
        dataIndex: 'totalMeeting',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Total chair',
        key: 'totalChair',
        dataIndex: 'totalChair',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Active',
        key: 'active',
        dataIndex: 'active',
        align: 'center',
        width: '10%',
        render: (_, r) => <Checkbox checked={r.active}></Checkbox>,
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
  }, [getListMap]);

  return (
    <>
      <CustomView
        title={TITLE.MAP}
        searchPlaceholder='Search'
        onSearch={handleSearch}
        textCreateButton='Create map'
        onCreate={handleCreate}
      >
        <CustomTable
          loading={loading || isProcessing}
          dataSource={listMap}
          columns={columns}
          rowKey={(r) => r._id}
          pagination={{
            total,
            current: currentPage,
            pageSize: PAGE_LIMIT,
            onChange: handleChangePage,
          }}
          onRow={(record) => ({
            onClick: () => handleClickEdit(record),
          })}
        />
      </CustomView>
      <MapModal
        open={showModal}
        isEditing={!!selectedMap}
        mapData={selectedMap}
        onCancel={handleCloseModal}
        onSuccess={handleSuccess}
      ></MapModal>
    </>
  );
};

export default MapManagement;
