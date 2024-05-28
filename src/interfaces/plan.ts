export interface IPlan {
  _id: string;
  name: string;
  maxRoom: number;
  maxRoomCapacity: number;
  monthlyPrice: number;
  annuallyPrice: number;
  monthlyPriceId: string;
  annuallyPriceId: string;
  features: string[];
  createdAt: string;
}
