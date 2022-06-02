import { Fulfill, Pending, PromiseType, Reject, Reset, ResetAll } from './types';
import { createReduxAction } from '../../../utils/createReduxAction';

export const rejectAction = createReduxAction<Reject>(PromiseType.Rejected);
export const reject = (
  payload: Function,
  reason: string,
  field?: string,
  fields?: { field: string; message: string }[]
) =>
  rejectAction({
    id: `${payload.name}:${payload()?.type}`,
    reason,
    field,
    fields,
  });

export const resetAction = createReduxAction<Reset>(PromiseType.Reset);
export const reset = (...payload: string[] | Function[]) =>
  resetAction(payload.map((p: Function | string) => (typeof p === 'function' ? `${p.name}:${p()?.type}` : p)));

export const resetAllAction = createReduxAction<ResetAll>(PromiseType.ResetAll);
export const resetAll = (): ResetAll => resetAllAction();

export const fulFillAction = createReduxAction<Fulfill>(PromiseType.FulFilled);
export const fulFill = (payload: Function, data?: any) =>
  fulFillAction({
    id: `${payload.name}:${payload()?.type}`,
    data,
  });

export const pendingAction = createReduxAction<Pending>(PromiseType.Pending);
export const pend = (payload: Function): Pending => pendingAction(`${payload.name}:${payload()?.type}`);
