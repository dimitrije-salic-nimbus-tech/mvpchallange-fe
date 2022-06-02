import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { createProductAction } from '../../slices/product/actions';
import { createProductRequest } from '../../../service/api/Product/ProductService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { CreateProductRequest } from '../../../shared/types/request/CreateProductRequest';

export const createProduct: AsyncMiddleware<StoreState, APIActions> =
  (id: string, request: CreateProductRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(createProductAction));
      const response = await createProductRequest(id, request);
      dispatch(fulFill(createProductAction, response));
    } catch (error) {
      errorHttpHandler(createProductAction, error as MvpMatchHttpError, dispatch);
    }
  };
