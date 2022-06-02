import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
  const navigate = useNavigate();

  const addProductHandler = () => {
    navigate('/products/add');
    console.log('/prdict/add');
  };

  const showProductHandler = () => {
    navigate('products/view');
    console.log('/prdict/view');
  };

  return (
    <SidebarBox>
      <SidebarElement onClick={addProductHandler}>Add product</SidebarElement>
      <SidebarElement onClick={showProductHandler}>Products</SidebarElement>
    </SidebarBox>
  );
};

export default Sidebar;

const SidebarBox = styled.div`
  width: 15rem;
  height: 100%;
  border-right: 1px solid black;
  padding: 3rem 1rem 0rem 1rem;
  margin-right: 3rem;

`;

const SidebarElement = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 0.3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    transition: all 0.3s;
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
