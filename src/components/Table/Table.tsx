import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  data: any[];
  renderHeader: () => ReactNode;
  renderRow: (item: any & { id: string }) => ReactNode;
};
const Table: FC<Props> = ({ data, renderRow, renderHeader }) => {
  return (
    <TableContainer>
      <TableColumn>{renderHeader()}</TableColumn>
      {data?.map((item: any & { id: string }) => {
        return <TableColumn key={item.id}>{renderRow(item)}</TableColumn>;
      })}
    </TableContainer>
  );
};
export default Table;
const TableContainer = styled.tbody`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
export const TableHead = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #1941af;
  color: white;
`;
export const TableField = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 1.5rem;
  text-align: center;
`;
const TableColumn = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;
