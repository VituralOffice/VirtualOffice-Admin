import { Row, Col, Typography, Card } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  HomeOutlined,
  DatabaseOutlined,
  ManOutlined,
} from '@ant-design/icons';
import Chart from './chart';
import { useEffect, useState } from 'react';
import { DashboardStat, apiStats } from '@/api/stats.api';

const { Text } = Typography;

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStat>();
  const [selectedCard, setSelectedCard] = useState('');
  const handleCardClick = (card: string) => {
    setSelectedCard(card);
  };
  const fetchStats = async () => {
    try {
      const res = await apiStats();
      console.log({ res });
      if (res.status === 200) setStats(res.data.result);
    } catch (error) { }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <>
      <div className='bg-gray-100 min-h-screen p-8'>
        <Row gutter={16} className='flex-nowrap overflow-x-auto'>
          <Col className='flex-shrink-0'>
            <Card
              className={`cursor-pointer shadow-md ${selectedCard === 'Map' ? 'bg-blue-100' : 'bg-white'
                }`}
              onClick={() => handleCardClick(`Map`)}
            >
              <div className='flex items-center'>
                <div className='mr-4'>
                  <ManOutlined className='text-4xl text-blue-500' />
                </div>
                <div>
                  <Text className='block text-lg font-semibold'>Total Map</Text>
                  <Text className='block text-2xl font-bold'>
                    {stats?.totalMap}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='flex-shrink-0'>
            <Card
              className={`cursor-pointer shadow-md ${selectedCard === 'User' ? 'bg-blue-100' : 'bg-white'
                }`}
              onClick={() => handleCardClick(`User`)}
            >
              <div className='flex items-center'>
                <div className='mr-4'>
                  <UserOutlined className='text-4xl text-green-500' />
                </div>
                <div>
                  <Text className='block text-lg font-semibold'>
                    {' '}
                    Total User
                  </Text>
                  <Text className='block text-2xl font-bold'>
                    {stats?.totalUser}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='flex-shrink-0'>
            <Card
              className={`cursor-pointer shadow-md ${selectedCard === 'Plan' ? 'bg-blue-100' : 'bg-white'
                }`}
              onClick={() => handleCardClick(`Plan`)}
            >
              <div className='flex items-center'>
                <div className='mr-4'>
                  <FileOutlined className='text-4xl text-yellow-500' />
                </div>
                <div>
                  <Text className='block text-lg font-semibold'>
                    Total Plan
                  </Text>
                  <Text className='block text-2xl font-bold'>
                    {stats?.totalPlan}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='flex-shrink-0'>
            <Card
              className={`cursor-pointer shadow-md ${selectedCard === 'Room' ? 'bg-blue-100' : 'bg-white'
                }`}
              onClick={() => handleCardClick(`Room`)}
            >
              <div className='flex items-center'>
                <div className='mr-4'>
                  <HomeOutlined className='text-4xl text-purple-500' />
                </div>
                <div>
                  <Text className='block text-lg font-semibold'>
                    Total Room
                  </Text>
                  <Text className='block text-2xl font-bold'>
                    {stats?.totalRoom}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='flex-shrink-0'>
            <Card
              className={`cursor-pointer shadow-md ${selectedCard === 'Subs' ? 'bg-blue-100' : 'bg-white'
                }`}
              onClick={() => handleCardClick(`Subs`)}
            >
              <div className='flex items-center'>
                <div className='mr-4'>
                  <DatabaseOutlined className='text-4xl text-red-500' />
                </div>
                <div>
                  <Text className='block text-lg font-semibold'>
                    Total Subs
                  </Text>
                  <Text className='block text-2xl font-bold'>
                    {stats?.totalSubscription}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Chart></Chart>
      </div>
      <div></div>
    </>
  );
};

export default Dashboard;
