import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { deleteUserAction } from '../../slices/user/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { deleteUserRequest } from '../../../service/api/User/UserService';

export const deleteUser: AsyncMiddleware<StoreState, APIActions> =
  (id: string) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(deleteUserAction));
      const response = await deleteUserRequest(id);
      dispatch(fulFill(deleteUserAction, response));
    } catch (error) {
      errorHttpHandler(deleteUserAction, error as MvpMatchHttpError, dispatch);
    }
  };
