import { ReduxAction } from '../../../shared/types/redux/ReduxAction';
import { UserResponse } from '../../../shared/types/response/UserResponse';
import { ReduxReducer } from '../../../shared/types/redux/ReduxReducer';

export enum AuthActionType {
  Login = 'Login',
  Logout = 'Logout',
  SetUser = 'SetUser',
  SetAccessToken = 'SetAccessToken',
}

export type LoginAction = ReduxAction<AuthActionType.Login>;
export type LogoutAction = ReduxAction<AuthActionType.Logout>;
export type SetUserAction = ReduxAction<AuthActionType.SetUser, UserResponse | undefined>;
export type SetAccessTokenAction = ReduxAction<AuthActionType.SetAccessToken, string | undefined>;

export type UserActions = SetUserAction | SetAccessTokenAction | LoginAction | LogoutAction;
export type UserState = {
  user: UserResponse | undefined;
  accesstoken: string | undefined;
};

export type UserReducer = ReduxReducer<UserState, UserActions>;
