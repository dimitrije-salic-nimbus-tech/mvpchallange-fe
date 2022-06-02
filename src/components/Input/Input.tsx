import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
};

const Input: FC<Props> = ({ label }) => {
  return (
    <InputWrapper >
      <InputLabel>{label}</InputLabel>
      <InputBox />
    </InputWrapper>
  );
};
export default Input;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const InputBox = styled.input`
  height: 2rem;
  width: 12rem;
  border-bottom: 2px solid #92a8d1;
  padding: 0.3rem 0.3rem 0.3rem 0.5rem;
  font-size: 1.3rem;
  color: #034f84;
  border-radius: 0.4rem;
  &:active {
    border-bottom: 2px solid #034f84;
    outline: none;
    transition: all 0.3s;
  }
  &:focus {
    border-bottom: 2px solid #034f84;
    outline: none;
    transition: all 0.3s;
  }
`;
const InputLabel = styled.div`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: #034f84;
`;
