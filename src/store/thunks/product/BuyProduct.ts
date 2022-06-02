import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { buyProductAction } from '../../slices/product/actions';
import { buyProductRequest } from '../../../service/api/Product/ProductService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { BuyProductRequest } from '../../../shared/types/request/BuyProductRequest';

export const createProduct: AsyncMiddleware<StoreState, APIActions> =
  (id: string, request: BuyProductRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(buyProductAction));
      const response = await buyProductRequest(id, request);
      dispatch(fulFill(buyProductAction, response));
    } catch (error) {
      errorHttpHandler(buyProductAction, error as MvpMatchHttpError, dispatch);
    }
  };
