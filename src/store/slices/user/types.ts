import { ReduxAction } from '../../../shared/types/redux/ReduxAction';

export enum UserActionType {
  FetchUsers = 'FetchUsers',
  FetchUser = 'FetchUser',
  EditUser = 'EditUser',
  CreateUser = 'CreateUser',
  DeleteUser = 'DeleteUser',
  ResetDeposit = 'ResetDeposit',
  AddDeposit = 'AddDeposit',
}

export type FetchUsersAction = ReduxAction<UserActionType.FetchUsers>;
export type FetchUserAction = ReduxAction<UserActionType.FetchUser>;
export type EditUserAction = ReduxAction<UserActionType.EditUser>;
export type CreateUserAction = ReduxAction<UserActionType.CreateUser>;
export type DeleteUserAction = ReduxAction<UserActionType.DeleteUser>;
export type ResetDepositAction = ReduxAction<UserActionType.ResetDeposit>;
export type AddDepositAction = ReduxAction<UserActionType.AddDeposit>;
