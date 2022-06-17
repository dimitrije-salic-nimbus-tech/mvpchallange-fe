import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  inc: (id: string) => void;
  dec: (id: string) => void;
  id: string;
  number: number;
};

const CounterBox: FC<Props> = ({ inc, dec, id, number }) => {
  return (
    <CounterBoxWrapper>
      <NumBox>{number}</NumBox>
      <PlusMinBox>
        <PlusBox onClick={() => inc(id)}>+</PlusBox>
        <PlusBox onClick={() => dec(id)}>-</PlusBox>
      </PlusMinBox>
    </CounterBoxWrapper>
  );
};
export default CounterBox;

const CounterBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const NumBox = styled.div`
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  border: 1px solid black;
  color: black;
  margin-right: 1rem;
  margin-top: 1rem;
  text-align: center;
`;
const PlusMinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PlusBox = styled.div`
  font-size: 2rem;
  color: black;
  cursor: pointer;
`;
