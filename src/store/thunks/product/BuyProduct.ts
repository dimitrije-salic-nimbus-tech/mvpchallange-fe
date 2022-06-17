import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { buyProductAction } from '../../slices/product/actions';
import { buyProductRequest } from '../../../service/api/Product/ProductService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { BuyProductRequest } from '../../../shared/types/request/BuyProductRequest';
import { fetchProducts } from './FetchProducts';
import { setUserAction } from '../../slices/auth/actions';
import { UserResponse } from '../../../shared/types/response/UserResponse';

export const buyProduct: AsyncMiddleware<StoreState, APIActions> =
  (user: UserResponse, request: BuyProductRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(buyProductAction));
      const response = await buyProductRequest(user.id, request);
      dispatch(fulFill(buyProductAction, response));
      // @ts-ignore
      dispatch(fetchProducts(0));
      dispatch(setUserAction({ ...user, deposit: response.depositLeft }));
    } catch (error) {
      errorHttpHandler(buyProductAction, error as MvpMatchHttpError, dispatch);
    }
  };
