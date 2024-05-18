import { IMap } from '@/interfaces/map';
import { request } from './request';
type MapResult = IMap[];
export const apiListMap = () => request<MapResult>('get', '/v1/maps');
