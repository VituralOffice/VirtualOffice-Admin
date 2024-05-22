import { IMap } from '@/interfaces/map';
import { request } from './request';
type MapResult = IMap[];
export const apiListMap = () => request<MapResult>('get', '/v1/maps');
export const apiCreateMap = (data: Partial<IMap>) =>
  request('post', '/v1/maps', data);
export const apiUpdateMap = (mapId: string, data: Partial<IMap>) =>
  request('put', `/v1/maps/${mapId}`, data);
