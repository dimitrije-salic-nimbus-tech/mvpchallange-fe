import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { getProductPriceHistoryAction } from '../../slices/prices/actions';
import { getProductPriceHistoryRequest } from '../../../service/api/Price/PriceService';

export const getProductPriceHistory: AsyncMiddleware<StoreState, APIActions> =
  (id: string, offset: number) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(getProductPriceHistoryAction));
      const response = await getProductPriceHistoryRequest(id, offset);
      dispatch(fulFill(getProductPriceHistoryAction, response));
    } catch (error) {
      errorHttpHandler(getProductPriceHistoryAction, error as MvpMatchHttpError, dispatch);
    }
  };
