import { set, updateAll } from 'shades';

import { AuthActionType, UserReducer, UserState } from './types';
import { browserService } from '../../../service/browser/BrowserService';
import { UserResponse } from '../../../shared/types/response/UserResponse';
import { BrowserServiceKeys } from '../../../shared/enums/BrowserServiceKeys';

const initialState: UserState = {
  user: browserService.get<UserResponse>(BrowserServiceKeys.USER) || undefined,
  accesstoken: browserService.get<string>(BrowserServiceKeys.TOKEN) || undefined,
};

export const userReducer: UserReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    case AuthActionType.SetAccessToken:
      return set('accesstoken')(action.payload)(state);
    case AuthActionType.SetUser:
      return set('user')(action.payload)(state);
    case AuthActionType.Login:
      return updateAll<UserState>(
        // @ts-ignore
        set('user')(action.payload!.user),
        // @ts-ignore
        set('accesstoken')(action.payload!.accesstoken)
      )(state);
    case AuthActionType.Logout:
      return updateAll<UserState>(
        set('user')<UserResponse | undefined>(undefined),
        set('accesstoken')<string | undefined>(undefined)
      )(state);
    default:
      return state;
  }
};
