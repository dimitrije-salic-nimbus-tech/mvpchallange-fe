import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { fulFill, pend } from '../../slices/promise/actions';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { loginAction } from '../../slices/auth/actions';
import { loginRequest } from '../../../service/api/Auth/AuthService';
import { browserService } from '../../../service/browser/BrowserService';
import { UserResponse } from '../../../shared/types/response/UserResponse';
import { BrowserServiceKeys } from '../../../shared/enums/BrowserServiceKeys';

export const login: AsyncMiddleware<StoreState, APIActions> =
  (code: string) => async (dispatch: Dispatch, _: () => StoreState) => {
    try {
      dispatch(pend(loginAction));
      const response = await loginRequest(code);
      const { user, accesstoken } = response;
      browserService.store<UserResponse>(BrowserServiceKeys.USER, user);
      browserService.store<string>(BrowserServiceKeys.TOKEN, accesstoken);
      dispatch(fulFill(loginAction, response));
      dispatch(
        loginAction({
          user,
          accesstoken,
        })
      );
    } catch (error) {
      errorHttpHandler(loginAction, error as MvpMatchHttpError, dispatch);
    }
  };
