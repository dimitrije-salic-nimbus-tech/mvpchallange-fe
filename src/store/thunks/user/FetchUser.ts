import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { fetchUserAction } from '../../slices/user/actions';
import { getUserRequest } from '../../../service/api/User/UserService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';

export const fetchUser: AsyncMiddleware<StoreState, APIActions> =
  (id: string) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(fetchUserAction));
      const response = await getUserRequest(id);
      dispatch(fulFill(fetchUserAction, response));
    } catch (error) {
      errorHttpHandler(fetchUserAction, error as MvpMatchHttpError, dispatch);
    }
  };
