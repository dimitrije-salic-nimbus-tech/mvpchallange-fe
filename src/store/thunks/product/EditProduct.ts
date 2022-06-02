import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { editProductAction } from '../../slices/product/actions';
import { editProductRequest } from '../../../service/api/Product/ProductService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { EditProductRequest } from '../../../shared/types/request/EditProductRequest';

export const editProduct: AsyncMiddleware<StoreState, APIActions> =
  (id: string, request: EditProductRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(editProductAction));
      const response = await editProductRequest(id, request);
      dispatch(fulFill(editProductAction, response));
    } catch (error) {
      errorHttpHandler(editProductAction, error as MvpMatchHttpError, dispatch);
    }
  };
