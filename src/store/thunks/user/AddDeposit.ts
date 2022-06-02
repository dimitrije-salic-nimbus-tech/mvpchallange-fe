import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { addDepositAction } from '../../slices/user/actions';
import { addDepositRequest } from '../../../service/api/User/UserService';
import { ChangeDepositRequest } from '../../../shared/types/request/ChangeDepositRequest';

export const addDeposit: AsyncMiddleware<StoreState, APIActions> =
  (id: string, request: ChangeDepositRequest) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(addDepositAction));
      const response = await addDepositRequest(id, request);
      dispatch(fulFill(addDepositAction, response));
    } catch (error) {
      errorHttpHandler(addDepositAction, error as MvpMatchHttpError, dispatch);
    }
  };
