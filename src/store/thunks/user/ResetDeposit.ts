import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { resetDepositAction } from '../../slices/user/actions';
import { resetDepositRequest } from '../../../service/api/User/UserService';
import {setUserAction} from "../../slices/auth/actions";

export const resetDeposit: AsyncMiddleware<StoreState, APIActions> =
  (id: string) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(resetDepositAction));
      const response = await resetDepositRequest(id);
      dispatch(fulFill(resetDepositAction, response));
      dispatch(setUserAction(response))
    } catch (error) {
      errorHttpHandler(resetDepositAction, error as MvpMatchHttpError, dispatch);
    }
  };
