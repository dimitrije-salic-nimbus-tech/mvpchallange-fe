import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { PromiseState } from './slices/promise/types';
import { promiseReducer } from './slices/promise/reducer';
import { UserState } from './slices/auth/types';
import { userReducer } from './slices/auth/reducer';

export type StoreState = {
  promise: PromiseState;
  user: UserState;
};

const storeReducers = {
  promise: promiseReducer,
  user: userReducer,
};

export const store = createStore(combineReducers(storeReducers), applyMiddleware(thunk.withExtraArgument({})));
