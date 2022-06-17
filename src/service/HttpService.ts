import axios, { AxiosResponse } from 'axios';
import { BrowserServiceKeys } from '../shared/enums/BrowserServiceKeys';
import { browserService } from './browser/BrowserService';
import { logout } from '../store/thunks/auth/Logout';
import { unauthorizedRoutes } from '../utils/unauthorizedRoutes';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api';

export const setupAxios = (dispatch: any) => {
  axios.interceptors.request.use(async (config) => {
    const token = browserService.get<string>(BrowserServiceKeys.TOKEN);

    if ((unauthorizedRoutes.some((route: string) => config.url?.includes(route))) || (config.url?.includes('/products') && config.method === 'get')) {
      return config;
    }

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers!.accesstoken = token;
    }

    return config;
  });

  axios.interceptors.response.use(
    (config) => config,
    async (error) => {
      if (error.response.status === 401) {
        browserService.clear(BrowserServiceKeys.TOKEN);
        browserService.clear(BrowserServiceKeys.USER);
        dispatch(logout());
        return Promise.reject(error.response.data.payload);
      }

      return Promise.reject(error.response.data.payload);
    }
  );
};

export const get = async <T>(url: string, headers = {}): Promise<AxiosResponse<T>> =>
  axios.get(`${baseUrl}${url}`, { ...headers });

export const post = async <Body, Response>(url: string, body: Body): Promise<AxiosResponse<Response>> =>
  axios.post<Body, AxiosResponse<Response>>(`${baseUrl}${url}`, body);

export const patch = async <Body, Response>(url: string, body: Body): Promise<AxiosResponse<Response>> =>
  axios.patch<Body, AxiosResponse<Response>>(`${baseUrl}${url}`, body);

export const deleteMethod = async <T>(url: string): Promise<AxiosResponse<T>> => axios.delete(`${baseUrl}${url}`);

export const put = async <Body, Response>(url: string, body: Body): Promise<AxiosResponse<Response>> =>
  axios.put<Body, AxiosResponse<Response>>(`${baseUrl}${url}`, body);
