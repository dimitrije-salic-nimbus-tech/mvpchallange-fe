import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Sidebar from "../../components/Sidebar/Sidebar";
import {ApiRoutes} from "../../utils/routes";
import Product from "./Product/View/Product";
import AddProduct from "./Product/Add/AddProduct";
import ProductsList from "./Product/List/ProductsList";



const Dashboard: FC = () => {
    const dispatch = useDispatch();



    return (
        <ProductContent>
            <Sidebar />
            <Routes>
                <Route path={`${ApiRoutes.Dashboard.viewProducts}`} element={<ProductsList />} />
                <Route path={`${ApiRoutes.Dashboard.addProduct}`} element={<AddProduct />} />
                <Route path={`${ApiRoutes.Dashboard.viewProduct}/*`} element={<Product />} />
                <Route path="*" element={<Navigate to={`${ApiRoutes.Dashboard.root}${ApiRoutes.Dashboard.viewProducts}`} />} />
            </Routes>
        </ProductContent>
    );
};

export default Dashboard;

const ProductContent = styled.div`
  display: flex;
  height: 100%;
`;
