import { ReduxAction } from '../../../shared/types/redux/ReduxAction';

export enum ProductActionType {
  FetchProducts = 'FetchProducts',
  FetchProduct = 'FetchProduct',
  EditProduct = 'EditProduct',
  CreateProduct = 'CreateProduct',
  DeleteProduct = 'DeleteProduct',
  BuyProduct = 'BuyProduct',
}

export type FetchProductsAction = ReduxAction<ProductActionType.FetchProducts>;
export type FetchProductAction = ReduxAction<ProductActionType.FetchProduct>;
export type EditProductAction = ReduxAction<ProductActionType.EditProduct>;
export type CreateProductAction = ReduxAction<ProductActionType.CreateProduct>;
export type DeleteProductAction = ReduxAction<ProductActionType.DeleteProduct>;
export type BuyProductAction = ReduxAction<ProductActionType.BuyProduct>;
