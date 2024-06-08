import { FC, useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { DatePicker, DatePickerProps } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
  ScriptableContext,
} from 'chart.js';
import dayjs, { Dayjs } from 'dayjs';
import CalendarIcon from '@/assets/icons/ic-calendar.svg?react';
import { apiUserStats } from '@/api/stats.api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  plugins: {
    filler: {
      propagate: false,
    },
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      borderWidth: 4,
      tension: 0.35,
    },
    point: {
      radius: 0,
      hoverBorderWidth: 3,
      hoverBorderColor: '#FFF',
    },
  },
  scales: {
    y: {
      grid: { color: '#3F6DA6' },
      ticks: {
        color: '#EBEBF54D',
        font: { size: 14 },
        stepSize: 5,
      },
    },
    x: {
      grid: { color: (context: any) => (context.index ? '' : '#3F6DA6') },
      ticks: {
        color: '#EBEBF54D',
        font: { size: 14 },
      },
    },
  },
};

const getAllDaysInMonth = (month: number, year: number) =>
  Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);

const disabledDate: DatePickerProps['disabledDate'] = (current) => {
  return current && current > dayjs();
};

const UserChart: FC = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().startOf('M'));
  const [dayList, setDayList] = useState<number[]>([]);
  const [dataStat, setDataStat] = useState<number[]>([]);
  const fetchUserStats = async () => {
    try {
      const res = await apiUserStats(date.format(`YYYY-MM-DD`));
      if (res.status === 200) setDataStat(res.data.result.map((u) => u.count));
    } catch (error) { }
  };

  const data: ChartData<'line'> = useMemo(
    () => ({
      labels: [...dayList.map((i) => `D-${i}`)],
      datasets: [
        {
          label: date.format('MM/YYYY'),
          data: dataStat,
          borderColor: '#EA2B3A',
          fill: 'start',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 277);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            return gradient;
          },
        },
      ],
    }),
    [dataStat, date, dayList],
  );
  useEffect(() => {
    fetchUserStats();
    setDayList(getAllDaysInMonth(date.get('M') + 1, date.get('y')));
  }, []);
  useEffect(() => {
    fetchUserStats();
  }, [date]);
  return (
    <div className='mt-8 flex flex-col gap-6'>
      <div className='flex flex-wrap justify-between gap-5 pr-2'>
        <strong className='text-base text-white'>Total User</strong>
        <div className='flex flex-wrap items-center gap-7.5'>
          <div className='bg-red h-1 w-15 rounded-1' />
          <div className='bg-blue-light h-1 w-15 rounded-1' />
          <span className='text-xs text-gray'>Month </span>
          <DatePicker
            picker='month'
            format={'MM/YYYY'}
            value={date}
            onChange={(d) => setDate(d.startOf('M'))}
            disabledDate={disabledDate}
            suffixIcon={<CalendarIcon className='w-5' />}
            allowClear={false}
          />
        </div>
      </div>
      <div className='h-[277px] w-full'>
        <Line className='h-full w-full' options={options} data={data} />
      </div>
    </div>
  );
};

export default UserChart;
