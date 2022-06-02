import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { deleteProductAction } from '../../slices/product/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { deleteProductRequest } from '../../../service/api/Product/ProductService';

export const deleteProduct: AsyncMiddleware<StoreState, APIActions> =
  (id: string) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(deleteProductAction));
      const response = await deleteProductRequest(id);
      dispatch(fulFill(deleteProductAction, response));
    } catch (error) {
      errorHttpHandler(deleteProductAction, error as MvpMatchHttpError, dispatch);
    }
  };
