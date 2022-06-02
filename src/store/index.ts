import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { PromiseState } from './slices/promise/types';
import { promiseReducer } from './slices/promise/reducer';

export type StoreState = {
  promise: PromiseState;
};

const storeReducers = {
  promise: promiseReducer,
};

export const store = createStore(combineReducers(storeReducers), applyMiddleware(thunk.withExtraArgument({})));
