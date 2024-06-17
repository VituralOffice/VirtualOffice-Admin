import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { TableColumnsType } from 'antd';

import { PAGE_LIMIT, TITLE } from '@/constants/common';
import CustomView from '@/layout/CustomView';
import CustomTable from '@/components/CustomTable';
import MenuAction from '@/components/MenuAction';
//import ModalSubscription from './ModalSubscription';
import useSubscriptionStore from '@/stores/subscription.store';
import { ISubscription } from '@/interfaces/subscription';
import { convertDate } from '@/utils/common';

const SubscriptionManagement: FC = () => {
  const { loading, isProcessing, listSubscription, total, getListSubscription } = useSubscriptionStore(
    useShallow((state) => ({
      loading: state.loading,
      isProcessing: state.isProcessing,
      total: state.total,
      listSubscription: state.listSubscription,
      getListSubscription: state.getListSubscription,
      param: state.param,
      setParam: state.setParam,
    })),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [showModal, setShowModal] = useState<boolean>(false);
  //const [selectedSubscription, setSelectedSubscription] = useState<ISubscription>();
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
  //   setSelectedSubscription(undefined);
  //   getListSubscription();
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedSubscription(undefined);
  // };

  const handleClickEdit = () => {
    //setSelectedSubscription(record);
    //setShowModal(true);
  };

  useEffect(() => {
    getListSubscription();
  }, []);

  const columns: TableColumnsType<ISubscription> = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        align: 'center',
        width: 300,
      },
      {
        title: 'User',
        key: 'user',
        dataIndex: 'user',
        align: 'center',
        width: 200,
        render: (_: any, r) => <>{r.user.fullname}</>,
      },
      {
        title: 'Plan',
        key: 'plan',
        dataIndex: 'plan',
        align: 'center',
        width: 200,
        render: (_: any, r) => <>{r.plan.name}</>,
      },
      {
        title: 'Billing Cycle',
        key: 'billingCycle',
        dataIndex: 'billingCycle',
        align: 'center',
        width: 200,
      },
      {
        title: 'Total',
        key: 'total',
        dataIndex: 'total',
        align: 'center',
        width: 200,
      },
      {
        title: 'Currency',
        key: 'currency',
        dataIndex: 'currency',
        align: 'center',
        width: 200,
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        width: 200,
      },
      {
        title: 'Payment status',
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        align: 'center',
        width: 200,
      },
      {
        title: 'Start date',
        key: 'startDate',
        dataIndex: 'startDate',
        align: 'center',
        width: 200,
        render: (_, r) => <>{convertDate(r.startDate)}</>,
      },
      {
        title: 'End date',
        key: 'endDate',
        dataIndex: 'endDate',
        align: 'center',
        width: 200,
        render: (_, r) => <>{convertDate(r.startDate)}</>,
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
  }, [getListSubscription]);

  return (
    <>
      <CustomView
        title={TITLE.ROOM}
        searchPlaceholder="Search"
        onSearch={handleSearch}
        textCreateButton="Create Subscription"
        showCreateButton={false}
      >
        <CustomTable
          loading={loading || isProcessing}
          dataSource={listSubscription}
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

export default SubscriptionManagement;
