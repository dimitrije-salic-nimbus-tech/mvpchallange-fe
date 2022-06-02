import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

import { fetchProducts } from '../../../../store/thunks/product/FetchProducts';
import { StoreState } from '../../../../store';
import { PromiseState } from '../../../../store/slices/promise/types';
import { fetchProductsAction } from '../../../../store/slices/product/actions';
import { PromiseResult } from '../../../../shared/types/PromiseResult';
import { ProductResponse } from '../../../../shared/types/Response/ProductResponse';
import Table from '../../../../components/Table/Table';

const ProductsList: FC = () => {
  const [products, setProducts] = useState<any>([]);
  const { fulfilled } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, []);

  const viewProductHandler = (id:any) => {
    navigate(`${id}`)
  }

  useEffect(() => {
    const fulfilledFetch = fulfilled.getItem(fetchProductsAction) as PromiseResult;
    if (fulfilledFetch) {
      const response: ProductResponse = fulfilledFetch.data.items;
      setProducts(response);
    }
  }, [fulfilled]);

  return <Table products={products} onClick={(id:any)=>viewProductHandler(id)}/>;
};

export default ProductsList;
