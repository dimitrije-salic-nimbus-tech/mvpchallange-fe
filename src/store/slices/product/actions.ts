import { createReduxAction } from '../../../utils/createReduxAction';
import {
  CreateProductAction,
  EditProductAction,
  FetchProductAction,
  FetchProductsAction,
  ProductActionType,
  DeleteProductAction,
  BuyProductAction,
} from './types';

export const fetchProductsAction = createReduxAction<FetchProductsAction>(ProductActionType.FetchProducts);
export const fetchProductAction = createReduxAction<FetchProductAction>(ProductActionType.FetchProduct);
export const editProductAction = createReduxAction<EditProductAction>(ProductActionType.EditProduct);
export const createProductAction = createReduxAction<CreateProductAction>(ProductActionType.CreateProduct);
export const deleteProductAction = createReduxAction<DeleteProductAction>(ProductActionType.DeleteProduct);
export const buyProductAction = createReduxAction<BuyProductAction>(ProductActionType.BuyProduct);
