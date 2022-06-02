import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { fetchProductsAction } from '../../slices/product/actions';
import { getProductsRequest } from '../../../service/api/Product/ProductService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';

export const fetchProducts: AsyncMiddleware<StoreState, APIActions> =
  (offset: number) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(fetchProductsAction));
      const response = await getProductsRequest(offset);
      dispatch(fulFill(fetchProductsAction, response));
    } catch (error) {
      errorHttpHandler(fetchProductsAction, error as MvpMatchHttpError, dispatch);
    }
  };
