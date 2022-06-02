import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { pend, fulFill } from '../../slices/promise/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { getCognitoUrlAction } from '../../slices/cognito/actions';
import { getCognitoLoginUrlRequest } from '../../../service/api/Auth/AuthService';

export const getCognitoLoginUrl: AsyncMiddleware<StoreState, APIActions> =
  () => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(getCognitoUrlAction));
      const response = await getCognitoLoginUrlRequest();
      dispatch(fulFill(getCognitoUrlAction, response));
    } catch (error) {
      errorHttpHandler(getCognitoUrlAction, error as MvpMatchHttpError, dispatch);
    }
  };
