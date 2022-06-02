import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/';

export const get = async <T>(url: string, headers = {}): Promise<AxiosResponse<T>> =>
  axios.get(`${baseUrl}${url}`, { ...headers });

export const post = async <Body, Response>(url: string, body: Body): Promise<AxiosResponse<Response>> =>
  axios.post<Body, AxiosResponse<Response>>(`${baseUrl}${url}`, body);

export const patch = async <Body, Response>(url: string, body: Body): Promise<AxiosResponse<Response>> =>
  axios.patch<Body, AxiosResponse<Response>>(`${baseUrl}${url}`, body);

export const deleteMethod = async <T>(url: string): Promise<AxiosResponse<T>> =>
    axios.delete(`${baseUrl}${url}`);

export const put = async <Body, Response>(url: string, body: Body): Promise<AxiosResponse<Response>> =>
  axios.put<Body, AxiosResponse<Response>>(`${baseUrl}${url}`, body);
