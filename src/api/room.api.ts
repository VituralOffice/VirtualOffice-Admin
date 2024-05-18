import { request } from './request';
import { QueryParam } from '@/interfaces/common';
import { IRoom } from '@/interfaces/room';
interface RoomResult {
  total: number;
  data: IRoom[];
}
export const apiListRoom = (param: QueryParam) =>
  request<RoomResult>('get', '/v1/admin/rooms', param);
