import { PromiseAction, PromiseReducer, PromiseState, PromiseType, SuperArray, SuperPendingArray } from './types';

const initialState: PromiseState = {
    fulfilled: new SuperArray(),
    rejected: new SuperArray(),
    pending: new SuperPendingArray(),
};

export const promiseReducer: PromiseReducer = (state = initialState, action: PromiseAction) => {
    switch (action.type) {
        case PromiseType.Rejected:
            return {
                ...state,
                rejected: new SuperArray(...[...state.rejected, action.payload!]),
                // @ts-ignore
                pending: new SuperPendingArray(...state.pending.filter((req) => req !== action.payload.id)),
            };
        case PromiseType.FulFilled:
            return {
                ...state,
                fulfilled: new SuperArray(...state.fulfilled.concat(action.payload!)),
                // @ts-ignore
                pending: new SuperPendingArray(...state.pending.filter((req) => req !== action.payload.id)),
            };
        case PromiseType.Pending:
            return {
                ...state,
                // @ts-ignore
                fulfilled: new SuperArray(...state.fulfilled.filter((fulfilled) => action.payload !== fulfilled.id)),
                // @ts-ignore
                rejected: new SuperArray(...state.rejected.filter((rejected) => !action.payload !== rejected.id)),
                pending: new SuperPendingArray(...state.pending.concat(action.payload!)),
            };
        case PromiseType.Reset:
            return {
                ...state,
                // @ts-ignore
                fulfilled: new SuperArray(...state.fulfilled.filter((fulfilled) => !action.payload.includes(fulfilled.id))),
                // @ts-ignore
                rejected: new SuperArray(...state.rejected.filter((rejected) => !action.payload.includes(rejected.id))),
            };
        case PromiseType.ResetAll:
            return initialState;
        default:
            return state;
    }
};
