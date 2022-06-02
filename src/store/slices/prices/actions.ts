import { createReduxAction } from '../../../utils/createReduxAction';
import { PricesActionType, GetProductPriceHistory } from './types';

export const getProductPriceHistoryAction = createReduxAction<GetProductPriceHistory>(
  PricesActionType.GetProductPriceHistory
);
