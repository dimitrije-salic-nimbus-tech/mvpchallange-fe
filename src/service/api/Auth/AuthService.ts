import { get } from '../../HttpService';

const baseCognitoUrl = `/cognito`;

export const getCognitoLoginUrlRequest = async (): Promise<any> =>
  get<any>(baseCognitoUrl).then((response) => response.data);
