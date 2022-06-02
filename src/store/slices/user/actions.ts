import { createReduxAction } from '../../../utils/createReduxAction';
import {
  CreateUserAction,
  EditUserAction,
  FetchUserAction,
  FetchUsersAction,
  UserActionType,
  DeleteUserAction,
  ResetDepositAction,
  AddDepositAction,
} from './types';

export const fetchUsersAction = createReduxAction<FetchUsersAction>(UserActionType.FetchUsers);
export const fetchUserAction = createReduxAction<FetchUserAction>(UserActionType.FetchUser);
export const editUserAction = createReduxAction<EditUserAction>(UserActionType.EditUser);
export const createUserAction = createReduxAction<CreateUserAction>(UserActionType.CreateUser);
export const deleteUserAction = createReduxAction<DeleteUserAction>(UserActionType.DeleteUser);
export const resetDepositAction = createReduxAction<ResetDepositAction>(UserActionType.ResetDeposit);
export const addDepositAction = createReduxAction<AddDepositAction>(UserActionType.AddDeposit);
