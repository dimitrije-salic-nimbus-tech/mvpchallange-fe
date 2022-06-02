import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { fetchProductAction } from '../../slices/product/actions';
import { getProductRequest } from '../../../service/api/Product/ProductService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';

export const fetchProduct: AsyncMiddleware<StoreState, APIActions> =
  (id: string) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(fetchProductAction));
      const response = await getProductRequest(id);
      dispatch(fulFill(fetchProductAction, response));
    } catch (error) {
      errorHttpHandler(fetchProductAction, error as MvpMatchHttpError, dispatch);
    }
  };
