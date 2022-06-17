import { Dispatch } from 'redux';

import { AsyncMiddleware } from '../../../shared/types/redux/AsyncMiddleware';
import { StoreState } from '../../index';
import { APIActions } from '../../slices/promise/types';
import { browserService } from '../../../service/browser/BrowserService';
import { fulFill, pend } from '../../slices/promise/actions';
import { BrowserServiceKeys } from '../../../shared/enums/BrowserServiceKeys';
import { errorHttpHandler, MvpMatchHttpError } from '../../../utils/errorHttpHandler';
import { logoutAction } from '../../slices/auth/actions';
import { LogoutAction } from '../../slices/auth/types';
import { logoutRequest } from '../../../service/api/Auth/AuthService';

export const logout: AsyncMiddleware<StoreState, LogoutAction | APIActions> =
  () => async (dispatch: Dispatch, _: () => StoreState) => {
    dispatch(pend(logoutAction));
    // Check if user is already logged out
    if (!browserService.get(BrowserServiceKeys.TOKEN)) {
      dispatch(logoutAction());
      dispatch(fulFill(logoutAction));
      return;
    }

    try {
      await logoutRequest();
      browserService.clear(BrowserServiceKeys.TOKEN);
      browserService.clear(BrowserServiceKeys.USER);
      dispatch(logoutAction());
      dispatch(fulFill(logoutAction));
    } catch (error) {
      errorHttpHandler(logoutAction, error as MvpMatchHttpError, dispatch);
    }
  };
