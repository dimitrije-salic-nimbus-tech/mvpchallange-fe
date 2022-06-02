import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { fetchProduct } from '../../../../store/thunks/product/FetchProduct';
import { StoreState } from '../../../../store';
import { PromiseState } from '../../../../store/slices/promise/types';
import { fetchProductAction } from '../../../../store/slices/product/actions';
import { PromiseResult } from '../../../../shared/types/PromiseResult';
import { FullProductResponse } from '../../../../shared/types/Response/FullProductResponse';

const Product: FC = () => {
  const [product, setProduct] = useState<FullProductResponse>();
  const { id } = useParams<number | any>();
  const { fulfilled } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  useEffect(() => {
    const fulfilledFetch = fulfilled.getItem(fetchProductAction) as PromiseResult;
    if (fulfilledFetch) {
      const response: FullProductResponse = fulfilledFetch.data;
      setProduct(response);
    }
  }, [fulfilled]);

  console.log(product);

  return (
    <div>
      {product && (
        <ProductInfo>
          <div>
            <div>Product Name</div>
            <div>{product.name}</div>
          </div>
          <div>
            <div>Amount Available</div>
            <div>{product.amountAvailable}</div>
          </div>
          <div>
            <div>Current Price</div>
            <div>{product.currentPrice}</div>
          </div>
          <div>
            {product.seller && (
              <>
                <div>Seller Name</div>
                <div>{product.seller.username}</div>
              </>
            )}
          </div>
        </ProductInfo>
      )}
    </div>
  );
};

export default Product;

const ProductInfo = styled.div`
  display: flex;
  gap:4rem;
`;
