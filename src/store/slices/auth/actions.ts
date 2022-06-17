import { createReduxAction } from '../../../utils/createReduxAction';
import { AuthActionType, LoginAction, LogoutAction, SetUserAction } from './types';

export const loginAction = createReduxAction<LoginAction>(AuthActionType.Login);
export const logoutAction = createReduxAction<LogoutAction>(AuthActionType.Logout);
export const setUserAction = createReduxAction<SetUserAction>(AuthActionType.SetUser);
