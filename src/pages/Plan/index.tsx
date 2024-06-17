import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { TableColumnsType } from 'antd';

import { PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalUser from './ModalUser';
import usePlanStore from '@/stores/plan.store';
import { IPlan } from '@/interfaces/plan';
import { convertDate } from '@/utils/common';

const PlanManagement: FC = () => {
  const { loading, isProcessing, listPlan, total, getListPlan } = usePlanStore(
    useShallow((state) => ({
      loading: state.loading,
      isProcessing: state.isProcessing,
      total: state.total,
      listPlan: state.listPlan,
      getListPlan: state.getListPlan,
      param: state.param,
      setParam: state.setParam,
    })),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [showModal, setShowModal] = useState<boolean>(false);
  //const [selectedPlan, setSelectedPlan] = useState<IPlan>();
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
  //   setSelectedPlan(undefined);
  //   getListPlan();
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedPlan(undefined);
  // };

  const handleClickEdit = () => {
    //setSelectedPlan(record);
    //setShowModal(true);
  };

  useEffect(() => {
    getListPlan();
  }, []);

  const columns: TableColumnsType<IPlan> = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        align: 'center',
        width: 300,
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
        width: 200,
      },
      {
        title: 'Max room',
        key: 'maxRoom',
        dataIndex: 'maxRoom',
        align: 'center',
        width: 200,
      },
      {
        title: 'Room capacity',
        key: 'maxRoomCapacity',
        dataIndex: 'maxRoomCapacity',
        align: 'center',
        width: 200,
      },
      {
        title: 'Monthly price',
        key: 'monthlyPrice',
        dataIndex: 'monthlyPrice',
        align: 'center',
        width: 200,
      },
      {
        title: 'Annually price',
        key: 'annuallyPrice',
        dataIndex: 'annuallyPrice',
        align: 'center',
        width: 200,
      },
      {
        title: 'Features',
        key: 'features',
        dataIndex: 'features',
        align: 'center',
        width: 350,
        render: (_, r) => (
          <div
            style={{
              alignItems: 'flex-start',
              justifyContent: 'left',
              textAlign: 'left',
              padding: '20px',
            }}
          >
            {r.features.map((f) => (
              <p>{f}</p>
            ))}
          </div>
        ),
      },
      {
        title: 'CreatedAt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: 200,
        render: (_, r) => <>{convertDate(r.createdAt)}</>,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 200,
        render: (_, r) => (
          <MenuAction item={r} txtActionChangeStatus={'Inactive'} onEdit={() => handleClickEdit()} showDelete={false} />
        ),
      },
    ];
  }, [getListPlan]);

  return (
    <>
      <CustomView
        title={TITLE.PLAN}
        searchPlaceholder="Search"
        onSearch={handleSearch}
        textCreateButton="Create Plan"
        showCreateButton={false}
      >
        <CustomTable
          loading={loading || isProcessing}
          dataSource={listPlan}
          columns={columns}
          rowKey={(r) => r._id}
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

export default PlanManagement;
