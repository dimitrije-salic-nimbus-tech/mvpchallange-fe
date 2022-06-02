import { Dispatch } from 'redux';
import { ReduxAction } from '../shared/types/redux/ReduxAction';
import { reject } from '../store/slices/promise/actions';

export type MvpMatchHttpError = {
  code: ErrorCode;
  message: string;
  messageCode: string;
  field?: string;
  fields?: { field: string; message: string }[];
};

export enum ErrorCode {
  GlobalError = 300,
  FormError = 330,
  NotApproved = 400,
  NoPermissions = 410,
}

export const errorHttpHandler = (action: () => ReduxAction, error: MvpMatchHttpError, dispatch: Dispatch) => {
  dispatch(reject(action, error.messageCode, error.field));
};
