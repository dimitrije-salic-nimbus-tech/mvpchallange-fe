import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { CreateUserRequest } from '../../../shared/types/request/CreateUserRequest';
import { createUserAction } from '../../slices/user/actions';
import { createUserRequest } from '../../../service/api/User/UserService';

export const createUser: AsyncMiddleware<StoreState, APIActions> =
  (request: CreateUserRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(createUserAction));
      const response = await createUserRequest(request);
      dispatch(fulFill(createUserAction, response));
    } catch (error) {
      errorHttpHandler(createUserAction, error as MvpMatchHttpError, dispatch);
    }
  };
