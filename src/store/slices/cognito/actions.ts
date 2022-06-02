import { createReduxAction } from '../../../utils/createReduxAction';
import { CognitoActionType, GetCognitoUrlAction } from './types';

export const getCognitoUrlAction = createReduxAction<GetCognitoUrlAction>(CognitoActionType.GetCognitoUrl);
