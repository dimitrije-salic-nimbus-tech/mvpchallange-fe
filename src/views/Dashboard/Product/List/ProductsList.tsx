import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import { fetchProducts } from '../../../../store/thunks/product/FetchProducts';
import { StoreState } from '../../../../store';
import { PromiseState } from '../../../../store/slices/promise/types';
import { buyProductAction, fetchProductsAction } from '../../../../store/slices/product/actions';
import { PromiseResult } from '../../../../shared/types/PromiseResult';
import { ProductResponse } from '../../../../shared/types/response/ProductResponse';
import Table, { TableField, TableHead } from '../../../../components/Table/Table';
import Header from '../../../../components/Header/Header';
import Button from '../../../../components/Button/Button';
import CounterBox from '../../../../components/CounterBox/CounterBox';
import { BuyProductRequest } from '../../../../shared/types/request/BuyProductRequest';
import { buyProduct } from '../../../../store/thunks/product/BuyProduct';
import { useAuth } from '../../../../hooks/UseAuth/UseAuth';
import RoleProtected from '../../../../components/RoleProtected/RoleProtected';
import { Role } from '../../../../shared/enums/Role';
import { reset } from '../../../../store/slices/promise/actions';
import {deleteProduct} from "../../../../store/thunks/product/DeleteProduct";

const ProductsList: FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [productMap, setProductMap] = useState<
    Map<
      string,
      {
        product: Omit<ProductResponse, 'id'>;
        amount: number;
      }
    >
  >(new Map());
  const { fulfilled, rejected } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, []);

  const inc = (id: string) => {
    const product = productMap.get(id)!;
    if (product.amount < product.product.amountAvailable) {
      product.amount += 1;
      productMap.set(id, product);
      const newProductMap = new Map(productMap);
      setProductMap(newProductMap);
    }
  };

  const dec = (id: string): void => {
    const product = productMap.get(id)!;
    if (product.amount > 0) {
      product.amount -= 1;
      productMap.set(id, product);
      const newProductMap = new Map(productMap);
      setProductMap(newProductMap);
    }
  };

  const buy = async () => {
    const products: {
      productId: string;
      amount: number;
    }[] = [];
    productMap.forEach((prod, key) => {
      if (prod.amount > 0) {
        products.push({
          productId: key,
          amount: prod.amount,
        });
      }
    });

    const request: BuyProductRequest = {
      products,
    };

    dispatch(buyProduct(user, request));
  };

  const remove = async (id: string) => {
    dispatch(deleteProduct(id))
  };

  useEffect(() => {
    const fulfilledFetch = fulfilled.getItem(fetchProductsAction) as PromiseResult;
    if (fulfilledFetch) {
      const response: ProductResponse[] = fulfilledFetch.data.items;
      setProducts(response);
      const map = new Map();
      response.forEach((product: ProductResponse) => {
        const { id, ...rest } = product;
        map.set(product.id, { product: rest, amount: 0 });
      });
      setProductMap(map);
      dispatch(reset(fetchProductsAction));
    }
    const rejectedBuy = rejected.getItem(buyProductAction) as PromiseResult;
    const fulfilledBuy = fulfilled.getItem(buyProductAction) as PromiseResult;
    if (rejectedBuy) {
      dispatch(reset(buyProductAction));
      enqueueSnackbar('You do not have enough deposit', { variant: 'error' });
    }
    if (fulfilledBuy) {
      dispatch(reset(buyProductAction));
      enqueueSnackbar('You have successfully bought products', { variant: 'success' });
    }
  }, [fulfilled, rejected]);

  const renderTableRow = (item: ProductResponse) => {
    return (
      <>
        <TableField>{item.name}</TableField>
        <TableField>{item.currentPrice}</TableField>
        <TableField>{item.amountAvailable}</TableField>
        <RoleProtected allowedRole={Role.BUYER}>
          <TableField>
            <CounterBox inc={inc} dec={dec} id={item.id} number={productMap.get(item.id)!.amount} />
          </TableField>
        </RoleProtected>
        <RoleProtected allowedRole={Role.SELLER}>
          <TableField>
            <button disabled={item.seller.id !== user!.id} style={{ cursor: item.seller.id !== user!.id ? 'not-allowed' : 'pointer' }} type="reset" onClick={() => remove(item.id)}>
              X
            </button>
          </TableField>
        </RoleProtected>
      </>
    );
  };

  const renderTableHead = () => {
    return (
      <>
        <TableHead>Name</TableHead>
        <TableHead>Current Price</TableHead>
        <TableHead>Available amount</TableHead>
        <RoleProtected allowedRole={Role.BUYER}>
          <TableHead>Amount to buy</TableHead>
        </RoleProtected>
        <RoleProtected allowedRole={Role.SELLER}>
          <TableHead>Remove product</TableHead>
        </RoleProtected>
      </>
    );
  };

  return (
    <>
      <table>
        <Header headerText="Products List" />
        <Table data={products} renderRow={renderTableRow} renderHeader={renderTableHead} />
      </table>
      <RoleProtected allowedRole={Role.BUYER}>
        <ButtonWrapper>
          <Button onClick={() => buy()} label="Buy" />
        </ButtonWrapper>
      </RoleProtected>
    </>
  );
};

export default ProductsList;

const ButtonWrapper = styled.div`
  margin: 2rem 0 0 0;
`;
