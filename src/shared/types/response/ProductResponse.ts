import { UserResponse } from './UserResponse';

export type ProductResponse = {
  id: string;
  name: string;
  amountAvailable: number;
  currentPrice: number;
  seller: UserResponse;
};
