import { ReduxAction } from '../../../shared/types/redux/ReduxAction';

export enum CognitoActionType {
  GetCognitoUrl = 'GetCognitoUrl',
}

export type GetCognitoUrlAction = ReduxAction<CognitoActionType.GetCognitoUrl>;
