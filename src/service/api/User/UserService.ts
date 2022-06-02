import { deleteMethod, get, patch, post } from '../../HttpService';
import { EditUserRequest } from '../../../shared/types/request/EditUserRequest';
import { CreateUserRequest } from '../../../shared/types/request/CreateUserRequest';
import { ChangeDepositRequest } from '../../../shared/types/request/ChangeDepositRequest';

const baseUsersUrl = `/users`;

const getUsersUrl = (offset: number): string => `${baseUsersUrl}?offset=${offset}&limit=8`;

const getUserUrl = (id: string): string => `${baseUsersUrl}/${id}`;

const resetDepositUrl = (id: string): string => `${baseUsersUrl}/${id}/reset-deposit`;

const addDepositUrl = (id: string): string => `${baseUsersUrl}/${id}/add-deposit`;

export const getUsersRequest = async (offset: number): Promise<any> =>
  get<any>(getUsersUrl(offset)).then((response) => response.data);

export const getUserRequest = async (id: string): Promise<any> =>
  get<any>(getUserUrl(id)).then((response) => response.data);

export const editUserRequest = async (id: string, request: EditUserRequest): Promise<any> =>
  patch<EditUserRequest, void>(getUserUrl(id), request).then((response) => response.data);

export const createUserRequest = async (request: CreateUserRequest): Promise<any> =>
  post<CreateUserRequest, void>(baseUsersUrl, request).then((response) => response.data);

export const deleteUserRequest = async (id: string): Promise<any> =>
  deleteMethod<any>(getUserUrl(id)).then((response) => response.data);

export const resetDepositRequest = async (id: string): Promise<any> =>
  post<any, {}>(resetDepositUrl(id), {}).then((response) => response.data);

export const addDepositRequest = async (id: string, request: ChangeDepositRequest): Promise<any> =>
  post<any, ChangeDepositRequest>(addDepositUrl(id), request).then((response) => response.data);
