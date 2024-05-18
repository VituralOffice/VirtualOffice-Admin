import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { TableColumnsType } from 'antd';

import { PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalUser from './ModalUser';
import { convertDate } from '@/utils/common';
import useMapStore from '@/stores/map.store';
import { IMap } from '@/interfaces/map';

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
  //const [showModal, setShowModal] = useState<boolean>(false);
  //const [selectedMap, setSelectedMap] = useState<IMap>();
  //const [keyword, setKeyword] = useState<string>('');
  //const [suggestion, setSuggestion] = useState<DefaultOptionType[]>([]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = useCallback((value: string) => {
    console.log({ value });
    setCurrentPage(1);
  }, []);

  //   const handleSuccess = () => {
  //     setShowModal(false);
  //     setSelectedMap(undefined);
  //     getListMap();
  //   };

  //   const handleCloseModal = () => {
  //     setShowModal(false);
  //     setSelectedMap(undefined);
  //   };

  const handleClickEdit = () => {
    // setSelectedMap(record);
    //setShowModal(true);
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
            onEdit={() => handleClickEdit()}
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
      >
        <CustomTable
          loading={loading || isProcessing}
          dataSource={listMap}
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

export default MapManagement;
