import React, { FC } from 'react';
import styled from 'styled-components';

import { ProductResponse } from '../../shared/types/Response/ProductResponse';

type Props = {
  products: ProductResponse[];
    onClick?: (id:any) => void;
};

const Table: FC<Props> = ({ products, onClick }) => {
  return (
    <TableContainer>
      <TableColumn>
        <TableHead>Name</TableHead>
        <TableHead>Current Price</TableHead>
        <TableHead>Available amount</TableHead>
      </TableColumn>
      {products?.map((product: ProductResponse) => {
        return (
          <TableColumn key={product.id} onClick={()=> onClick ? onClick(product.id) :onClick}>
            <TableField>{product.name}</TableField>
            <TableField>{product.currentPrice}</TableField>
            <TableField>{product.amountAvailable}</TableField>
          </TableColumn>
        );
      })}
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
`;

const TableField = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;
const TableColumn = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;
