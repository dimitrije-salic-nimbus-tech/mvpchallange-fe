import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/thunks/auth/Logout';
import { StoreState } from '../../store';
import { PromiseState } from '../../store/slices/promise/types';
import { PromiseResult } from '../../shared/types/PromiseResult';
import { logoutAction } from '../../store/slices/auth/actions';
import RoleProtected from '../RoleProtected/RoleProtected';
import { Role } from '../../shared/enums/Role';
import { reset } from '../../store/slices/promise/actions';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fulfilled } = useSelector<StoreState, PromiseState>((state) => state.promise);

  const addProductHandler = () => {
    navigate('/products/add');
  };
  const showProductHandler = () => {
    navigate('/products/view');
  };
  const addDepositHandler = () => {
    navigate('/products/add-deposit');
  };
  const resetDepositHandler = () => {
    navigate('/products/reset-deposit');
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fulfilledLogout = fulfilled.getItem(logoutAction) as PromiseResult;
    if (fulfilledLogout) {
      navigate('/auth/login');
      dispatch(reset(logoutAction));
    }
  }, [fulfilled]);

  return (
    <SidebarBox>
      <SidebarHeader>Options</SidebarHeader>
      <RoleProtected allowedRole={Role.SELLER}>
        <SidebarElement onClick={addProductHandler}>Add product</SidebarElement>
      </RoleProtected>
      <SidebarElement onClick={showProductHandler}>Products</SidebarElement>
      <RoleProtected allowedRole={Role.BUYER}>
        <SidebarElement onClick={addDepositHandler}>Add deposit</SidebarElement>
      </RoleProtected>
      <RoleProtected allowedRole={Role.BUYER}>
        <SidebarElement onClick={resetDepositHandler}>Reset deposit</SidebarElement>
      </RoleProtected>
      <SidebarElement onClick={logoutHandler}>Logout</SidebarElement>
    </SidebarBox>
  );
};
export default Sidebar;
const SidebarBox = styled.div`
  width: 18rem;
  height: 100%;
  border-right: 1px solid black;
  padding: 3rem 1rem 0rem 1rem;
  margin-right: 3rem;
  border-radius: 0 1rem 1rem 0;
  @media only screen and (max-width: 530px) {
    width: 14rem;
  }
`;
const SidebarElement = styled.div`
  padding: 0.6rem;
  margin-bottom: 0.7rem;
  cursor: pointer;
  color: #837979;
  font-size: 1.7rem;
  &:hover {
    transform: translateY(-4px);
    transition: all 0.3s;
    color: #131381;
    background-color: #9e9ef3;
    border-radius: 8px;
  }
  &:active {
    transform: translateY(0px);
    transition: all 0.3s;
  }
  &:after {
    transform: translateY(0px);
    transition: all 0.3s;
  }
`;
const SidebarHeader = styled.div`
  font-size: 1.4rem;
  color: #837979;
  margin-bottom: 2rem;
  font-weight: bold;
`;
