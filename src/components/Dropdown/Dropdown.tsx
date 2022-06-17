import React, { useState, useRef} from 'react';
import styled from 'styled-components';

import { VALID_COINS } from '../../shared/constants/ValidCoins';
import useOnClickOutside from "../../hooks/UseOnClickOutside/UseOnClickOutside";

const Dropdown = () => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <DropDownContainer ref={ref}>
      <DropDownHeader onClick={toggling}>{selectedOption || VALID_COINS[0]}</DropDownHeader>
      {isOpen && (
        <div>
          <DropDownList>
            {VALID_COINS.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </div>
      )}
    </DropDownContainer>
  );
};
const DropDownContainer = styled.div`
  width: 15.5em;
  margin: 0 auto;
  cursor: pointer;
`;
const DropDownHeader = styled.div`
  padding: 0.1em 2em 0.4em 0.2rem;
  font-weight: 500;
  font-size: 1.8rem;
  color: blue;
  background: none;
  border-bottom: 1px solid black;
`;
const DropDownList = styled.div`
  padding: 0;
  margin: 0;
  background: none;
  border: 1px solid;
  border-top: none !important;
  box-sizing: border-box;
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
  border-radius: 0px 0px 5px 5px;
`;
const ListItem = styled.div`
  list-style: none;
  padding: 0.7rem 0 0.4rem 0.7rem;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  background: linear-gradient(180deg, rgba(98, 98, 98, 0.5) 5%, rgba(158, 158, 158, 0.2) 100%);
  &:last-child {
    margin-bottom: 1rem;
    border-radius: 0px 0px 5px 5px;
  }
  &:hover {
    background-color: black;
  }
`;
export default Dropdown;
