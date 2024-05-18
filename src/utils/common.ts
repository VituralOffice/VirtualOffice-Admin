import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/constants/common';
import { TUser } from '@/interfaces/user';
import dayjs from 'dayjs';

export function fullname({ first_name, last_name }: TUser) {
  return `${first_name} ${last_name}`;
}
export function convertDate(date: string) {
  return dayjs(new Date(date)).format(DATE_FORMAT);
}

export function convertDatetime(datetime: string) {
  return dayjs(datetime).format(DATE_TIME_FORMAT);
}

export function toISODatetime(datetime: string) {
  return dayjs(datetime, DATE_FORMAT).toISOString();
}
