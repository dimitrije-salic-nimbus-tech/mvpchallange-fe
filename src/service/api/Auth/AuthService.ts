import { get, post } from '../../HttpService';

const cognitoUrl = '/cognito';
const baseAuthUrl = '/auth';

const loginUrl = (code: string) => `${baseAuthUrl}/login?code=${code}`;
const logoutUrl = () => `${baseAuthUrl}/logout`;

export const getCognitoLoginUrlRequest = async (): Promise<any> =>
  get<any>(cognitoUrl).then((response) => response.data);

export const loginRequest = async (code: string): Promise<any> =>
  post<any, any>(loginUrl(code), {}).then((response) => response.data);

export const logoutRequest = async (): Promise<any> =>
  post<any, any>(logoutUrl(), {}).then((response) => response.data);
