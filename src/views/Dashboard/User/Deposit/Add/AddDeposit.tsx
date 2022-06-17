import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { ChangeDepositRequest } from '../../../../../shared/types/request/ChangeDepositRequest';
import Button from '../../../../../components/Button/Button';
import { addDeposit } from '../../../../../store/thunks/user/AddDeposit';
import { useAuth } from '../../../../../hooks/UseAuth/UseAuth';
import { VALID_COINS } from '../../../../../shared/constants/ValidCoins';
import { StoreState } from '../../../../../store';
import { PromiseState } from '../../../../../store/slices/promise/types';
import { PromiseResult } from '../../../../../shared/types/PromiseResult';
import { addDepositAction } from '../../../../../store/slices/user/actions';
import { reset } from '../../../../../store/slices/promise/actions';

const AddDeposit = () => {
  const [selectedValue, setSelectedValue] = useState(VALID_COINS[0]);
  const { fulfilled, rejected } = useSelector<StoreState, PromiseState>((state) => state.promise);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    const fulfilledAddDeposit = fulfilled.getItem(addDepositAction) as PromiseResult;
    if (fulfilledAddDeposit) {
      dispatch(reset(addDepositAction));
      enqueueSnackbar(`Successfully added ${selectedValue} to deposit`, { variant: 'success' });
    }
  }, [fulfilled, rejected]);

  const onSubmit = async () => {
    const request: ChangeDepositRequest = {
      deposit: +selectedValue,
    };

    dispatch(addDeposit(user!.id, request));
  };
  return (
    <div>
      <Title>Add Deposit</Title>
      <SelectWrapper defaultValue={VALID_COINS[0]} onChange={(e: any) => setSelectedValue(e.target.value)}>
        {VALID_COINS.map((coin: number) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </SelectWrapper>
      <ButtonWrapper>
        <Button onClick={() => onSubmit()} label="Submit" />
      </ButtonWrapper>
    </div>
  );
};
export default AddDeposit;

const SelectWrapper = styled.select`
  width: 5rem;
  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const Title = styled.p`
  font-size: 2.2rem;
  color: #1941af;
  text-shadow: 0.1rem 0.1rem 0.1rem black;
`;
