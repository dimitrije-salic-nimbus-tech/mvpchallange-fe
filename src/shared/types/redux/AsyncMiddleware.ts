import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type AsyncMiddleware<T, R extends Action> = ActionCreator<ThunkAction<Promise<void>, T, {}, R>>;
