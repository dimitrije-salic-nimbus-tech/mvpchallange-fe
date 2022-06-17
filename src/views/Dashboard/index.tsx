import React, { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../../components/Sidebar/Sidebar';
import { ApiRoutes } from '../../utils/routes';
import Product from './Product/View/Product';
import AddProduct from './Product/Add/AddProduct';
import ProductsList from './Product/List/ProductsList';
import AddDeposit from "./User/Deposit/Add/AddDeposit";
import ResetDeposit from "./User/Deposit/Reset/ResetDeposit";

const Dashboard: FC = () => {
  return (
    <ProductContent>
      <Sidebar />
      <ProductWrapper>
        <Routes>
          <Route path={`${ApiRoutes.Dashboard.viewProducts}`} element={<ProductsList />} />
          <Route path={`${ApiRoutes.Dashboard.addProduct}`} element={<AddProduct />} />
          <Route path={`${ApiRoutes.Dashboard.addDeposit}`} element={<AddDeposit />} />
          <Route path={`${ApiRoutes.Dashboard.resetDeposit}`} element={<ResetDeposit />} />
          <Route path={`${ApiRoutes.Dashboard.viewProduct}/*`} element={<Product />} />
          <Route
            path="*"
            element={<Navigate to={`${ApiRoutes.Dashboard.root}${ApiRoutes.Dashboard.viewProducts}`} />}
          />
        </Routes>
      </ProductWrapper>
    </ProductContent>
  );
};
export default Dashboard;
const ProductContent = styled.div`
  display: flex;
  height: 100%;
`;
const ProductWrapper = styled.div`
  padding: 5rem 0 0 4rem;
  @media only screen and (max-width: 530px) {
    padding: 1.5rem 0 0 1rem;
  }
`;
