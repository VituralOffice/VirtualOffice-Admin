import { IMap } from './map';
import { IUser } from './user';

export interface IRoom {
  _id: string;
  name: string;
  creator: IUser;
  map: IMap;
  members: IUser[];
  private: boolean;
  createdAt: string;
}
