import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
    label: string;
    onClick: () => void;
};

const Button: FC<Props> = ({ label, onClick }) => {
    return <ButtonStyle onClick={onClick}>{label}</ButtonStyle>;
};

export default Button;

const ButtonStyle = styled.div`
  height: 3rem;
  width: 10rem;
  border: 2px solid white;
  cursor: pointer;
  color: white;
  background-color: #034F84;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  &:hover {
    background-color: #92A8D1;
    transform: translateY(-4px);
    transition: all 0.3s;
    border: 2px solid #034F84;
  }
  &:active {
    transform: translateY(0px);
    border: 2px solid white;
    background-color: #034F84;
    transition: all 0.3s;
  }
`;
