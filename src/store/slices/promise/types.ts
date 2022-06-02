// eslint-disable-next-line max-classes-per-file
import { ReduxAction } from '../../../shared/types/redux/ReduxAction';
import { ReduxReducer } from '../../../shared/types/redux/ReduxReducer';
import { PromiseResult } from '../../../shared/types/PromiseResult';

export type PromiseError = {
    id: string;
    reason: string;
    field?: string;
    fields?: { field: string; message: string }[];
};
export enum PromiseType {
    Rejected = 'Rejected',
    Pending = 'Pending',
    FulFilled = 'FulFilled',
    Reset = 'Reset',
    ResetAll = 'ResetAll',
}

export type Reject = ReduxAction<PromiseType.Rejected, PromiseError>;
export type Fulfill = ReduxAction<PromiseType.FulFilled, PromiseResult>;
export type Pending = ReduxAction<PromiseType.Pending, string>;
export type Reset = ReduxAction<PromiseType.Reset, string[]>;
export type ResetAll = ReduxAction<PromiseType.ResetAll, null>;

export type APIActions = Pending | Reject | Fulfill;

export type PromiseAction = Reject | Fulfill | Pending | Reset | ResetAll;

export type PromiseState = {
    rejected: SuperArray;
    pending: SuperPendingArray;
    fulfilled: SuperArray;
};

export class SuperArray extends Array<PromiseResult | PromiseError> {
    public includesAll(...subArray: Function[]): boolean {
        return subArray.every((v) => this.find((p) => p.id === `${v.name}:${v()?.type}`));
    }

    public includesAny(...subArray: Function[]): boolean {
        return subArray.some((v) => this.find((p) => p.id === `${v.name}:${v()?.type}`));
    }

    public getItem(fun: Function): PromiseResult | PromiseError {
        return this.find((p) => p.id === `${fun.name}:${fun()?.type}`)!;
    }
}
export class SuperPendingArray extends Array<string> {
    public includesAll(...subArray: Function[]): boolean {
        return subArray.every((v) => this.find((p) => p === `${v.name}:${v()?.type}`));
    }

    public includesAny(...subArray: Function[]): boolean {
        return subArray.some((v) => this.find((p) => p === `${v.name}:${v()?.type}`));
    }
}

export type UnionAction = PromiseAction;

export type PromiseReducer = ReduxReducer<PromiseState, PromiseAction>;
