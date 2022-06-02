import { deleteMethod, get, patch, post } from '../../HttpService';
import { EditProductRequest } from '../../../shared/types/request/EditProductRequest';
import { CreateProductRequest } from '../../../shared/types/request/CreateProductRequest';
import { BuyProductRequest } from '../../../shared/types/request/BuyProductRequest';

const baseProductsUrl = `/products`;

const getProductsUrl = (offset: number): string => `${baseProductsUrl}?offset=${offset}&limit=8`;

const getProductUrl = (id: string): string => `${baseProductsUrl}/${id}`;

const createProductUrl = (id: string): string => `${baseProductsUrl}/${id}/user`;

const buyProductUrl = (id: string): string => `${baseProductsUrl}/buy/${id}/user`;

export const getProductsRequest = async (offset: number): Promise<any> =>
  get<any>(getProductsUrl(offset)).then((response) => response.data);

export const getProductRequest = async (id: string): Promise<any> =>
  get<any>(getProductUrl(id)).then((response) => response.data);

export const editProductRequest = async (id: string, request: EditProductRequest): Promise<any> =>
  patch<EditProductRequest, void>(getProductUrl(id), request).then((response) => response.data);

export const createProductRequest = async (id: string, request: CreateProductRequest): Promise<any> =>
  post<CreateProductRequest, void>(createProductUrl(id), request).then((response) => response.data);

export const deleteProductRequest = async (id: string): Promise<any> =>
  deleteMethod<any>(getProductUrl(id)).then((response) => response.data);

export const buyProductRequest = async (id: string, request: BuyProductRequest): Promise<any> =>
  post<BuyProductRequest, void>(buyProductUrl(id), request).then((response) => response.data);
