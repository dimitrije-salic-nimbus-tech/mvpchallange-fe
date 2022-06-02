import { ReduxAction } from '../shared/types/redux/ReduxAction';

export const createReduxAction =
  <ActionType extends ReduxAction>(type: ActionType['type']) =>
  (payload?: ActionType['payload']) => ({ type, payload });
