import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { fetchUsersAction } from '../../slices/user/actions';
import { getUsersRequest } from '../../../service/api/User/UserService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';

export const fetchUsers: AsyncMiddleware<StoreState, APIActions> =
  (offset: number) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(fetchUsersAction));
      const response = await getUsersRequest(offset);
      dispatch(fulFill(fetchUsersAction, response));
    } catch (error) {
      errorHttpHandler(fetchUsersAction, error as MvpMatchHttpError, dispatch);
    }
  };
