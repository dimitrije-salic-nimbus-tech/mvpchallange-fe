import { ReduxAction } from '../../../shared/types/redux/ReduxAction';

export enum PricesActionType {
  GetProductPriceHistory = 'GetProductPriceHistory',
}

export type GetProductPriceHistory = ReduxAction<PricesActionType.GetProductPriceHistory>;
