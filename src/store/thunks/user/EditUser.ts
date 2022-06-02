import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { editUserAction } from '../../slices/user/actions';
import { editUserRequest } from '../../../service/api/User/UserService';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { EditUserRequest } from '../../../shared/types/request/EditUserRequest';

export const editUser: AsyncMiddleware<StoreState, APIActions> =
  (id: string, request: EditUserRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(editUserAction));
      const response = await editUserRequest(id, request);
      dispatch(fulFill(editUserAction, response));
    } catch (error) {
      errorHttpHandler(editUserAction, error as MvpMatchHttpError, dispatch);
    }
  };
