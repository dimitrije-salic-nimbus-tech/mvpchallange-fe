import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  headerText: string;
};

const Header: FC<Props> = ({ headerText }) => {
  return (
    <HeaderBox>
      <HeaderText>
        <th>{headerText}</th>
      </HeaderText>
    </HeaderBox>
  );
};
export default Header;

const HeaderBox = styled.thead`
  margin-bottom: 2rem;
`;
const HeaderText = styled.tr`
  font-size: 2.2rem;
  color: #1941af;
  text-shadow: 0.1rem 0.1rem 0.1rem black;
`;
